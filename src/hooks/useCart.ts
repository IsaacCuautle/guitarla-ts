import { useMemo } from "react";
import { useState, useEffect } from "react";
import type { Guitar, CartItem } from "../types/types";

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
    
    //* Añadir productos al carrito
    function addToCart ( item : Guitar ) {

        


    }

    //* Eliminar productos del carrito
    function removeFromCart( id : Guitar['id'] ) {

        // Filtra las guitarras en el carrito cuyo id sea diferente al que se le pasa a la funcion
        setCart( prevCart => prevCart.filter(guitar => guitar.id !== id) ) 
    
    }

    //* Incrementa la cantidad de un producto
    function increaseQuantity(id : Guitar['id']) {

        // Crea una copia del carrito he itera sobre ella
        const updatedCart = cart.map( item => {

        // Si el item coincide con el id, incrementa la cantidad de ese item en 1
        if(item.id === id && item.quantity < 5)
        {

            return{
            ...item,
            quantity: item.quantity + 1
            }

        }

        // Mantiene los demas elementos
        return item
        })

        // Setea el carrito
        setCart(updatedCart);
    
    }


    //* Decrementa la cantidad de un producto
    function decreaseQuantity(id : Guitar['id']) {

        // Crea una copia del carrito he itera sobre ella
        const updatedCart = cart.map( item => {

        // Si el item coincide con el id, decrementa la cantidad de ese item en 1
        if(item.id === id && item.quantity > 1)
        {

            return{
            ...item,
            quantity: item.quantity - 1
            }

        }

        // Mantiene los demas elementos
        return item
        })

        // Setea el carrito
        setCart(updatedCart);
    
    }

    //* Limpia el carrito
    function cleanCart() {
        
        setCart([]);

    }

    
    //* State Derivado

    // Verifica que el carrito esta vacio
    const isEmpty = useMemo(() => cart.length === 0, [cart]);

    // Calcula el total en el carrito de compras
    const cartTotal = useMemo( () => cart.reduce( (total, item) => total + (item.quantity * item.price), 0 ), [cart])


    return {
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        cleanCart,
        
        isEmpty,
        cartTotal
    }

}

export {
    useCart
}