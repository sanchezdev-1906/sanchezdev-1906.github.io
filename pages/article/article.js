import { initial, DBData } from "/scripts/indexeddb.js";
const container = document.querySelector(".article-container")

addEventListener("load",()=>{
  let params = new URLSearchParams(window.location.search);
  let aid = parseInt(params.get('aid'));
  if (!aid) {
      location.replace("/")
  }

  let request = indexedDB.open(DBData.name, DBData.version)
  request.onsuccess = function () {
    let db = request.result
    db.transaction(["articles"]).objectStore("articles").get(aid).onsuccess = function (event) {
      let article = event.target.result
      if (!article) {
        location.replace("/")
      }
      let fecha = new Date(article.datetime).toLocaleString()
      container.querySelector(".article__title").textContent = article.title 
      container.querySelector(".article__date").textContent = fecha
      container.querySelector(".article__content").innerHTML = article.content
      
      db.transaction(["users"]).objectStore("users").index("username").get(article.user).onsuccess = function (event) {
        let user = event.target.result
        container.querySelector(".user__img").src = user.img?user.img:"/assets/img/default-user.png"
        container.querySelector(".user__username").textContent = user.username
      }
    }

  }
  
})