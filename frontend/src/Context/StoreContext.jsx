import React, { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartIteam, setCartIteam] = useState({});
    const [category, setCategory] = useState("ALL");
    const url = "http://localhost:4000";
    const [token,setToken] = useState("")
    const [food_list,setFoodlist] = useState([])

    const addToCart = (iteamId) => {
        if (!cartIteam[iteamId]) {
            setCartIteam((prev) => ({ ...prev, [iteamId]: 1 }));
        } else {
            setCartIteam((prev) => ({ ...prev, [iteamId]: prev[iteamId] + 1 }));
        }
    };

    const removeFromCart = (iteamId) => {
        setCartIteam((prev) => ({ ...prev, [iteamId]: prev[iteamId] - 1 }));
    
    };

    const getTotatalAmount = () => {
        let totalAmount = 0;
        for (const item in cartIteam) {
            if (cartIteam[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartIteam[item]
            }
        }
        return totalAmount;
    }

    const fetchFoodlist = async ()=>{
        const response = await axios.get(url+"/api/food/list");
        setFoodlist(response.data.data)
    }


    useEffect(()=>{
         
        async function loadData(){
            await fetchFoodlist()
        }
        if (localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"));
        }
        loadData();

    },[])
    const contextValue = {
        food_list,
        cartIteam,
        setCartIteam,
        addToCart,
        removeFromCart,
        getTotatalAmount,
        url,
        token,
        setToken,
        category, // Add category to context
        setCategory // Add setCategory to context


    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider; 
