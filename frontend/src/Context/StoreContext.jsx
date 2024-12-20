import React, {createContext, useEffect, useState} from "react";
import axios from 'axios';

export const StoreContext = createContext(null);
const StoreContextProvider = (props) => {
    const [cartItems, setCartItem] = useState({});
    const [category, setCategory] = useState("ALL");
    const url = "http://localhost:4000";
    const [token, setToken] = useState("")
    const [food_list, setFoodlist] = useState([])
    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItem((prev) => ({...prev, [itemId]: 1}));
        } else {
            setCartItem((prev) => ({...prev, [itemId]: prev[itemId] + 1}));
        }
        if (token) {
            try {
                await axios.post(url + "/api/cart/add", {itemId}, {headers: {Authorization: `Bearer ${token}`}});
            } catch (error) {
                console.error("Error adding to cart:", error);
            }
        }
    };
    const removeFromCart = async (itemId) => {
        setCartItem((prev) => ({...prev, [itemId]: prev[itemId] - 1}));
        if (token) {
            try {
                await axios.post(url + "/api/cart/remove", {itemId}, {headers: {Authorization: `Bearer ${token}`}});
            } catch (error) {
                console.error("Error removing from cart:", error);
            }
        }
    };
    const getTotalAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                if (itemInfo) {  // Check if itemInfo is found
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    }
    const fetchFoodlist = async () => {
        try {
            const response = await axios.get(url + "/api/food/list");
            setFoodlist(response.data.data);
        } catch (error) {
            console.error("Error fetching food list", error);
        }
    };
    const loadCartData = async (token) => {
        try {
            const response = await axios.post(
                url + "/api/cart/get",
                {}, // Empty object if no parameters are required
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setCartItem(response.data.cartData);
        } catch (error) {
            console.error("Error loading cart data", error);
        }
    };
    
    
    useEffect(() => {
        async function loadData() {
            await fetchFoodlist();
            const savedToken = localStorage.getItem("token");
            if (savedToken) {
                setToken(savedToken);
                await loadCartData(savedToken);
            }
        }

        loadData();
    }, []);
    const contextValue = {
        food_list,
        cartItems,
        setCartItem,
        addToCart,
        removeFromCart,
        getTotalAmount,
        url,
        token,
        setToken,
        category,
        setCategory


    };
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider; 
