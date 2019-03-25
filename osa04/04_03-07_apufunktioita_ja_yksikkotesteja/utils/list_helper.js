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

module.exports = {
    dummy,
    totalLikes
}