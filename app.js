

//crud
//Create - POST
//read - GET
//update - PUT or PATCH
//Delete - DELETE
//HTTP methods (GET, POST, PUT, DELETE, PATCH)
// fetch(url, options) options = {method : "POST"}

const url = "https://66130ca153b0d5d80f66ca00.mockapi.io/api/1/cars"

//DOM
const tbody = document.getElementById("tbody")
const total = document.getElementById("total")
const form = document.querySelector("form")
const btn = form.querySelector("button")

let allTotal = 0
let cars = []
let carId;

form.onsubmit = (event) => {
    event.preventDefault()
    const formData = event.target // <form></form>
    const user = {
        name: formData.name.value,
        release: formData.release.value,
        price: formData.price.value,
        speed: formData.speed.value
    }
    console.log(user, '----user----');
    if(btn.innerText === "UPDATE"){
        fetch(url + `/${carId}`, {
            method: 'PUT',
            headers:  {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then( d => {
            console.log(d);
            fetchCars()
        })
        return
    }
    fetch(url , {
        method: 'POST',
        headers:  {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then( d => {
        console.log(d);
        fetchCars()
    })
}

function fetchCars(){
    fetch(url)
        .then(res => res.json())
        .then(data => {
         console.log(data, '----data----');
         cars = data
         const exp = data.map( user => user.price)
         allTotal = exp.reduce((t, money) => { return t + money}, 0)
         rennderTBody(data)
         total.innerText = `TOTAL: ${allTotal} сом`
        })
}
fetchCars()

function rennderTBody(arr){
    tbody.innerHTML = ''
    for (const user of arr) {
        tbody.innerHTML += `
        <tr>
          <th scope="row">${user.id}</th>
          <td>${user.name}</td>
          <td>${user.release} year</td>
          <td>${user.speed} km/h</td>
          <td>${user.price} $</td>
          <td>
             <div class="d-flex gap-2">
                <button onclick="editUser(${user.id})" class="btn btn-warning">edit</button>
                <button onclick="delUser(${user.id})" class="btn btn-danger">delete</button>
            </div>
          </td>
        </tr>`
    }
}

function editUser(userID) {
    carId = userID
    const user = cars?.find( (el) => el.id == userID )
    form.name.value = user.name
    form.release.value = user.release
    form.price.value = user.price
    form.speed.value = user.speed
    btn.innerText = "UPDATE"
}

function delUser(userID) {
    fetch(url + `/${userID}` , {
        method: 'DELETE',
        headers:  {
            'Content-Type' : 'application/json'
        },
    })
    .then(res => res.json())
    .then( del => fetchCars())
}
