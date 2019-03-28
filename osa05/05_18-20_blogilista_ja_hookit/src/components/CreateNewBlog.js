import React from 'react'

const CreateNewBlog = ({
    handleSubmit,
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
                    <input {...title.bind} />
                </div>
                <div>
                    author
                    <input {...author.bind} />
                </div>
                <div>
                    url
                    <input {...url.bind} />
                </div>
                <button type="submit">create</button>
            </form>
        </div >
    )
}

export default CreateNewBlog