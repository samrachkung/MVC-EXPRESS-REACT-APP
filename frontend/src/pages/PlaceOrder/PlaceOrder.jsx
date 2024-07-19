import React, { useContext } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../Context/StoreContext';

const PlaceOrder = () => {
  const { getTotatalAmount } = useContext(StoreContext);

  return (
    <form className='place-order'>
      <div className="place-order-left">
        <p className="title">Your information For delivery</p>
        <div className="multi-fields">
          <input type="text" placeholder='First name' />
          <input type="text" placeholder='Last name' />
        </div>
        <input type="email" placeholder='Email Address' />
        <input type="text" placeholder='Street' />
        <div className="multi-fields">
          <input type="text" placeholder='City' />
          <input type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input type="text" placeholder='Zip code' />
          <input type="text" placeholder='Country ' />
        </div>
        <input type="text" placeholder='Phone Number' />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart total</h2>
          <div>
          <div className="cart-detail">
                <p>Subtotal</p>
                <p>${getTotatalAmount()}</p>

              </div>
              <hr />
              <div className="cart-detail">
                <p>Delivery Fee</p>
                <p>${getTotatalAmount()===0?0:1}</p>

              </div>
              <hr />
              <div className="cart-detail">
                <p>Total</p>
                <p>${getTotatalAmount()===0?0:getTotatalAmount()+1}</p>
              </div>
            <button className="button-primary">PROCESS TO PAYMENT</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
