import React, { useState } from 'react'

const Blog = ({ blog, handleLike, handleRemove, loggedUser }) => {

    const [showDetails, setShowDetails] = useState(false)

    const blogStyle = {
        color: 'black',
        border: '1px solid black',
        margin: '5px 0px',
        paddingTop: '10px',
        paddingLeft: '2px',
        borderRadius: '2px',
        userSelect: 'none'
    }

    if (!(showDetails)) {
        return (<div style={blogStyle}>
            <div onClick={() => setShowDetails(true)}>{blog.title} {blog.author}</div>
        </div>)
    } else {
        const showRemove = { display: loggedUser === blog.user.username ? '' : 'none' }
        const user = blog.user === undefined ? '' : `added by ${blog.user.username}`
        return (<div style={blogStyle}>
            <div onClick={() => setShowDetails(false)}>{blog.title} {blog.author}<br /></div>
            <a href={blog.url}>{blog.url}</a><br />
            {blog.likes} likes <button onClick={() => handleLike(blog)}>like</button><br />
            {user}<br />
            <button style={showRemove} onClick={() => handleRemove(blog)}>remove</button>
        </div>)
    }
}

export default Blog