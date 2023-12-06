const buttonToggle = document.getElementById("menuToggle")
const buttonClose = document.getElementById("menuClose")
const menuNav = document.getElementById("menuNav")
const cardsContainer = document.getElementById("cards-container")
const skillsContainer = document.getElementById("skills-container")
const themeButton = document.getElementById("theme-button")

buttonToggle.addEventListener('click',()=>
{menuNav.classList.add('visible')})
buttonClose.addEventListener('click',()=>
{menuNav.classList.remove('visible')})

async function renderCards(){
  let cards = await getCardData();
  
  cards.forEach((card) => {
    const cardArticle = document.createElement("article");
    cardArticle.classList.add("card");

      const cardHeader = document.createElement("header");
      cardHeader.classList.add("card__header");
        const layer = document.createElement("img");
        layer.classList.add("layer");
        layer.setAttribute("src", card.image);
        cardHeader.append(layer);
      cardArticle.append(cardHeader);

      const cardContent = document.createElement("div");
      cardContent.classList.add("card__text");
        const cardTitle = document.createElement("h3");
        cardTitle.classList.add("card__title");
        cardTitle.textContent = card.title;
        cardContent.append(cardTitle);
      cardArticle.append(cardContent);

        const cardLinks = document.createElement("nav");
        cardLinks.classList.add("card__links");
          const liveDemo =document.createElement("div");
          liveDemo.classList.add("button", "button--link");
            const demoLink = document.createElement("a");
            demoLink.classList.add("fa-solid", "fa-arrow-up-right-from-square");
            demoLink.setAttribute("target", "_blank");
            demoLink.setAttribute("href", `${card.liveDemo}`);
            liveDemo.appendChild(demoLink);
            
          cardLinks.append(liveDemo);
          const github = document.createElement("div"); 
          github.classList.add("button", "button--link");
          const githubLink = document.createElement("a");
            githubLink.classList.add("fa-brands", "fa-github");
            githubLink.setAttribute("target", "_blank");
            githubLink.setAttribute("href", `${card.repository}`);
            github.appendChild(githubLink);
          cardLinks.append(github);
        cardContent.append(cardLinks);        

    cardsContainer.append(cardArticle);
  });

}

async function renderTechnologies() {
  let data = await getTechnologyData();

  data.forEach(item=>{
    const skillDiv = document.createElement("div");
    skillDiv.classList.add("skill");
      const skillImg = document.createElement("img");
      skillImg.classList.add("skill__img");
      skillImg.setAttribute("src", item.url);
      skillImg.setAttribute("alt", item.name);
      skillDiv.append(skillImg);

      const skillName = document.createElement("p");
      skillName.classList.add("skill__name");
      skillName.textContent = item.name;
      skillDiv.append(skillName);
    skillsContainer.append(skillDiv);
    })
}

async function getCardData(){
  const cardResponse = await fetch("./json/projects.json");
  const cardJson = await cardResponse.json();
  return cardJson;
}

async function getTechnologyData() {
  const cardResponse = await fetch("./json/tech-icons.json");
  const cardJson = await cardResponse.json();
  return cardJson;
}

addEventListener("load", () => {
  renderCards();
  renderTechnologies();
})

themeButton.addEventListener("click", () => {
  if (themeButton.children[0].classList.contains("fa-moon")) {
    document.body.classList.add("light");
    themeButton.children[0].classList.remove("fa-moon");
    themeButton.children[0].classList.add("fa-sun");
  }else {
    document.body.classList.remove("light");
    themeButton.children[0].classList.remove("fa-sun");
    themeButton.children[0].classList.add("fa-moon");
  }

})