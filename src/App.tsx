import { useReducer, useEffect } from "react";

import Guitar from "./Components/Guitar";
import Header from "./Components/Header";
import { CartReducer, InitialState } from "./reducers/cart-reducer.js";


function App() {

  const [ state, dispatch ] = useReducer( CartReducer, InitialState );

  useEffect( () => {

    // Mantiene los productos del carrito de compras
    localStorage.setItem( 'Cart', JSON.stringify(state.cart) );
    console.log(localStorage);

  }, [state.cart])

  return (
    <>

      {/* Props */}

      <Header

        cart = { state.cart }
        dispatch = { dispatch }

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
