const reducer = (state = '', action) => {
    console.log('state now: ', state)
    console.log('action', action)
    switch (action.type) {
        case 'SET_MESSAGE':
            return action.message
        default: return state
    }
}

export const setNotification = (message, timeout) => {
    return dispatch => {
        dispatch({
            type: 'SET_MESSAGE',
            message: message
        })
        setTimeout(() => {
            dispatch({
                type: 'SET_MESSAGE',
                message: ''
            })
        }, timeout)
    }
}

export default reducer