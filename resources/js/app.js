<<<<<<< HEAD
import axios from "axios"
import Noty from "noty"

const addToCart = document.querySelectorAll(".add-to-cart")

addToCart.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let pizza = JSON.parse(btn.dataset.pizza)
    updateCart(pizza)
  })
})

function updateCart(pizza){
  let cartCounter = document.querySelector("#cartCounter")
  axios.post("/update-cart", pizza)
    .then(res => {
      cartCounter.textContent = res.data.totalQty
      showNity("success", "Item added to cart")
    })
    .catch(err => {
      showNity("error", "Something went wrong")
    })
}

function showNity(type, message){
  new Noty({
    type: type,
    timeout: 1000,
    progressBar: false,
    text: message
  }).show()
}
=======
// import express from "express";
// console.log(express);
const addToCart = document.querySelectorAll(".add-to-cart");
console.log("hello world");
addToCart.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let pizza = JSON.parse(btn.dataset.pizza);
    console.log(pizza);
  });
});

// "build-css": "node-sass --include-path scss resources/scss/app.scss public/css/app.css",
// "watch-css": "nodemon -e scss -x \"npm run build-css & nodemon server.js\""
// "dev": "npm run watch-css",
>>>>>>> d45a2d51d708793da93a2a31f80ed12245809072
