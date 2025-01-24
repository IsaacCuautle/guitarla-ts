import { db } from "../data/db"
import { CartItem, Guitar } from "../types/types"

// Aciones del carrito
export type CartActions = 
{
    type : 'add-to-cart',
    payload : { item: Guitar }

} |
{
    type : 'remove-from-cart',
    payload : { id : Guitar['id'] }

} |
{
    type : 'decrease-quantity',
    payload : { id : Guitar['id'] }
} |
{
    type : 'increase-quantity',
    payload : { id : Guitar['id'] }
} |
{
    type: 'clear-cart'
}

// Type y State Inicial
export type CartState = {

    data: Guitar[],
    cart: CartItem[]

}

//* Recupera el carrito de compras
export const initialCart = () : CartItem[] => {
    
    const localStorageCart = localStorage.getItem('Cart');
    console.log(localStorageCart);
    
        
    // Comprueba si ya existe un carrito de compras
    return localStorageCart ? JSON.parse(localStorageCart) : []
}

export const InitialState : CartState = {
    
    data: db,
    cart: initialCart()

}

// Reducers
export const CartReducer = 
(
    state: CartState = InitialState,
    action: CartActions
) => 
{

    const MAX_ITEMS : number = 5;
    const MIN_ITEMS : number = 1;
    
    if ( action.type === 'add-to-cart' ) 
    {

        // Comprueba si ya existe ese item en el carrito
        const itemExist = state.cart.find( guitar => guitar.id === action.payload.item.id);
        
        let updatedCart : CartItem[] = [];

        // Logica del carrito
        if (itemExist)
        {

            updatedCart = state.cart.map( item => {

                // Comprueba si ya existe el item en el carrito
                if ( item.id === action.payload.item.id )
                {

                    // Cuemprueba la cantidad de un item en el carrito
                    if ( item.quantity < MAX_ITEMS )
                    {

                        return {

                            ...item,
                            quantity : item.quantity++

                        };

                    } else {

                        return item;

                    }

                } else {

                    return item;

                }
 
            } );
        
        } else {
        
            // Agrega el item al carrito
            const newItem : CartItem = {...action.payload.item, quantity : MIN_ITEMS}
            updatedCart = [ ...state.cart, newItem ];

        };


        return {

            ...state,
            cart: updatedCart
        
        };

    }

    if ( action.type === 'remove-from-cart' ) 
    {

        // Filtra los items en el carrito cuyo id sea diferente 
        const cart = state.cart.filter( item => item.id !== action.payload.id)

        return {
            ...state,
            cart 
        };

    }

    if ( action.type === 'decrease-quantity' ) 
    {
        // Crea una copia del carrito he itera sobre ella
        const cart = state.cart.map( item => {

            // Si el item coincide con el id, incrementa la cantidad de ese item en 1
            if(item.id === action.payload.id && item.quantity > MIN_ITEMS)
            {

                return{

                    ...item,
                    quantity: item.quantity - 1

                }

            }

            // Mantiene los demas elementos
            return item
        })


        return {

            ...state,
            cart

        };

    }

    if ( action.type === 'increase-quantity' ) 
    {

        // Crea una copia del carrito he itera sobre ella
        const cart = state.cart.map( item => {

            // Si el item coincide con el id, incrementa la cantidad de ese item en 1
            if(item.id === action.payload.id && item.quantity < MAX_ITEMS)
            {
    
                return{
                    ...item,
                    quantity: item.quantity + 1
                }
    
            }
    
            // Mantiene los demas elementos
            return item
        })
    

        return {

            ...state,
            cart

        };

    }

    if ( action.type === 'clear-cart' ) 
    {

        const cart = state.cart = [];

        return {
            ...state,
            cart
        };

    }

    return state;

}