import React, { useEffect, useState } from 'react';
import './Orders.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from "../../assets/assets.js";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Error fetching data");
      }
    } catch (error) {
      toast.error("An error occurred while fetching orders");
    } finally {
      setLoading(false);
    }
  };
  const statusHandler = async (event,order_id) => {
    const response = await axios.post(`${url}/api/order/status`,{
      order_id,status:event.target.value
    })
    if(response.data.success) {
      await fetchOrders();
    }

  }

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
      <div className="order add">
        <h3>Order Page</h3>
        {loading ? (
            <p>Loading orders...</p>
        ) : (
            <div className="order-list">
              {orders.length > 0 ? (
                  orders.map((order, index) => (
                      <div key={index} className="order-item">
                        <img
                            src={assets?.parcel_icon || "placeholder.png"}
                            alt="Parcel Icon"
                            className="order-item-icon"
                        />
                        <div>
                          <p className="order-item-food">
                            {order.items.map((item, i) =>
                                `${item.name} x ${item.quantity}${i < order.items.length - 1 ? ", " : ""}`
                            )}
                          </p>
                          <p className="order-item-name">
                            {order.address.firstName+" " + order.address.lastName}
                          </p>
                          <div className="order-item-add">
                            <p>{order.address.street+" , "}</p>
                            <p>{order.address.city+" , " + order.address.state + " , " + order.address.country + " , " + order.address.zipcode} </p>
                          </div>
                          <p className='order-item-phone'>
                            {order.address.phone}
                          </p>
                        </div>
                        <p>Items : {order.items.length}</p>
                        <p>${order.amount}</p>
                        <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}>
                          <option value="Food Processing">Food Processing</option>
                          <option value="Out For Delivery">Out For Delivery</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </div>
                  ))
              ) : (
                  <p>No orders available.</p>
              )}
            </div>
        )}
      </div>
  );
};

export default Orders;
