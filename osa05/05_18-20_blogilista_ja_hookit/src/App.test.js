import React from 'react'
import { render, waitForElement } from 'react-testing-library'
import App from './App'

describe('<App />', () => {
    it('if no user logged, notes are not rendered', async () => {

        const user = {
            username: 'tester',
            token: '1231231214',
            name: 'Teuvo Testaaja'
        }
        localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

        const component = render(
            <App />
        )
        component.rerender(<App />)

        await waitForElement(
            () => component.getByText('logout')
        )

        // expectations here
        const elementTitle = component.getByText('blogs')
        expect(elementTitle).toBeDefined()

        const elementLogout = component.getByText('logout')
        expect(elementLogout).toBeDefined()

        expect(component.container).toHaveTextContent('Testi Simo')
        expect(component.container).toHaveTextContent('Testi2 Timo')
    })
})