import React from 'react'

const Notification = ({ message }) => {
    const notificationStyle = {
        fontSize: '20px',
        fontWeight: '700',
        color: 'darkgreen',
        border: '2px solid darkgreen',
        backgroundColor: 'lightgray',
        marginBottom: '20px',
        padding: '10px',
        borderRadius: '7px'
    }

    if (message === null) {
        return null
    }

    return (
        <div style={notificationStyle}>
            {message}
        </div>
    );
};

export default Notification