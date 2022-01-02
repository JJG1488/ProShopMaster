import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import { Rating } from '../components/Rating';
// import products from '../products';
import axios from 'axios';

export const ProductScreen = () => {

    const { id } = useParams();
    const [product, setProducts] = useState({});

    useEffect(() => {
        const fetchProduct = async () => {
            const { data } = await axios.get(`/api/products/${id}`);
            // console.log(data)
            setProducts(data);
        }
        fetchProduct()
    }, [id])


    return (
        <>
            <Link className='btn btn-dark my-3' to='/frontend/'>Go Back</Link>
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid></Image>
                </Col>
                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating
                                value={`${product.rating}`}
                                text={`${product.numReviews} reviews`} />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price: ${product.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Description: {product.description}
                        </ListGroup.Item>
                    </ListGroup>

                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup.Item variant='flush'>
                            <Row>
                                <Col>
                                    Status:
                                </Col>
                                <Col>
                                    {product.countInStock > 0 ? 'In Stock' : 'Out Stock'}
                                </Col>
                                <Col>
                                    <strong>${product.price}</strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button className='btn-block' type='button' disabled={product.countInStock === 0}>
                                Add to Cart
                            </Button>
                        </ListGroup.Item>
                    </Card>
                </Col>
            </Row>
        </>
    )
}
