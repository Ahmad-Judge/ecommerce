import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState({});

    useEffect(() => {
        const storedCart = Cookies.get("cart");
        setCart(storedCart ? JSON.parse(storedCart) : {});
    }, []);

    const updateCart = (updatedCart) => {
        setCart(updatedCart);
        Cookies.set("cart", JSON.stringify(updatedCart), { expires: 1 }); // Expires in 1 day
    };

    return (
        <CartContext.Provider value={{ cart, updateCart }}>
            {children}
        </CartContext.Provider>
    );
};
