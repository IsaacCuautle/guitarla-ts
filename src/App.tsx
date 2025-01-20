import { useReducer } from "react";

import Guitar from "./Components/Guitar";
import Header from "./Components/Header";
import { useCart } from "./hooks/useCart.js";
import { CartReducer, InitialState } from "./reducers/cart-reducer.js";


function App() {

  // Custom Hook del Carrito de compras
  const {
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    cleanCart,
    isEmpty,
    cartTotal
   } = useCart();

   const [ state, dispatch ] = useReducer( CartReducer, InitialState );

  return (
    <>

      {/* Props */}

      <Header
        cart = { cart }
        removeFromCart = { removeFromCart }
        increaseQuantity = { increaseQuantity }
        decreaseQuantity = { decreaseQuantity }
        cleanCart = { cleanCart }
        isEmpty = { isEmpty }
        cartTotal = { cartTotal }
        />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {

            // Itera sobre cada objeto de la DB
            state.data.map( (guitar) => (  
              
              <Guitar
                key={guitar.id}
                guitar = {guitar}
                dispatch = { dispatch }
              /> 
            
            ))
          }
        </div>

      </main>


      <footer className="bg-dark mt-5 py-5">
        
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
      
      </footer>
    </>
  )
}

export default App
