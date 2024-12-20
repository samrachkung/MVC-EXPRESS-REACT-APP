import React, { useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";
import "./Verify.css";

const Verify = () => {
    const [searchParams] = useSearchParams();
    const success = searchParams.get("success");//catch success url
    const order_id = searchParams.get("order_id");
    const { url } = useContext(StoreContext);//backend url
    const navigate = useNavigate();//navigate to other page
    const verifyPayment = async () => {
        if (!success || !order_id) {
            console.error("Missing query parameters:", { success, order_id });
            navigate("/"); // Redirect to home if parameters are invalid
            return;
        }
        try {
            console.log("Verifying payment with:", { success, order_id });
            const response = await axios.post(
                `${url}/api/order/verify`,
                { success, order_id },
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
            if (response.data.success) {
                console.log("Payment verification successful:", response.data);
                navigate("/myorder");
            } else {
                console.warn("Payment verification failed:", response.data.message);
                navigate("/");
            }
        } catch (error) {
            if (error.response) {
                console.error("API Response Error:", error.response.data);
            } else if (error.request) {
                console.error("No response received from API:", error.request);
            } else {
                console.error("Error creating request:", error.message);
            }
            navigate("/");
        }
    };

    useEffect(() => {
        verifyPayment();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="verify">
            <div className="spinner">
                <p>Verifying your payment, please wait...</p>
            </div>
        </div>
    );
};

export default Verify;
