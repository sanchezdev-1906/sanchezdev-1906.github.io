document.addEventListener("DOMContentLoaded",()=>{
    $(".toggle-header").on("click",()=>{
        $(".header nav").toggleClass("visible")
    })
    $(document).on("keydown",(e)=>{
        if (e.key == "Escape") {
            $(".header nav").removeClass("visible")
        }
    })
})