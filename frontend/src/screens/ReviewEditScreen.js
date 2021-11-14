import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProductReviewDetails, updateProductReview } from '../actions/productActions'
import { PRODUCT_UPDATE_REVIEW_RESET } from '../constants/productConstants'


function ReviewEditScreen({ match, history }) {
    const reviewId = match.params.id
    
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()
    
    const productReviewDetails = useSelector(state => state.productReviewDetails)
    const { error, loading, review } = productReviewDetails

    const productReviewUpdate = useSelector(state => state.productReviewUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = productReviewUpdate

    useEffect(() => {

        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_REVIEW_RESET })
            history.push(`/product/${review.product}`)
        } else {
            if (!review.comment || review._id !== Number(reviewId)) {
               dispatch(listProductReviewDetails(reviewId))
            } else {
                setRating(review.rating)
                setComment(review.comment)
            }
        }
    }, [dispatch, review, reviewId, history, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProductReview({
            _id: reviewId,
            rating,
            comment
        }))
    }

    return (
        <Container>
            <Link to={`/product/${review.product}`} className='btn btn-light my-3 border border-dark'>
                {'<'}{'<'} Back
            </Link>
            <FormContainer>
           
                <h1>Edit your review</h1>
                
                {loadingUpdate && <Loader />}
                {successUpdate && <Message variant='success'>Review Submitted</Message>}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                    : (
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
                                    style={{height: '300px'}}
                                    as='textarea'
                                    row='10'
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                >

                                </Form.Control>
                            </Form.Group>
                            <Button
                                disabled={loadingUpdate}
                                type='submit'
                                variant='primary'
                                className='mt-4 w-100'
                            >
                                Submit
                            </Button>
                        </Form>
                    )
                }
            </FormContainer>
        </Container>
    )
}

export default ReviewEditScreen
