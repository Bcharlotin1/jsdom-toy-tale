let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  /* This sis the container that holdes the form */
  const toyCollection =  document.getElementById("toy-collection")

  fetch("http://localhost:3000/toys")
  .then (resp => resp.json())
  .then (getToys)

  function getToys(toys) {

    /* toys.map(toy =>{
      ... th html below 
    })*/

    for(let toy of toys){
      toyCollection .innerHTML +=
      `
      <div class="card">
        <h2>"${toy.name}"</h2>
        <img src="${toy.image}" class="toy-avatar" />
        <p>${toy.likes} Likes</p>
        <button class="like-btn" id= "${toy.id}">Like <3</button>
        <button class="delete-btn" id= "${toy.id}">DELETE</button>
      </div>
      `
    }
  }

  toyFormContainer.addEventListener("submit", (event) =>{
    event.preventDefault();
    /*prevent the pages fro reloading so you cna submit  to add a new toy*/ 
    const toyName = event.target.name.value
    const toyImage = event.target.image.value

    /* We are grabbing th toy information her becua we wante it as sson as the user presses submit */

    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },

      body: JSON.stringify({
        name: toyName,
        image: toyImage,
        likes: 100
      })
    })
    /* Need to grab the new toy infomation an updat that in the DOM */
    .then (resp => resp.json())
    .then (newToy =>{
      
      toyCollection .innerHTML +=
      `
      <div class="card">
        <h2>"${newToy.name}"</h2>
        <img src="${newToy.image}" class="toy-avatar" />
        <p>${newToy.likes} Likes</p>
        <button class="like-btn" id= "${newToy.id}">Like <3</button>
        <button class="delete-btn" id= "${newToy.id}">DELETE</button>
      </div>
      `

      event.target.reset()
      /* this resets the form clearing fields*/
    })
  })

  toyCollection.addEventListener("click", (event)=>{
    if (event.target.className === "like-btn"){
      /* event.target.parentElemnte will give you acces to the <div class= "card"></div> */
      let currentLikes= parseInt(event.target.previousElementSibling.innerText)
      let newLikes = currentLikes + 1


      // fetch request fro the specifc toy to change the like count 
        fetch(`http://localhost:3000/toys/${event.target.id}`,{
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
    
          body: JSON.stringify({
            likes: newLikes 
          })
        })
        .then (resp => resp.json())
        .then (toy => {
          event.target.previousElementSibling.innerText =` ${toy.likes} Likes`
          
        })
    }

      if (event.target.className === 'delete-btn'){

        fetch(`http://localhost:3000/toys/${event.target.id}`,{
          method: 'DELETE'
        })
        .then( resp => {
          event.target.parentElement.remove()
        })
      }  
    //Deleting a toy card 
      
  
  })

    
  


     










  /*-----------------------------------------------------*/
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
