//* Definicion de Types
export type Guitar = {
    id : number
    name : string
    image : string
    description : string
    price : number
}

export type GuitarProps = {
    guitar : Guitar, 
    addToCart : (item: Guitar) => void
}

// Hereda de Guitarra para type
export type CartItem = Guitar & {
    quantity: number
}

// LookUp
// export type GuitarID = Guitar['id'];
