const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')


usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users.map(u => u.toJSON()))
})


usersRouter.post('/', async (request, response, next) => {
    try {
        const body = request.body
        if (body.password === undefined) {
            response.status(400).json({ error: 'User validation failed: password: Path `password` is required.' })
        } else if (body.password.length < 3) {
            response.status(400).json({ error: 'User validation failed: password: Path `password` is shorter than the minimum allowed length (3).' })
        } else {
            const saltRounds = 10
            const passwordHash = await bcrypt.hash(body.password, saltRounds)
            const user = new User({
                username: body.username,
                name: body.name,
                passwordHash,
            })
            const savedUser = await user.save()
            response.json(savedUser)
        }
    } catch (exception) {
        next(exception)
    }
})

module.exports = usersRouter