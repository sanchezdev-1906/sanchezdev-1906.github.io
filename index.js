const request = indexedDB.open("dover", 1)
request.onupgradeneeded = ()=>{
    const db = request.result
    const users = db.createObjectStore(
        "users", 
        {keyPath: "email"}
    )
    users.createIndex(
        "username",
        "username", 
        {unique: true}
    )


    const articles = db.createObjectStore(
        "articles", 
        {keyPath: "id", autoIncrement: true}
    )
    articles.createIndex(
        "user",
        "user", 
        {unique: false}
    )
    articles.createIndex(
        "datetime",
        "datetime", 
        {unique: false}
    )
    const comments = db.createObjectStore(
        "comments", 
        {keyPath: "id", autoIncrement: true}
    )
    comments.createIndex(
        "articleid",
        "articleid", 
        {unique: false}
    )
    comments.createIndex(
        "datetime",
        "datetime", 
        {unique: false}
    )
    const products = db.createObjectStore(
        "products", 
        {keyPath: "id", autoIncrement: true}
    )
    products.createIndex(
        "username",
        "username", 
        {unique: false}
    )
    const tags = db.createObjectStore(
        "tags", 
        {keyPath: "name"}
    )
    
}