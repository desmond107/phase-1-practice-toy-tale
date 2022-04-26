let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
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
function renderToy (name, image, likes, id){
  const toyCollection = document.getElementById('toy-collection')  
 const div = document.createElement('div')
 div.classList = 'card'
 div.innerHTML = `
   <h2>${name}</h2>
   <img src="${image}" class="toy-avatar" />
   <p>${likes} Likes</p>
   <button class="like-btn" id="${id}">Like</button>
   `
 toyCollection.appendChild(div)

 const signleBTN = document.getElementById(id)
 console.log(signleBTN)
 signleBTN.addEventListener('click', e=>{
   
   pElement = signleBTN.previousElementSibling.textContent
   let currentLikes = parseInt(pElement.split(' ')[0])
   let newLikes = currentLikes + 1


   
   fetch(`http://localhost:3000/toys/${id}`, {
     method: 'PATCH',
     headers: 
       {
         "Content-Type": "application/json",
         Accept: "application/json"
       },
     body: JSON.stringify({
         likes: newLikes,
       })
     })
   .then(resp => resp.json())
   .then(data => {
     signleBTN.previousElementSibling.textContent = `${newLikes} Likes`
     
   })

 })
}




const form = document.querySelector('.container .add-toy-form')

form.addEventListener('submit', e=>{
 e.preventDefault()
 const name = document.querySelectorAll('.input-text')[0].value
 const image = document.querySelectorAll('.input-text')[1].value
 const likes = 0
 let id = 0

 fetch(serverURL, {
   method: 'POST',
   headers: 
     {
       "Content-Type": "application/json",
       Accept: "application/json"
     },
   body: JSON.stringify({
       "name": name,
       "image": image,
       "likes": likes
     })
   })
 .then(resp => resp.json())
 .then(data => {
   renderToy (data.name, data.image, data.likes, data.id)
 })
 .catch(error => console.log(error))

 
})
