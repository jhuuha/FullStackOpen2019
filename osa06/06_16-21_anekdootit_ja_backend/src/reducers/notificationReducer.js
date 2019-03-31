const reducer = (state = '', action) => {
    console.log('state now: ', state)
    console.log('action', action)
    switch (action.type) {
        case 'SET_MESSAGE':
            return action.message
        default: return state
    }
}

export const showNotification = (message) => {
    return {
        type: 'SET_MESSAGE',
        message
    }
}

export const hideNotification = () => {
    return {
        type: 'SET_MESSAGE',
        message: ''
    }
}

export default reducer