import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Image, ListGroup, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProductDetails, createProductReview } from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'


function ProductScreen({ match, history }) {
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    
    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails
    
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const { loading: loadingProductReview, error: errorProductReview, success: successProductReview } = productReviewCreate


    useEffect(()=>{
        if (successProductReview) {
            setRating(0)
            setComment('')
            dispatch({
                type: PRODUCT_CREATE_REVIEW_RESET
            })
        }
        dispatch(listProductDetails(match.params.id))
    },[dispatch, match, successProductReview])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(
            match.params.id, {
                rating,
                comment,
            }
        ))
    }

    return (
        <Container>
            <Link to='/home' className='btn btn-light my-3 border border-dark'>
                {'<'}{'<'} Back
            </Link>
            { loading ?
                <Loader />
                : error ? 
                    <Message variant='danger'>{ error }</Message>
                    : (
                        <div>
                            <Row>
                                <Col md={6}>
                                    <div style={{maxWidth: '34rem', maxHeight: '31rem', width: '92vw', height: '80vw', objectFit: 'cover' }}>
                                        <Image fluid src={product.image} alt={product.name} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item className='border-0 pb-2' style={{backgroundColor: '#EFF2F6'}}>
                                            <h1 className='pb-0' style={{display: 'inline', marginRight: '12px'}}>{product.name}</h1>
                                            <span style={{color: '#666666', textDecoration: 'none', fontSize: '20px'}}>{product.brand}</span>
                                        </ListGroup.Item>
                                        {/* <ListGroup.Item>
                                            <Rating value={product.rating} text={`${product.numReviews}`} color={'#000000'} />
                                        </ListGroup.Item> */}
                                        <ListGroup.Item  className='border-0 pt-0 pb-3' style={{backgroundColor: '#EFF2F6', fontSize: '1.25rem'}}>
                                            ${product.price}
                                        </ListGroup.Item>
                                        <ListGroup.Item  className='border-0 pb-3' style={{backgroundColor: '#EFF2F6'}}>
                                            {product.description}
                                        </ListGroup.Item>
                                
                                        {/* <ListGroup.Item  style={{backgroundColor: '#EFF2F6'}}>
                                            <Row>
                                                <Col>Price:</Col>
                                                <Col>
                                                    <strong>${product.price}</strong>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item> */}
                                        <ListGroup.Item className='border-0 text-muted' style={{backgroundColor: '#EFF2F6'}}>
                                            <Row>
                                                <Col>Status: {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'} </Col>
                                                <Col className='d-flex justify-content-end'>
                                                    <span className='me-4'>Quantity</span>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>

                                        {/* { product.countInStock > 0 && (
                                            <ListGroup.Item className='border-0' style={{backgroundColor: '#EFF2F6'}}>
                                                <Row>
                                                    <Col>Qty</Col>
                                                    <Col xs='auto' className='my-1'>
                                                        <Form.Select 
                                                            as="select"
                                                            value={qty}
                                                            onChange={(e) => setQty(e.target.value)}
                                                        >
                                                            {
                                                                [...Array(product.countInStock).keys()].map((x) => (
                                                                    <option key={x+1} value={x+1}>
                                                                        { x+1 }
                                                                    </option>
                                                                ))
                                                            }

                                                        </Form.Select>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>    
                                        )} */}

                                        <ListGroup.Item className='d-flex justify-content-between border-0' style={{backgroundColor: '#EFF2F6'}}>
                                            <Button
                                
                                                onClick={addToCartHandler} 
                                                className='w-75' 
                                                disabled={product.countInStock === 0} 
                                                type='button'
                                            >
                                                    Add to Cart
                                            </Button>
                                            { product.countInStock > 0 && (
            
                                                    <div className='border border-dark' style={{width: '108px', backgroundColor: 'white'}}>
                                                        <Form.Select
                                                            style={{padding: '12px 28px'}} 
                                                            as="select"
                                                            value={qty}
                                                            onChange={(e) => setQty(e.target.value)}
                                                        >
                                                            {
                                                                [...Array(product.countInStock).keys()].map((x) => (
                                                                    <option key={x+1} value={x+1}>
                                                                        { x+1 }
                                                                    </option>
                                                                ))
                                                            }

                                                        </Form.Select>
                                                    </div>
                                               
                                        )}
                                        </ListGroup.Item>
                                        <ListGroup.Item className='d-flex border-0' style={{backgroundColor: '#EFF2F6'}}>
                                            <span style={{
                                                fontFamily: 'Inter', 
                                                fontWeight: '400', 
                                                fontSize: '12px', 
                                                color: '#666666', 
                                                marginRight: '24px'
                                            }}>Free Standard Shipping</span>
                                            <span style={{
                                                fontFamily: 'Inter', 
                                                fontWeight: '400', 
                                                fontSize: '12px', 
                                                color: '#666666', 
                                                textDecoration: 'underline'
                                            }}>Free Returns</span>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                            </Row>
                            <Row className='mt-5 pt-5'>
                                <Col>
                                    <Row>
                                        <Col md={2}>
                                            <h2>Reviews</h2>
                                            <Rating value={product.rating} text={`${product.numReviews}`} color={'#000000'} />
                                            {product.reviews.length === 0 && <Message variant='info'>No Review</Message>}
                                            <div className='mb-5'>
                                                <div className='pt-4 pb-1'>Rating </div>
                                                <div>5 ........... Excellent</div>
                                                <div>4 ........... Very Good</div>
                                                <div>3 ........... Good</div>
                                                <div>2 ........... Fair</div>
                                                <div>1 ........... Poor</div>
                                                
                                            </div>
                                        </Col>
                                        <Col>
                                            <ListGroup variant='flush'>
                                                {product.reviews.map((review) => (
                                                    <ListGroup.Item key={review._id} className='border-0 pb-5' style={{backgroundColor: '#EFF2F6'}}>
                                                        <div className='d-flex justify-content-between pb-4'>
                                                            <div>
                                                                <Rating value={review.rating} color='#000000'/>
                                                            </div>
                                                            <div>
                                                                <span style={{fontWeight: '600'}}>{review.name}</span> on {review.createdAt.substring(0,10)}
                                                            </div>
                                                        </div>
                                                        <p>{review.comment}</p>
                                                        <div>
                                                            <span style={{
                                                                fontFamily: 'Inter', 
                                                                fontWeight: '400', 
                                                                fontSize: '12px', 
                                                                color: '#666666', 
                                                                marginRight: '16px'
                                                            }}>Was this review helpful? Yes (4) No (1)</span>
                                                            |
                                                            <span style={{
                                                                fontFamily: 'Inter', 
                                                                fontWeight: '400', 
                                                                fontSize: '12px', 
                                                                color: '#666666', 
                                                                textDecoration: 'underline',
                                                                marginLeft: '16px'
                                                            }}>Flag as inappropriate</span>
                                                        </div>
                                                    </ListGroup.Item>
                                                ))}

                                                <ListGroup.Item className='border border-dark p-5 mb-5'>
                                                    <h3>Write a review</h3>
                                                    
                                                    {loadingProductReview && <Loader />}
                                                    {successProductReview && <Message variant='success'>Review Submitted</Message>}
                                                    {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}
                                                    
                                                    {userInfo ? (
                                                        <Form onSubmit={submitHandler}>
                                                            <Form.Group controlId='rating'>
                                                                <Form.Label>
                                                                    <h5 className='mt-4'>Rating</h5>
                                                                </Form.Label>
                                                                <Form.Control
                                                                    as='select'
                                                                    value={rating}
                                                                    onChange={(e) => setRating(e.target.value)}
                                                                >
                                                                    <option value=''>Select... </option>
                                                                    <option value='1'>1 - Poor</option>
                                                                    <option value='2'>2 - Fair</option>
                                                                    <option value='3'>3 - Good</option>
                                                                    <option value='4'>4 - Very Good</option>
                                                                    <option value='5'>5 - Excellent</option>
                                                                </Form.Control>
                                                            </Form.Group>
                                                            <Form.Group controlId='comment'>
                                                                <Form.Label>
                                                                    <h5 className='mt-4'>Review</h5>
                                                                </Form.Label>
                                                                <Form.Control
                                                                    as='textarea'
                                                                    row='5'
                                                                    value={comment}
                                                                    onChange={(e) => setComment(e.target.value)}
                                                                >

                                                                </Form.Control>
                                                            </Form.Group>
                                                            <Button
                                                                disabled={loadingProductReview}
                                                                type='submit'
                                                                variant='primary'
                                                                className='mt-4 w-100'
                                                            >
                                                                Submit
                                                            </Button>
                                                        </Form>
                                                    ) : (
                                                        <Message variant='info'>Please <Link to='/login'>login</Link> to write a review</Message>
                                                    )}
                                                </ListGroup.Item>
                                            </ListGroup>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                    )
            }
        </Container>
    )
}

export default ProductScreen
