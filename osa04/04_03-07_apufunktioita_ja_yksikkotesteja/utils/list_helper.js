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
    const mostLikedBlog = blogs.reduce((max, blog) => max && max.likes > blog.likes ? max : blog, null)
    return {
        title: mostLikedBlog.title,
        author: mostLikedBlog.author,
        likes: mostLikedBlog.likes
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}