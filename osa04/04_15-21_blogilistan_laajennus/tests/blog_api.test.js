const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

describe('/api/blogs tests', () => {

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


    test('undefined likes must be zero', async () => {
        const newBlog = {
            title: 'Add new test',
            author: 'Super Man',
            url: 'https://fullstackopen-2019.github.io/osa4/backendin_testaaminen',
        }
        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogs = await Blog.find({ '_id': response.body.id })
        expect(blogs[0].likes).toBeDefined()
    })


    test('if title is undefined status must be 400 (bad request)', async () => {
        const newBlog = {
            author: 'Super Man',
            url: 'https://fullstackopen-2019.github.io/osa4/backendin_testaaminen',
            likes: 0
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })


    test('if url is undefined status must be 400 (bad request)', async () => {
        const newBlog = {
            title: 'Add new test',
            author: 'Super Man',
            likes: 0
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })

    test('a blog can be modified', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToMod = blogsAtStart[0]
        const newBlog = { ...blogToMod, author: 'Super Hessu' }
        await api
            .put(`/api/blogs/${blogToMod.id}`)
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
        const author = blogsAtEnd.map(r => r.author)
        expect(author).toContain('Super Hessu')
    })

    test('a blog can be deleted', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]
        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd.length).toBe(helper.initialBlogs.length - 1)
        const id = blogsAtEnd.map(r => r.id)
        expect(id).not.toContain(blogToDelete.id)
    })


    afterAll(() => {
        mongoose.connection.close()
    })
})