const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')


beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})


test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})


test('there are right amount of blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(helper.initialBlogs.length)
})


test('identification names are id', async () => {
    const response = await api.get('/api/blogs')
    Object.values(response.body).forEach((blog) => {
        expect(blog.id).toBeDefined()
    })
})


test('a valid blog can be added', async () => {
    const newBlog = {
        title: 'Add new test',
        author: 'Super Man',
        url: 'https://fullstackopen-2019.github.io/osa4/backendin_testaaminen',
        likes: 0,
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)
})


afterAll(() => {
    mongoose.connection.close()
})