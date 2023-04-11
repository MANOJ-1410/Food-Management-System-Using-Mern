import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { FaMinusCircle, FaPlusCircle, FaTrash } from "react-icons/fa";
import { addToCart, deleteFromCart } from "../actions/cartAction";
import Checkout from "../components/Checkout";
const CartScreen = () => {
  const cartState = useSelector((state) => state.cartReducer);
  const cartItems = cartState.cartItems;
  const dispatch = useDispatch();
  const subTotal = cartItems.reduce((x, item) => x + item.price, 0);
  return (
    <>
      <Container className="my-5">
        <Row>
          <Col md={6}>
            <h1>My Cart</h1>
            <hr />
            {cartItems.map((item) => (
              <Row key={item._id} className="my-3 align-items-center">
                <Col md={7}>
                  <h5 className="mb-0">
                    {item.name}
                  </h5>
                  <p className="text-muted mb-0">
                    Price: {item.quantity} * {item.prices} ={" "}
                    {item.price}
                  </p>
                  <div className="d-flex align-items-center">
                    <h6 className="mb-0 mr-2">Quantity:</h6>
                    <FaMinusCircle
                      className="text-danger"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        dispatch(
                          addToCart(item, item.quantity - 1)
                        );
                      }}
                    />
                    <span className="mx-2">{item.quantity}</span>
                    <FaPlusCircle
                      className="text-success"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        dispatch(
                          addToCart(item, item.quantity + 1)
                        );
                      }}
                    />
                  </div>
                </Col>
                <Col md={5} className="text-center">
                  <img
                    alt={item.name}
                    src={item.image}
                    style={{ width: "80px", height: "80px" }}
                  />
                  <FaTrash
                    className="text-danger my-3 mx-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      dispatch(deleteFromCart(item));
                    }}
                  />
                </Col>
              </Row>
            ))}
          </Col>
          <Col md={5} className="mx-auto">
            <div className="bg-light  p-4">

              <h1 className="text-center">Payment Info</h1>
              <hr />
              <h4>Your Total: ₹{subTotal}</h4>
              <div className="my-4">
      <Checkout subTotal={subTotal} />
    </div>
              <hr />
              <h6 className="text-center">Click On Pay To Confirm Your Item</h6>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CartScreen;
