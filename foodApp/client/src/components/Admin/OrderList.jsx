import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deliverOrder, getAllOrders } from "./../../actions/orderAction";
import { Table, Button, Col } from "react-bootstrap";
import Loader from "./../Loader";
import Error from "./../Error";
import axios from "axios";

const OrderList = () => {
  const allOrdersState = useSelector((state) => state.allUserOrdersReducer);
  const { loading, orders, error } = allOrdersState;
  const [order, setOrders] = useState([]);

  const deleteOrder = (id) => {
    setTimeout(()=>{
      handleDelete(id);
      window.location.href = "/admin/orderlist";
  
    },600);
  };

  

  const handleDelete = (orderId) => {
    // Send a DELETE request to the backend API to delete the entry with the given ID
    axios.delete(`/api/orders/${orderId}`).then((response) => {
      if (response.status === 200) {
        // If the delete request was successful, remove the entry from the component's state
        setOrders(order.filter((order) => order._id !== orderId));
      }
    });
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);
  return (
    <div>
      <h1>Order Lists</h1>
      {loading && <Loader />}
      {error && <Error error="Admin Order req fail" />}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order Id</th>
            <th> Name</th>
            <th>Email</th>
            <th>Item</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Payment</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.name}</td>
                <td>{order.email}</td>
                {/* {order.orderItems.map((item) => (
                 <td key={item.name}>{item.name}({item.varient}) | </td>
                ))} */}
                {/* <td>{item.name}</td> */}
              
                <Col md={12}>
                {order.orderItems.map((item) => (
                  <h6 key={item.name}>
                    {item.name}
                  </h6>
                ))}
              </Col>
                <td>₹{order.orderAmount}/-</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.transactionStatus}</td>

                <td>
                  {" "}
                  {order.isDeliverd ? (<>
                    <h6 className="text-success">Deliverd</h6>
                    
                       {deleteOrder(order._id)}
                   
                 
                    </>
                  ) : (
                    <>
                      <Button
                        className="btn-danger"
                        onClick={() => {
                          dispatch(deliverOrder(order._id));
                        }}
                      >
                        Deliver
                      </Button>
                    </>
                  )}{" "}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default OrderList;
