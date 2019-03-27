const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')


blogsRouter.get('/', async (request, response, next) => {
    try {
        const blogs = await Blog
            .find({}).populate('user', { username: 1, name: 1 })
        response.json(blogs.map(blog => blog.toJSON()))
    } catch (exception) {
        next(exception)
    }
})


blogsRouter.post('/', async (request, response, next) => {
    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!request.token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }
        const user = await User.findById(decodedToken.id)
        const body = { ...request.body, user: user._id, likes: request.body.likes === undefined ? 0 : request.body.likes }
        const blog = new Blog(body)
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        if (savedBlog.title === undefined || savedBlog.url === undefined) {
            response.status(400).end()
        } else {
            response.status(201).json(savedBlog.toJSON())
        }
    } catch (exception) {
        next(exception)
    }
})


blogsRouter.delete('/:id', async (request, response, next) => {
    try {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } catch (exception) {
        next(exception)
    }
})


blogsRouter.put('/:id', async (request, response, next) => {
    try {
        const blog = { ...request.body, likes: request.body.likes === undefined ? 0 : request.body.likes }
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        response.json(updatedBlog.toJSON())
    } catch (exception) {
        next(exception)
    }

})


module.exports = blogsRouter