import React from 'react';

export const Timeline = () => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: '32px',
            paddingRight: '32px',
            height: '100vh',
        }}>
            <div style={{
                width: 0,
                height: 0,
                borderLeft: '20px solid transparent',
                borderRight: '20px solid transparent',
                borderTop: '20px solid black',
            }} />
        </div>
    );
};