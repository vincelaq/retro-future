import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Product({ product }) {
    return (
        <Card className="mt-3 mb-5 border-0 bg-transparent">
            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} style={{height: '18rem', objectFit: 'cover'}} />
            </Link>
            <Card.Body className='bg-transparent px-0 py-2'>
                <Link to={`/product/${product._id}`} style={{textDecoration: 'none'}}>
                    <Card.Title as="h4" className='py-0' style={{textDecoration: 'none'}}>
                        <strong style={{fontWeight: '700'}}>{product.name}</strong>
                    </Card.Title>
                </Link>

                <Card.Text as="h5">
                    ${product.price}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product
