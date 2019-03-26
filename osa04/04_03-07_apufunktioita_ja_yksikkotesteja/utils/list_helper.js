const lodash = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if (blogs === undefined || blogs.lenght === 0) {
        return 0
    }
    return blogs.reduce((s, p) => s + p.likes, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs === undefined || blogs.lenght === 0) {
        return 0
    }
    const mostLikedBlog = blogs.reduce((max, blog) => max && max.likes > blog.likes ? max : blog, null)
    return {
        'title': mostLikedBlog.title,
        'author': mostLikedBlog.author,
        'likes': mostLikedBlog.likes
    }
}

const mostBlogs = (blogs) => {
    if (blogs === undefined || blogs.lenght === 0) {
        return 0
    }
    const authors = lodash.groupBy(blogs, 'author')
    let arr = []
    let most = { 'author': '', 'blogs': 0 }
    Object.values(authors).forEach(value => {
        arr = value
        console.log(arr)
        if (arr.length > most.blogs) {
            most = { 'author': arr[0].author, 'blogs': arr.length }
        }
    })
    return most
}

const mostLikes = (blogs) => {
    if (blogs === undefined || blogs.lenght === 0) {
        return 0
    }
    const authors = lodash.groupBy(blogs, 'author')
    let arr = []
    let most = { 'author': '', 'likes': 0 }
    Object.values(authors).forEach(value => {
        arr = value
        const likes = arr.reduce((x, y) => x + y.likes, 0)
        if (likes > most.likes) {
            most = { 'author': arr[0].author, 'likes': likes }
        }
    })
    return most
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}