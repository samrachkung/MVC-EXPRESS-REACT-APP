import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";

const PlaceOrder = () => {
    const { getTotalAmount, token, food_list, cartItems, url } = useContext(StoreContext);
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: "",
    });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const placeOrder = async (event) => {
        event.preventDefault();

        try {
            const orderItems = food_list
                .filter((item) => cartItems[item._id] > 0)
                .map((item) => ({
                    ...item,
                    quantity: cartItems[item._id],
                }));

            if (orderItems.length === 0) {
                alert("Your cart is empty.");
                return;
            }

            const orderData = {
                userId: "replace_with_actual_user_id", // Replace with dynamic user ID
                items: orderItems,
                amount: getTotalAmount() + 1, // Including delivery fee
                address: data,
            };

            const response = await axios.post(`${url}/api/order/place`, orderData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.data.success) {
                // Redirect to Stripe Checkout session URL
                window.location.href = response.data.session_url;
            } else {
                alert("Failed to initiate payment.");
            }
        } catch (error) {
            console.error("Error placing order:", error);
            alert("Failed to place order.");
        }
    };

    return (
        <form onSubmit={placeOrder} className="place-order">
            <div className="place-order-left">
                <p className="title">Your Information For Delivery</p>
                <div className="multi-fields">
                    <input
                        required
                        name="firstName"
                        onChange={onChangeHandler}
                        value={data.firstName}
                        type="text"
                        placeholder="First name"
                    />
                    <input
                        required
                        name="lastName"
                        onChange={onChangeHandler}
                        value={data.lastName}
                        type="text"
                        placeholder="Last name"
                    />
                </div>
                <input
                    required
                    name="email"
                    onChange={onChangeHandler}
                    value={data.email}
                    type="email"
                    placeholder="Email Address"
                />
                <input
                    required
                    name="street"
                    onChange={onChangeHandler}
                    value={data.street}
                    type="text"
                    placeholder="Street"
                />
                <div className="multi-fields">
                    <input
                        required
                        name="city"
                        onChange={onChangeHandler}
                        value={data.city}
                        type="text"
                        placeholder="City"
                    />
                    <input
                        required
                        name="state"
                        onChange={onChangeHandler}
                        value={data.state}
                        type="text"
                        placeholder="State"
                    />
                </div>
                <div className="multi-fields">
                    <input
                        required
                        name="zipcode"
                        onChange={onChangeHandler}
                        value={data.zipcode}
                        type="text"
                        placeholder="Zip code"
                    />
                    <input
                        required
                        name="country"
                        onChange={onChangeHandler}
                        value={data.country}
                        type="text"
                        placeholder="Country"
                    />
                </div>
                <input
                    required
                    name="phone"
                    onChange={onChangeHandler}
                    value={data.phone}
                    type="text"
                    placeholder="Phone Number"
                />
            </div>
            <div className="place-order-right">
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
                        <button type="submit" className="button-primary">
                            PROCESS TO PAYMENT
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default PlaceOrder;
