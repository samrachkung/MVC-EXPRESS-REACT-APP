import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartIteam, food_list, removeFromCart, getTotatalAmount,url} = useContext(StoreContext);
  const navigetive = useNavigate();

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-item-title">
          <p>Iteam image</p>
          <p>Item Numbering</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove Iteam</p>
        </div>
        <hr />
        <div>
          {food_list.map((item, index) => {
            const quantity = cartIteam[item._id];
            if (quantity > 0) {
              const total = (item.price * quantity).toFixed(2);
              return (
                <div>
                  <div key={item._id} className='cart-item-title cart-item-item'>
                    <img src={url+"/images/"+item.image} alt="" />
                    <p>{index + 1}</p>
                    <p>{item.name}</p>
                    <p>${item.price.toFixed(2)}</p>
                    <p>{quantity}</p>
                    <p>${total}</p>
                    <p>
                      <button onClick={() => removeFromCart(item._id)} className='cross'>X</button>
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
            </div>

            <div className="cart-promocode">
              <div>
                <p>If you have promo code, enter here</p>
                <div className='cart-promocode-input'>
                  <input type="text" placeholder='Promocode' />
                  <button>Submit</button>
                </div>
              </div>
            </div>
            <button onClick={()=>navigetive('/order')} style="color=">PROCESS TO CHECKOUT</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;
