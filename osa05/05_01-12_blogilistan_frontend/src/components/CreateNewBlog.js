import React from 'react'

const CreateNewBlog = ({
    handleSubmit,
    handleTitleChange,
    handleAuthorChange,
    handleUrlChange,
    title,
    author,
    url
}) => {
    return (
        < div >
            <h2>crate new</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    title
                    <input
                        value={title}
                        onChange={handleTitleChange}
                    />
                </div>
                <div>
                    author
                    <input
                        value={author}
                        onChange={handleAuthorChange}
                    />
                </div>
                <div>
                    url
                    <input
                        value={url}
                        onChange={handleUrlChange}
                    />
                </div>
                <button type="submit">create</button>
            </form>
        </div >
    )
}

export default CreateNewBlog