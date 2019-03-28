import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

test('renders content', () => {
    const blog = {
        title: 'Testi blogi',
        author: 'Simo Salminen',
        url: 'http://testiblogi.fi',
        user: {
            username: 'root',
            name: 'super user',
            id: '5c9bc3d228313c68cb937d00'
        },
        likes: 5,
        id: '5c9c78839494eb3857392ddb'
    }

    const component = render(
        <SimpleBlog blog={blog} />
    )

    component.debug()

    const title = component.container.querySelector('.title')
    expect(title).toHaveTextContent(
        'Testi blogi Simo Salminen'
    )

    const likes = component.container.querySelector('.likes')
    expect(likes).toHaveTextContent(
        'blog has 5 likes'
    )

})