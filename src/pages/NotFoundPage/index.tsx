import React from 'react'

import './notfound.css'

interface Props {
    
}

const NotFoundPage = (props: Props) => {
    return (
        <div className="error_container">
            <h1 className="error_text">404</h1>
        </div>
    )
}

export default NotFoundPage
