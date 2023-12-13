export default function Article(info, onlike , liked=false){
    const fecha = new Date(info.datetime);
    const fechaLocal = fecha.toLocaleString();
    const tagsFragment = document.createDocumentFragment()

    let article = document.createElement("article")
    article.classList.add("article")
    info.tags.forEach(element => {
        let tagP = document.createElement("span")
        tagP.classList.add("tag")
        tagP.textContent = "#" + element
        tagsFragment.append(tagP)
    });
    
    article.innerHTML = 
    `
        <img src="${info.img?info.img:"/assets/img/default-article.jpg"}" alt="${info.title}" class="article__img">
        <div class="article__info">
            <p class="article__user">@${info.user}</p>
            <p class="article__date">${fechaLocal}</p>
        </div>    
        <h2 class="article__title">${info.title}</h2>
        <p class="article__tags"></p>
        <div class="article__reactions">
            <button class="article__comments">
                <i class="fa-regular fa-comment-dots"></i>
                <span class="number">${info.comments} comentarios</span>
            </button>
            <button class="article__likes">
                <i class="${liked?"fa-solid":"fa-regular"} fa-heart"></i>
                <span class="number">${info.likes}</span>
            </button>
        </div>
    `;
    
    article.querySelector(".article__tags").append(tagsFragment)
    article.querySelector(".article__likes").addEventListener("click", (e)=>{
        let hicon = article.querySelector(".article__likes .fa-heart")
        let hnumber = article.querySelector(".article__likes .number")
        let n = parseInt(hnumber.textContent)

        if (hicon.classList.contains("fa-regular")) {
            onlike("like", info.id)
            hicon.classList.replace("fa-regular", "fa-solid")
            hnumber.textContent = n+1
        }
        else {
            onlike("unlike", info.id)
            hicon.classList.replace("fa-solid", "fa-regular")
            hnumber.textContent = n-1
        }
    })
    article.querySelector(".article__title").addEventListener("click",()=>{
        location.href = `/pages/article/index.html?aid=${info.id}`
    })
    article.querySelector(".article__img").addEventListener("click",()=>{
        location.href = `/pages/article/index.html?aid=${info.id}`
    })

    article.querySelector(".article__user").addEventListener("click",()=>{
        location.href = `/pages/user/index.html?u=${info.user}`
    })
    return article
}