import React from 'react'
import { render, waitForElement } from 'react-testing-library'
import App from './App'

describe('<App />', () => {
    it('if no user logged, notes are not rendered', async () => {

        /*
        const user = {
            username: 'tester',
            token: '1231231214',
            name: 'Teuvo Testaaja'
        }
        localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
        */

        const component = render(
            <App />
        )
        component.rerender(<App />)

        await waitForElement(
            () => component.getByText('kirjaudu')
        )

        // expectations here
        const elementTitle = component.getByText('Log in to application')
        expect(elementTitle).toBeDefined()

        const elementLogin = component.getByText('kirjaudu')
        expect(elementLogin).toBeDefined()

        expect(component.container).not.toHaveTextContent('blogs')
        expect(component.container).not.toHaveTextContent('Testi Simo')
        expect(component.container).not.toHaveTextContent('Testi2 Timo')
    })
})