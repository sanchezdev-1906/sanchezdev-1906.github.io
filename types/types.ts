type Usuario = {
    username: string, // keypath
    email: string, // index, unique
    alias: string, // nullable, non-unique
    password: string, // contraseña
    description: string,  // nullable
    img: number[] // nullable
}

type Article = {
    id: number, // keypath, autoincrement
    user: string // index, non-unique
    title: string,
    datetime: string, // index, non-unique
    content: string,  
    img: number[], // nullable
    tags: string[],
    likes: number
}

type Comentario = {
    id: number, // keypath, autoincrement
    articleid: number, //index, non-unique
    datetime: string // index, non-unique
    user: string,
    content: string,
    likes: number,
}

type Product = {
    id: number, // keypath, autoincrement
    user: string, // index, non-unique
    name: string,
    image: number[],
    description: string,
    buys: number,
    price: number,
}

type Tag = {
    name: string, // keypath
    quantity: number,
}
