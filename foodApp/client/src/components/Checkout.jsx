import React from "react";
import { Button } from "react-bootstrap";
import StripeCheckout from "react-stripe-checkout";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../actions/orderAction";
import { placeCashOrder } from "../actions/orderAction";

import Loader from "./Loader";
import Error from "./Error";
import Success from "./Success";

const Checkout = ({ subTotal }) => {
  const dispatch = useDispatch();

  const placeOrderState = useSelector((state) => state.placeOrderReducer);
  const { loading: cardLoading, error: cardError, success: cardSuccess } = placeOrderState;

  const placeCashOrderState = useSelector((state) => state.placeCashOrderReducer);
  const { loading: cashLoading, error: cashError, success: cashSuccess } = placeCashOrderState;

  const handleToken = (token) => {
    dispatch(placeOrder(token, subTotal));
    console.log(token, subTotal);
  };

  const handleCashOrder = () => {
    dispatch(placeCashOrder(subTotal));
  };

  return (
    <>
      {cardLoading || cashLoading ? <Loader /> : null}

      {cardError || cashError ? <Error error="Something went wrong" /> : null}

      {cardSuccess ? <Success success="Order and payment success!" /> : null}

      {cashSuccess ? <Success success="Your order has been placed!" /> : null}
      <div className="d-flex justify-content-between align-items-center mb-3 mt-3">
  <StripeCheckout
  className="w-50"
    amount={subTotal * 100}
    shippingAddress
    token={handleToken}
    stripeKey="pk_test_51HT3awLRpPHpN9zVZksDRZ16m6HANATIi914WwDG7xbmNKQGsMyXEBTuUxlNZlkZ3EYFsfu5t0NQDeNQYbukyICZ000lVzvD9Y"
    currency="INR"
  >
    <Button variant="primary" >
      Pay Now
    </Button>
  </StripeCheckout>


  <Button variant="info" className="w-25" onClick={handleCashOrder}>
    Pay Later
  </Button>
</div>

    </>
  );
};

export default Checkout;
