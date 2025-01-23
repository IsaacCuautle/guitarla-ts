import { useState, useEffect } from "react";

import type { CartItem } from "../types/types";

const useCart = () => {

    //* Recupera el carrito de compras
    const initialCart = () : CartItem[] => {
        const localStorageCart = localStorage.getItem('cart');
        
        // Comprueba si ya existe un carrito de compras
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

    const [cart, setCart] = useState( initialCart );

    useEffect( () => {

        // Mantiene los productos del carrito de compras
        localStorage.setItem( 'cart', JSON.stringify(cart) );

    }, [cart])
    

    //* Limpia el carrito
    function cleanCart() {
        
        setCart([]);

    }


    return {

        cart,
        cleanCart
    }

}

export {
    useCart
}