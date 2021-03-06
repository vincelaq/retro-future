import React, { useState } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import Checkout from '../components/Checkout'
import { saveShippingAddress } from '../actions/cartActions'

function ShippingScreen({ history }) {
    
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const dispatch = useDispatch()
    
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country }))
        history.push('/payment')
    }

    return (
        <Container className='pt-5'>
            <FormContainer >
                <Checkout step1 step2 />
                <h1>Shipping</h1>
                <Form onSubmit={submitHandler}>

                    <Form.Group controlId='address' className='pb-3'>
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            required
                            type='text'
                            placeholder='Enter Address'
                            value={address ? address : ''}
                            onChange={(e) => setAddress(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='city' className='pb-3'>
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            required
                            type='text'
                            placeholder='Enter City'
                            value={city ? city : ''}
                            onChange={(e) => setCity(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='postalCode' className='pb-3'>
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control
                            required
                            type='text'
                            placeholder='Enter Postal Code'
                            value={postalCode ? postalCode : ''}
                            onChange={(e) => setPostalCode(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='country' className='pb-3'>
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                            required
                            type='text'
                            placeholder='Enter Country'
                            value={country ? country : ''}
                            onChange={(e) => setCountry(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary' className='mt-2 mb-5 w-100'>
                        Continue
                    </Button>

                </Form>
            </FormContainer>
        </Container>
    )
}

export default ShippingScreen
