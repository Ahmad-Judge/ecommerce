import React from "react";
import { useCart } from "./cartcontext";
import { useLocation, useNavigate } from "react-router-dom";
import "./confirmOrder.css";

const ConfirmOrder = () => {

    return (
        <div className="confirm-order-container">
         

            <div className="order-summary">
           Order Confirmed
            </div>

          
        </div>
    );
};

export default ConfirmOrder;
