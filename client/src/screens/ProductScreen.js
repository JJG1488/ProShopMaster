import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate, useMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import { Rating } from "../components/Rating";
import { listProductDetails } from "../actions/productActions.js";
import Message from "../components/Message.js";
import { Loader } from "../components/Loader.js";
// import products from '../products';
// import axios from 'axios';

export const ProductScreen = () => {
  // ================ old code
  // const { id } = useParams();
  //   const [product, setProducts] = useState({});

  //   useEffect(() => {
  //     const fetchProduct = async () => {
  //       const { data } = await axios.get(`/api/products/${id}`);
  //       // console.log(data)
  //       setProducts(data);
  //     };
  //     fetchProduct();
  //   }, [id]);

  const [qty, setQty] = useState(0);
  const dispatch = useDispatch();
  //   console.log(useParams());
  let { id } = useParams();
  let { match } = useMatch(`/product/${id}`);
  let navigate = useNavigate();
  //   console.log(match);
  //   console.log(history);
  //   console.log(id);

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, match, id]);

  const addToCartHandler = function () {
    //   you want this to go to the cart page
    // you want the product id and the quantity as a query string so you have to use "match" for that
    // match is already destructured above from props
    // "history" has to also be added in order to push using the line props.history.push() <=== this code redirects
    // this line redirects to the item and gets the quantity by adding a query string to the end of the query and sets the quantity of the product to whatever to user selects (so essentially grabs and changes the value)
    navigate(`/cart/${id}?qty=${qty}`);
    // console.log(history.push());
  };

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  return (
    <>
      <Link className="btn btn-dark my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid></Image>
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={`${product.rating}`}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
              <ListGroup.Item>
                Description: {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup.Item variant="flush">
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? "In Stock" : "Out Stock"}
                  </Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>
                    <Col>
                      <Form.Control
                        as="select"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                {/*  for add to cart button, create a submit handler for the button (addToCartHandler)*/}
                {/* we want to add an onclick to the button itself (remember "onClick" ) that is going to submit the cart information*/}
                {/* put the handler below the useEffect (dev preference) */}

                <Button
                  onClick={addToCartHandler}
                  className="btn-block"
                  type="button"
                  disabled={product.countInStock === 0}
                >
                  Add to Cart
                </Button>
              </ListGroup.Item>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};
