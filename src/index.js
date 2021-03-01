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

  function renderAllToys() {
    fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(toyArr => {
            toyArr.forEach(toy => {
                renderOneToy(toy)
            })
        })
  }


  function renderOneToy(toyObject){
    const div = document.createElement('div')
    div.classList.add('card')
    div.dataset.id = toyObject.id

    div.innerHTML = `
      <h2>${toyObject.name}</h2>
      <img src=${toyObject.image} class="toy-avatar" />
      <p>${toyObject.likes} Likes </p>
      <button class="like-btn">Like <3</button>
    `

    const toyCollection = document.querySelector('div#toy-collection')
    toyCollection.append(div)
  }

  // Event Listeners // 

  const toyForm = document.querySelector('.add-toy-form')

  toyForm.addEventListener('submit', function (event) {
    event.preventDefault()

    const name = event.target[0].value
    const image = event.target[1].value 

    const newToy = {name, image, likes: 0}

    fetch('http://localhost:3000/toys', { 
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(newToy)
    })
    .then(response => response.json())
    .then(oneToy => { 
      renderOneToy(oneToy)
    })

    event.target.reset() 

  })


  renderAllToys()

})

