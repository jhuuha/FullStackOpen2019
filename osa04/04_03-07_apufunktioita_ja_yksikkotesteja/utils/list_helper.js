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
        title: mostLikedBlog.title,
        author: mostLikedBlog.author,
        likes: mostLikedBlog.likes
    }
}

const mostBlogs = (blogs) => {
    if (blogs === undefined || blogs.lenght === 0) {
        return 0
    }
    const count = lodash.countBy(blogs.map(blog => blog.author))
    return (
        lodash.orderBy(lodash.map(count, (v, k) => ({ author: k, blogs: v })), ['blogs'], ['desc'])[0]
    )
}

const mostLikes = (blogs) => {

    if (blogs === undefined || blogs.lenght === 0) {
        return 0
    }

    const authors = lodash.groupBy(blogs, 'author')

    let author, blog, likes, mostLikes

    for (author in authors) {
        likes = 0
        for (blog in authors[author]) {
            likes += authors[author][blog].likes
        }
        if (mostLikes === undefined) {
            mostLikes = { author, likes }
        } else if (likes > mostLikes.likes) {
            mostLikes = { author, likes }
        }
    }

    return mostLikes
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}