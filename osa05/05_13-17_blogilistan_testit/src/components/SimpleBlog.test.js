import React from 'react'
import 'jest-dom/extend-expect'
import { render, fireEvent, cleanup } from 'react-testing-library'
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

    const title = component.container.querySelector('.title')
    expect(title).toHaveTextContent(
        'Testi blogi Simo Salminen'
    )

    const likes = component.container.querySelector('.likes')
    expect(likes).toHaveTextContent(
        'blog has 5 likes'
    )
})

it('two clicking the button calls event handler two times', async () => {
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

    const mockHandler = jest.fn()

    const { getByText } = render(
        <SimpleBlog blog={blog} onClick={mockHandler} />
    )

    const button = getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)
})