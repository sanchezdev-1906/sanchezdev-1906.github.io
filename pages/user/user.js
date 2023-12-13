import { initial, DBData } from "/scripts/indexeddb.js";

addEventListener("load",()=>{
    let params = new URLSearchParams(window.location.search);
    let user = params.get('u');
    if (user) {
        $('.form--edit').addClass("hidden")
    }
    else{
        $('.form--edit').removeClass("hidden")
        loadData()
    }
})

$('input[type="file"]').on("change",function (e) {
    let input = e.target
    const img = $('.flex-c img')[0];
    if (input.files.length > 0) {
      const selectedFile = input.files[0];
      const reader = new FileReader();
  
      reader.onload = function (e) {
          const base64URL = e.target.result;
          img.src = base64URL;
          img.classList.remove("hidden");
        };
  
      reader.readAsDataURL(selectedFile);
    } else {
      img.src = '';
      img.classList.add("hidden");
    }
  })
function loadData() {
    let user = JSON.parse(localStorage.getItem("localuser"))
    if (user) {
        let request = indexedDB.open(DBData.name, DBData.version)
        request.onsuccess = function () {
            let db = request.result
            db.transaction("users", "readonly")
            .objectStore("users").index("username")
            .get(user.username)
            .onsuccess = function (event) {
                let item = event.target.result
                $('input[name="username"]')[0].value = item.username
                $('textarea[name="description"]')[0].value = item.description
                $('input[name="email"]')[0].value = item.email
                $('input[name="password"]')[0].value = item.password
                
                if (item.img) {
                    $('.flex-c img')[0].src = item.img
                    $('.flex-c img').removeClass("hidden")
                }
                else{
                    $('.flex-c img')[0].src = ""
                    $('.flex-c img').addClass("hidden")
                }
            }
        }
    }
}

$(".form--edit").on("submit",(e)=>{
    e.preventDefault()
    let user = JSON.parse(localStorage.getItem("localuser"))
    if (user) {
        let request = indexedDB.open(DBData.name, DBData.version)
        request.onsuccess = function () {
            let db = request.result
            let objectStorage = db.transaction("users", "readwrite")
            .objectStore("users")

            objectStorage.index("username")
            .get(user.username)
            .onsuccess = function (event) {
                let item = event.target.result
                item.description = $('textarea[name="description"]')[0].value
                item.email = $('input[name="email"]')[0].value                
                item.password = $('input[name="password"]')[0].value 
                item.img = $('.flex-c img')[0].src 
                objectStorage.put(item)
                localStorage.setItem("localuser", JSON.stringify(item))
                location.reload()
            }
        }
    }
})