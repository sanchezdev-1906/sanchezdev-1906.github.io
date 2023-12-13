import { initial, DBData } from "/scripts/indexeddb.js";
document.addEventListener("DOMContentLoaded",()=>{
    fetch('/components/header/header.html')
          .then(response => response.text())
          .then(html => {
            document.body.insertAdjacentHTML('afterbegin', html);

            let newCSS = document.createElement('link');
            newCSS.rel = 'stylesheet';
            newCSS.href = '/components/header/header.css';
            document.head.appendChild(newCSS);

            $(".toggle-header").on("click",()=>{
                $(".header nav").toggleClass("visible")
            })
            $(document).on("keydown",(e)=>{
                if (e.key == "Escape") {
                    $(".header nav").removeClass("visible")
                }
            })
            if (localStorage.getItem("localuser")) {
                let user = JSON.parse(localStorage.getItem("localuser"))
                $("#loginButtons").html(
                `
                    <a href="/pages/write/" class="btn btn--secondary">Escribir</a>
                    <a href="#" id="logout" class="btn btn--secondary">Cerrar Sesión</a>
                `)

                $(".header .user__img")[0].src = `${user.img?user.img:"/assets/img/default-user.png"}`
                $(".header .user__username")[0].textContent = `${user.username}`
                $(".header .user__email")[0].textContent = `${user.email}`
                
                $(".header .user").on("click", ()=>{
                    location.href = "/pages/user/"
                })
                $(".header #logout").on("click", ()=>{
                    localStorage.removeItem("localuser")
                    location.reload()
                })
            }
            else{
                $("#loginButtons").html(
                    `
                    <a href="/pages/login/index.html?action=login" class="btn btn--primary">Ingresar</a>
                    <a href="/pages/login/index.html?action=sign" class="btn btn--secondary">Registrarse</a>
                `)
                $(".header .user").addClass("hidden")
            }
        })
    
    fetch('/components/footer/footer.html')
        .then(response => response.text())
        .then(html => {
            document.body.insertAdjacentHTML('beforeend', html);
        
            let newCSS = document.createElement('link');
            newCSS.rel = 'stylesheet';
            newCSS.href = '/components/footer/footer.css';
            document.head.appendChild(newCSS);
        });
        
})