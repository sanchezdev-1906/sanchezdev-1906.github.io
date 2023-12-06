const login = document.getElementById("login")
const sign = document.getElementById("sign")

addEventListener("load",()=>{
    let params = new URLSearchParams(window.location.search);
    let action = params.get('action');
    if (!action) {
        sign.classList.add("hidden")
        login.classList.remove("hidden")
    }
    else if (action == "login") {
        sign.classList.add("hidden")
        login.classList.remove("hidden")
    }
    else if (action == "sign") {
        sign.classList.remove("hidden")
        login.classList.add("hidden")
        
    }
})

$("form input").on("keydown",()=>{
    $("form .message").addClass("hidden")
})

$("#login").on("submit",(e)=>{
    e.preventDefault()
    let user = {username: login.username.value || "", password: login.password.value || ""}

    let request = indexedDB.open("dover", 1)
    request.onsuccess = ()=>{
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        let db = request.result
        let transaction = db.transaction(["users"], "readonly")
        let objectStorage = transaction.objectStore("users")
        let getUserRequest
        
        if (regexEmail.test(user.username)) {
            getUserRequest = objectStorage.get(user.username)
        }
        else{
            let index = objectStorage.index("username")
            getUserRequest = index.get(user.username)
        }

        getUserRequest.onsuccess = () => {
            let result = getUserRequest.result
            let message = login.querySelector(".message")
            if (result) {
                if (user.password == result.password) {
                    localStorage.setItem("localuser", JSON.stringify(result))
                    location.replace(`/`)
                }
                else{
                    message.textContent = "La contraseña es incorrecta"
                    message.classList.remove("hidden")
                    return;
                }
            }
            else{
                message.textContent = "No existe el usuario"
                message.classList.remove("hidden")
            }
        }
    }
})

$("#sign").on("submit",(e)=>{
    e.preventDefault()
    let username = sign.username.value
    let email = sign.email.value
    let password = sign.password.value
    let confirm = sign.confirm.value
    
    if (password != confirm) {
        let message = sign.querySelector(".message")
        message.textContent = "Las contraseñas no coinciden"
        message.classList.remove("hidden")
        return;
    }

    let request = indexedDB.open("dover", 1)
    request.onerror = function(event) {
        console.log("Error al abrir la base de datos");
      };
    request.onsuccess = ()=>{
        let db = request.result
        let transaction = db.transaction(["users"], "readwrite")
        let objectStorage = transaction.objectStore("users")
        let user = {
            username,
            email,
            password,
            description: "",
            profile: undefined
        }
        
        let req = objectStorage.add(user)

        req.onsuccess = ()=>{
            location.replace(`index.html?action=login`)
        }
    }
})
