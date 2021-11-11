import React from 'react'
import { Container, Image, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'


function SplashScreen({ }) {

    return (
        <Container className='d-flex flex-column align-items-center'>
            <h1 className='pt-5 pb-2'>For nostalgia collectors</h1>
            <p className='w-50 text-center text-muted mt-2 pb-2'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel placerat ante. Nullam interdum urna vel ante.</p>
                <Link
                    className='btn'
                    role='button'
                    to='/home'
                    style={{border: '1px solid black', padding: '8px 48px'}}
                >
                    Shop All
                </Link>
            <div className='mt-4' style={{height: '650px', overflow: 'hidden'}} >
                <Image src='https://retro-future-flex-525.s3.us-west-1.amazonaws.com/splash.jpg' className='w-100' style={{margin: '-3rem 0rem'}} />
            </div>
        </Container>
    )
}

export default SplashScreen
