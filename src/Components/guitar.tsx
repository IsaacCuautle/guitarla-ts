import type { Guitar, GuitarProps } from '../types/types'

export default function Guitar({guitar, dispatch} : GuitarProps) {
  
  // Destructuring de guitar
  const { image, name, description, price } = guitar

  return(

        <div className="col-md-6 col-lg-4 my-4 row align-items-center">
            <div className="col-4">
              <img className="img-fluid" src={'/img/'+image+'.jpg'} alt="imagen guitarra" />
            </div>
            <div className="col-8">
              <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
              <p>{description}</p>
              <p className="fw-black text-primary fs-3">${price}</p>
              <button
                //* Añadir productos al carrito
                onClick = { () => dispatch( { type : 'add-to-cart', payload : { item : guitar } } ) }
                type="button"
                className="btn btn-dark w-100"
              >Agregar al Carrito</button>
            </div>
          </div>

    );
}