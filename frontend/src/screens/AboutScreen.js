import React from 'react'
import Title from '../components/Title'

function AboutScreen() {
    return (
        <div style={{borderTop: '.25px solid gray'}}>
            <Title 
                title={'About'}
                description={'Our mission is to provide access to the world’s most coveted items in the smartest way possible. Buy and sell the vintage apparel, electronics, music, figurines, and accessories.'}
            />
        </div>
    )
}

export default AboutScreen
