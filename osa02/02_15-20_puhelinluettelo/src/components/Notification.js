import React from 'react'

const Notification = ({ message, color }) => {
    const notificationStyle = {
        fontSize: '20px',
        fontWeight: '700',
        color: `${color}`,
        border: `2px solid ${color}`,
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