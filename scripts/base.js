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
                $("#loginButtons").html(
                `
                    <a href="/pages/write/" class="btn btn--secondary">Escribir</a>
                `)
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