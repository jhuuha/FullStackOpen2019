const blogs = [
    {
        title: 'testi',
        author: 'Simo',
        url: 'http://testi.fi',
        user: {
            username: 'root',
            name: 'super user',
            id: '5c9bc3d228313c68cb937d00'
        },
        likes: 0,
        id: '5c9c78839494eb3857392ddb'
    },
    {
        title: 'Testi2',
        author: 'Timo',
        url: 'httt://testi2.fi',
        user: {
            username: 'root',
            name: 'super user',
            id: '5c9bc3d228313c68cb937d00'
        },
        likes: 0,
        id: '5c9c794e9494eb3857392ddc'
    }
]

const getAll = () => {
    return Promise.resolve(blogs)
}

const setToken = newToken => {
    // eslint-disable-next-line no-unused-vars
    let token
    token = `bearer ${newToken}`
}

export default { getAll, setToken }