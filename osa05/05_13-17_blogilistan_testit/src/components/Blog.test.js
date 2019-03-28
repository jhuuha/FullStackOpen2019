import React from 'react'
import 'jest-dom/extend-expect'
import { render, fireEvent, cleanup } from 'react-testing-library'
import Blog from './Blog'

afterEach(cleanup)


it('renders content', async () => {
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
        <Blog blog={blog} />
    )

    const elementTitle = component.getByText('Testi blogi Simo Salminen')

    expect(elementTitle).toBeDefined()
    expect(component.container).not.toHaveTextContent('5 likes')
    expect(component.container).not.toHaveTextContent('http://testiblogi.fi')

    fireEvent.click(elementTitle)

    expect(elementTitle).toBeDefined()
    expect(component.container).toHaveTextContent('5 likes')
    expect(component.container).toHaveTextContent('http://testiblogi.fi')

})