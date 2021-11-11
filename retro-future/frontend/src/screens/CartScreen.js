import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card, Container } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'       

function CartScreen({ match, location, history}) {
    const productId = match.params.id
    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()
    
    const cart = useSelector(state => state.cart)
    const {cartItems} = cart

    useEffect(() => {
        if (productId){
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }

    return (
        <Container className='pt-5'>
            <Row>
                <Col md={8}>
                    <h1>Shopping Cart</h1>
                    {cartItems.length === 0 ? (
                        <Message variant='info'>
                            Your cart is empty <Link to='/'>Go Back</Link>
                        </Message>
                    ) : (
                        <ListGroup variant='flush'>
                            {cartItems.map(item => (
                                <ListGroup.Item key={item.product} className="p-0">
                                    <Row>
                                        <Col md={2}>
                                            <Image src={item.image} alt={item.name} style={{width: '100px', objectFit: 'cover'}} />
                                        </Col>
                                        <Col md={3}  className='p-2'>
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </Col>
                                        <Col md={2}  className='p-2'>
                                            ${item.price}
                                        </Col>
                                        <Col md={3}  className='p-2'>
                                            <Form.Select 
                                                style={{backgroundColor: '#EFF2F6', border: '1px solid black', width: '110px'}}
                                                as="select"
                                                value={item.qty}
                                                onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                                            >
                                                {
                                                    [...Array(item.countInStock).keys()].map((x) => (
                                                        <option key={x+1} value={x+1}>
                                                            { x+1 }
                                                        </option>
                                                    ))
                                                }

                                            </Form.Select>
                                        </Col>
                                        <Col md={1}  className='p-2'>
                                            <Button
                                                style={{backgroundColor: '#EFF2F6', border: '1px solid black'}}
                                                type='button'
                                                variant='light'
                                                onClick={() => removeFromCartHandler(item.product)}
                                            >
                                                Remove
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
                                ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                            </ListGroup.Item>
                        </ListGroup>
                        <ListGroup.Item>
                            <Button
                                type='button'
                                className='w-100'
                                disabled={cartItems.length === 0}
                                onClick={checkoutHandler}
                            >
                                Proceed To Checkout
                            </Button>
                        </ListGroup.Item>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default CartScreen
