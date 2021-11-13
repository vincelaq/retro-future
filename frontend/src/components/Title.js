import React from 'react'
import { Container } from 'react-bootstrap'

function Title({ title, description }) {
    return (
        <div className='bg-black mt-0 p-3'>
            <Container>
                <h1 className='text-white mb-0 pb-2'>{title}</h1>
                <p className='w-50 mt-0 pb-1' style={{minWidth: '325px'}}>{description}</p>
            </Container>
        </div>
    )
}

export default Title
