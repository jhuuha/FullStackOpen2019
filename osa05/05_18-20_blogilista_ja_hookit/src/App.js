import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import CreateNewBlog from './components/CreateNewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useField } from './hooks'

const App = () => {

    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)

    const username = useField('text')
    const password = useField('text')

    const [notificationMessage, setNotificationMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const blogFormRef = React.createRef()

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])


    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])


    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username: username.value, password: password.value,
            })
            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUser(user)
        } catch (exception) {
            setErrorMessage(
                `Virhe: ${exception.response.data.error}`
            )
            setTimeout(() => {
                setErrorMessage(null)
            }, 4000)
        }
    }


    const handleLogout = async () => {
        window.localStorage.removeItem('loggedBlogappUser')
        setUser(null)
        blogService.setToken(null)
    }


    const handleCreateNewBlog = async (event) => {
        event.preventDefault()
        blogFormRef.current.toggleVisibility()
        try {
            const newBlog =
            {
                title,
                author,
                url
            }
            const returnedBlog = await blogService.create(newBlog)
            setBlogs(blogs.concat(returnedBlog))
            setTitle('')
            setAuthor('')
            setUrl('')
            setNotificationMessage(
                `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
            )
            setTimeout(() => {
                setNotificationMessage(null)
            }, 2000)
        } catch (exception) {
            setErrorMessage(
                `Virhe: ${exception.response.data.error}`
            )
            setTimeout(() => {
                setErrorMessage(null)
            }, 4000)
        }
    }


    const handleLike = async (blog) => {
        try {
            const newBlog = { ...blog, user: blog.user.id, likes: blog.likes + 1 }
            delete newBlog.id
            const returnedBlog = await blogService.update(blog.id, newBlog)
            setBlogs(blogs.map(obj => obj.id !== blog.id ? obj : returnedBlog))
        } catch (exception) {
            setErrorMessage(
                `Virhe: ${exception.response.data.error}`
            )
            setTimeout(() => {
                setErrorMessage(null)
            }, 4000)
        }
    }


    const handleRemove = async (blog) => {
        try {
            if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
                await blogService.remove(blog.id)
                setBlogs(blogs.filter(n => n.id !== blog.id))
                setNotificationMessage(
                    `a blog ${blog.title} by ${blog.author} removed`
                )
                setTimeout(() => {
                    setNotificationMessage(null)
                }, 2000)
            }
        } catch (exception) {
            setErrorMessage(
                `Virhe: ${exception.response.data.error}`
            )
            setTimeout(() => {
                setErrorMessage(null)
            }, 4000)
        }
    }


    if (user === null) {

        return (
            <div>
                <h2>Log in to application</h2>
                <Notification message={notificationMessage} color='darkgreen' />
                <Notification message={errorMessage} color='red' />
                <form onSubmit={handleLogin}>
                    <div>
                        käyttäjätunnus
                        <input {...username} />
                    </div>
                    <div>
                        salasana
                        <input {...password} />
                    </div>
                    <button type="submit">kirjaudu</button>
                </form>
            </div>
        )
    }

    return (
        <div>
            <h2>blogs</h2>
            <Notification message={notificationMessage} color='darkgreen' />
            <Notification message={errorMessage} color='red' />
            <p>{user.name} logged in</p>
            <button onClick={() => handleLogout()}>logout</button>
            <Togglable buttonLabel="create new" ref={blogFormRef}>
                <CreateNewBlog
                    title={title}
                    author={author}
                    url={url}
                    handleTitleChange={({ target }) => setTitle(target.value)}
                    handleAuthorChange={({ target }) => setAuthor(target.value)}
                    handleUrlChange={({ target }) => setUrl(target.value)}
                    handleSubmit={handleCreateNewBlog}
                />
            </Togglable>
            {blogs
                .sort((a, b) => a.likes < b.likes ? 1 : -1)
                .map(blog =>
                    <Blog
                        key={blog.id}
                        blog={blog}
                        handleLike={handleLike}
                        handleRemove={handleRemove}
                        loggedUser={user.username}
                    />
                )}
        </div>
    )
}

export default App