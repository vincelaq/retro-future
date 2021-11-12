import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Form } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import { listProducts } from '../actions/productActions'

function HomeScreen({ history }) {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { error, loading, products, page, pages } = productList

    let keyword = history.location.search

    useEffect(() => {
        dispatch(listProducts(keyword))

    },[dispatch, keyword])

    return (
        <div style={{borderTop: '.25px solid gray'}}>
            <div className='bg-black mt-0 p-3'>
                <Container>
                    <h1 className='text-white mb-0 pb-2'>Shop All Retro</h1>
                    <p className='w-50 mt-0 pb-1'>Revamp your style with the vintage designer trends in clothing or achieve a nostalgic curated wardrobe thanks to our line-up of retro pieces. All pieces are authentically certified by our team before delivering to you.</p>
                </Container>
            </div>
            <Container>
                <Row>
                <Col sm={2} md={2}>
                    <div className='mt-5 mb-3'>
                        <h2 style={{display: 'inline', marginRight: '12px'}}>Filters</h2>
                        <span style={{color: '#666666', textDecoration: 'underline', fontSize: '12px'}}>Clear filters</span>
                    </div>
                    <h4 className='mb-3'>Categories</h4>
                    <Form style={{fontSize: '14px'}}>
                        <Form.Check 
                            type='checkbox'
                            label={`Clothing`}
                        />
                        <Form.Check 
                            type='checkbox'
                            label={`Gaming`}
                        />
                        <Form.Check 
                            type='checkbox'
                            label={`Music`}
                        />
                    </Form>
                </Col>
                <Col>
                    <div className='d-flex justify-content-end mt-5'>
                        <div className='d-flex flex-column justify-content-end'>
                            <div className='border border-dark py-2 px-3 me-4'>
                                Sort by <span style={{fontWeight: '600', color: 'black', margin: '0px 8px'}}>Popularity</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>

                            </div>
                            <p className='d-flex justify-content-end py-2 me-4'><span>Showing 6 out of {products.length}</span></p>
                        </div>
                    </div>    
                    <Container>
                        { loading ? <Loader />
                            : error ? <Message variant='danger'>{ error }</Message>
                                :
                                    <div>
                                        <Row>
                                            {products.map(product => (
                                                <Col key={product._id} sm={12} md={6} lg={4} xl={4}>
                                                    <Product product={product} />
                                                </Col>
                                            ))}
                                        </Row>
                                        <Paginate page={page} pages={pages} keyword={keyword} />
                                    </div>
                        }
                    </Container>
                </Col>
                </Row>
            </Container>
        </div>
    )
}

export default HomeScreen
