const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')

describe('/api/users tests', () => {

    beforeEach(async () => {
        await User.deleteMany({})
        const saltRounds = 10
        const passwordHash = await bcrypt.hash('root123', saltRounds)
        const user = new User({
            username: 'root',
            name: 'super user',
            passwordHash
        })
        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
            username: 'testiuser',
            name: 'Testi Käyttäjä',
            password: 'testi123',
        }
        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })


    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen',
        }
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('`username` to be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)

    })


    test('creation fails with proper statuscode and message if username shorter than 3', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
            username: 'ro',
            name: 'Superuser',
            password: 'salainen',
        }
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('`username` (`ro`) is shorter than the minimum allowed length')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })


    test('creation fails with proper statuscode and message if password shorter than 3', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
            username: 'root2',
            name: 'Superuser',
            password: 'sa',
        }
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('`password` is shorter than the minimum allowed length')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })


    afterAll(() => {
        mongoose.connection.close()
    })
})
