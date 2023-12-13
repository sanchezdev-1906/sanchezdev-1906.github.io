import { initial, DBData } from "./scripts/indexeddb.js";
import Article from "./components/Article.js";
const articlesContainer = document.querySelector(".articles-container")
let offset = 1, total
let likes
let user

$("#loadContent").on("click",()=>{
  
  if (offset < total) {
    getArticles(offset, (items) => {
      let fragment = document.createDocumentFragment()
      items.forEach((item) => {
        if (user && likes.likes.includes(item.id)) {
          fragment.append(Article(item, putLike,true))
        }
        else{
          fragment.append(Article(item, putLike))
        }
      });
      articlesContainer.append(fragment)
      offset += 5
      if (offset >= total) $("#loadContent").addClass("hidden")
    });
  }else{
    $("#loadContent").addClass("hidden")
  }
})

addEventListener("load", () => {
  getTotal()

  getArticles(offset, async (items) => {
    user = JSON.parse(localStorage.getItem("localuser")) 
    if (user) {
      likes = await getLikes(user.username)
    }

    let fragment = document.createDocumentFragment()
    items.forEach((item) => 
    {
      if (user && likes.likes.includes(item.id)) {
        fragment.append(Article(item, putLike,true))
      }
      else{
        fragment.append(Article(item, putLike))
      }
    });
    articlesContainer.append(fragment)
    offset += 5
    if (offset >= total) $("#loadContent").addClass("hidden")

    
  });
});

function putLike(action, articleid){
  let request = indexedDB.open(DBData.name, DBData.version);

  request.onsuccess = function () {
      let db = request.result;
      let transaction = db.transaction(["likes","articles"], "readwrite");
      let likesStore = transaction.objectStore("likes");
      let articlesStore = transaction.objectStore("articles");
      if (action == "like") {
        articlesStore.get(articleid).onsuccess = function (event) {
          let item = event.target.result
          item.likes += 1
          articlesStore.put(item)
        }
        likesStore.get(user.username).onsuccess = function (event) {
          let item = event.target.result
          item.likes.push(articleid)
          likesStore.put(item)
        }
      }
      else if (action == "unlike") {
        articlesStore.get(articleid).onsuccess = function (event) {
          let item = event.target.result
          item.likes -= 1
          articlesStore.put(item)
        }
        likesStore.get(user.username).onsuccess = function (event) {
          let item = event.target.result
          let index = item.likes.indexOf(articleid);
          if (index != -1) {
            item.likes.splice(index,1)
            likesStore.put(item)
          }
        }
      }
  };
}
  
function getArticles(offset, fb){
  let request = indexedDB.open(DBData.name, DBData.version)
  request.onsuccess = function (e) {
    let db = request.result
    let articles = []
    db.transaction(["articles"]).objectStore("articles").openCursor(IDBKeyRange.bound(offset, offset+5, false, true)).onsuccess = function (event) {
      let cursor = event.target.result;
      if (cursor) {
        articles.push(cursor.value);
        cursor.continue()
      }
      else{
        fb(articles)
      }
    }
  }
}
function getTotal(){
  let request = indexedDB.open(DBData.name, DBData.version)
  request.onsuccess = function (e) {
    let db = request.result
    db.transaction(["articles"]).objectStore("articles").count().onsuccess = function (eCount) {
      total = eCount.target.result
    }
  }
}

function getLikes(user) {
  return new Promise((resolve, reject) => {
      let request = indexedDB.open(DBData.name, DBData.version);

      request.onsuccess = function () {
          let db = request.result;
          let transaction = db.transaction("likes", "readonly");
          let objectStore = transaction.objectStore("likes");

          let getRequest = objectStore.get(user);

          getRequest.onsuccess = function (event) {
              let item = event.target.result;
              resolve(item);
          };

          getRequest.onerror = function (event) {
              createLikes(user)
              reject(event.error);
          };
      };

      request.onerror = function (event) {
          reject(event.error);
      };
  });
}

function createLikes(user) {
  let request = indexedDB.open(DBData.name, DBData.version);

  request.onsuccess = function () {
      let db = request.result;
      let transaction = db.transaction("likes", "readwrite");
      let objectStore = transaction.objectStore("likes");
      objectStore.add({user, likes:[]});
  };
}