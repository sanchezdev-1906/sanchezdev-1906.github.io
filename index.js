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

let offsetPage = 0

addEventListener("load", () => {
    let request = indexedDB.open("dover", 1);
  
    request.onerror = function (event) {
      console.log("Error al abrir la base de datos");
    };
  
    request.onsuccess = () => {
      let db = request.result;
  
      getArticles(db, 5, offsetPage, (items) => {
          console.log(items);
        items.forEach((element) => {
        });
      });
    };
  });
  
  function getArticles(db, n, offset, callback) {
    let transaction = db.transaction("articles", "readonly");
    let objectStore = transaction.objectStore("articles");
    let result = [];
    let count = 0;
  
    let cursorRequest = objectStore.openCursor(null, "prev");
  
    cursorRequest.onsuccess = function (event) {
      let cursor = event.target.result;
  
      while (cursor && (offset > 0 || count < n)) {
        if (offset > 0) {
          offset--;
        } else {
          result.push(cursor.value);
          count++;
        }
        cursor = cursor.continue();
      }
  
      if (!cursor || count >= n) {
        callback(result.reverse());
      }
    };
  
    cursorRequest.onerror = function (event) {
      console.log("Error al abrir el cursor");
    };
  }