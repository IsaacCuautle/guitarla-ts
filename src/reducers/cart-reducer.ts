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

export const InitialState : CartState = {
    
    data: db,
    cart: []

}

// Reducers
export const CartReducer = 
(
    state: CartState = InitialState,
    action: CartActions
) => 
{

    const MAX_ITEMS : number = 5;
    const MIN_ITEMS : number = 0;
    
    if ( action.type === 'add-to-cart' ) 
    {

        // Comprueba si ya existe ese item en el carrito
        const itemExist = state.cart.find( guitar => guitar.id === action.payload.item.id);
        console.log(itemExist);
        
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
            const newItem : CartItem = {...action.payload.item, quantity : 1}
            updatedCart = [ ...state.cart, newItem ];

        };


        return {

            ...state,
            cart: updatedCart
        
        };

    }

    if ( action.type === 'remove-from-cart' ) 
    {

        return {
            ...state
        };

    }

    if ( action.type === 'decrease-quantity' ) 
    {

        return {
            ...state
        };

    }

    if ( action.type === 'increase-quantity' ) 
    {

        return {
            ...state
        };

    }

    if ( action.type === 'clear-cart' ) 
    {

        return {
            ...state
        };

    }

    return state;

}