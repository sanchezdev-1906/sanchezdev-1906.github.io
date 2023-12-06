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