import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalAmount, url } = useContext(StoreContext);
  const navigetive = useNavigate();

  return (
      <div className="cart">
        <div className="cart-items">
          <div className="cart-item-title">
            <p>Item Image</p>
            <p>Item Numbering</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove Item</p>
          </div>
          <hr />
          <div>
            {food_list.map((item, index) => {
              const quantity = cartItems[item._id];
              if (quantity > 0) {
                const total = (item.price * quantity).toFixed(2);
                return (
                    // Ensure `key` is added to the outermost element in the map
                    <div key={item._id}>
                      <div className="cart-item-title cart-item-item">
                        <img src={`${url}/images/${item.image}`} alt="" />
                        <p>{index + 1}</p>
                        <p>{item.name}</p>
                        <p>${item.price.toFixed(2)}</p>
                        <p>{quantity}</p>
                        <p>${total}</p>
                        <p>
                          <button onClick={() => removeFromCart(item._id)} className="cross">
                            X
                          </button>
                        </p>
                      </div>
                      <hr />
                    </div>
                );
              }
              return null;
            })}
          </div>
          <div className="cart-bottom">
            <div className="cart-total">
              <h2>Cart Total</h2>
              <div>
                <div className="cart-detail">
                  <p>Subtotal</p>
                  <p>${getTotalAmount()}</p>
                </div>
                <hr />
                <div className="cart-detail">
                  <p>Delivery Fee</p>
                  <p>${getTotalAmount() === 0 ? 0 : 1}</p>
                </div>
                <hr />
                <div className="cart-detail">
                  <p>Total</p>
                  <p>${getTotalAmount() === 0 ? 0 : getTotalAmount() + 1}</p>
                </div>
              </div>

              <div className="cart-promocode">
                <div>
                  <p>If you have a promo code, enter it here</p>
                  <div className="cart-promocode-input">
                    <input type="text" placeholder="Promo code" />
                    <button>Submit</button>
                  </div>
                </div>
              </div>
              <button onClick={() => navigetive('/order')}>PROCEED TO CHECKOUT</button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Cart;
