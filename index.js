
class Ui {
  displayData(data) {
    let content = ``;
    const uiContainer = document.querySelector(".page-container .row");
    for (let i = 0; i < data.length; i++) {
      content += `
            <div class="col-md-4 ">
            <div class="p-2 cardContainer m-4">
             <div class="card h-100 card-color" >
             <div class="p-3">
               <img src=${data[i].thumbnail} class="card-img-top" alt="thumbnail">
             </div>
             <div class="card-body">
                <h5 class="card-title d-flex justify-content-between text-light">${data[i].title} 
               <span class="badge text-bg-primary p-2">Free</span></h5>
               <p class="card-text text-center mt-4 fw-5">${data[i].short_description}</p>
             </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item card-color d-flex justify-content-between py-2">
              <span class="badge text-bg-secondary p-2">${data[i].genre}</span>
              <span class="badge text-bg-secondary p-2">${data[i].platform}</span></li>
             </ul>
             </div></div>
           
            </div>`;
    }
    uiContainer.innerHTML = content;
    
    
  }
  displayDetails(currItem){
    let content =``
    let containreContent = document.querySelector(".detailsContainer .row")
    content += `
    <div class="col-md-4 pt-5">
  <div class="w-100 ms-auto bg-danger">
    <img src="${currItem.thumbnail}" class="w-100"/>
  </div></div>
  <div class="col-md-8 py-5">
  <div>
    <h2 class="text-uppercase text-light">Tittle : ${currItem.title}</h2>
    <div class="d-flex flex-column justify-content-between align-items-between">
     <span class="text-light">Category : <span class="badge text-bg-info p-2">${currItem.genre}</span> </span>
       <span class="text-light my-2">Platform : <span class="badge text-bg-info p-2">${currItem.platform}</span></span>
       <span class="text-light">ID : <span class="badge text-bg-info p-2">${currItem.id}</span></span>
    </div>
      
      <p class="text-light my-3">${currItem.short_description}</p>
      <div class=" w-100">
      <button class="btn btn-outline-warning d-inline-block w-100"><a href="${currItem.game_url}">show game</a></button>
      </div>
  </div>
  </div>`
  containreContent.innerHTML =content
  }
}
class Game {
  constructor() {
    this.getGames("mmorpg");
    document.querySelectorAll(".navbar .nav-link").forEach((link) => {
      link.addEventListener("click", (e) =>{
        document.querySelector(".navbar .active").classList.remove("active");
        link.classList.add("active");
        this.getGames(e.target.innerText.toLowerCase());
      });
    });
    this.ui = new Ui();
    this.detail = new Details()
  }
  async getGames(category) {
    const loading = document.querySelector(".loading");
    const home = document.querySelector(".home")
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "dbdb745173mshd2ae2bee216ba3ap1a98e3jsnafd4ad23a3d4",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      },
    };
    try {
      loading.classList.remove("d-none");
      home.classList.add("d-none");
      const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`,
        options
      );
      const data = await api.json();
     
      
      this.ui.displayData(data);
      this.detail.getDetails(data)
    } catch (err) {
      alert("error game api");
    } finally {
      home.classList.remove("d-none")
      loading.classList.add("d-none");
    }
  }
}
class Details{
     constructor(){
      this.ui= new Ui
      
      this.close()
     }
  getDetails(data){
    let itemDetail = document.querySelector(".page-container .row ").children
    let items = [...itemDetail]
      let home = document.querySelector(".myPage")
      
      
    items.forEach((item)=>{
      
      item.addEventListener("click" , (e)=>{
        
        
        home.classList.add("d-none")
       document.querySelector(".detailsContainer").classList.remove("d-none");
       let currItem = data[items.indexOf(item)]
       console.log(currItem);
       
        this.ui.displayDetails(currItem)  
      })
    }) 
  }
  close(){
   let closeIcon = document.querySelector(".detailsContainer i")
   closeIcon.addEventListener("click" , ()=>{
     document.querySelector(".myPage").classList.remove("d-none")
      document.querySelector(".detailsContainer").classList.add("d-none");
   })
  }
}
new Game();

 