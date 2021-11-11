import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'
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
                { loading ? <Loader />
                    : error ? <Message variant='danger'>{ error }</Message>
                        :
                            <div>
                                <Row>
                                    {products.map(product => (
                                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                            <Product product={product} />
                                        </Col>
                                    ))}
                                </Row>
                                <Paginate page={page} pages={pages} keyword={keyword} />
                            </div>
                }
            </Container>
        </div>
    )
}

export default HomeScreen
