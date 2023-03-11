import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js'

const backgrounds = ['bkgs/healthy-background.webp', 'bkgs/junk-background.webp'];
const background = document.querySelector('.background');

const nextBtn = document.getElementById("next-button");
const submitBtn = document.getElementById('submit-button');

const checkboxes = document.querySelectorAll('input[name="menu-item-main"]');

var response = {main:"", side:"", drink:"", gender:"", age:"", state:"", citytier:"", glasses_of_water:"", r:0, name:""};

// Randomly load a background image
var r = Math.random();
console.log("r = " + r);
if (r < 0.33)
    background.style.backgroundImage = `url(${backgrounds[0]})`;
else if (r < 0.66)
    background.style.backgroundImage = `url(${backgrounds[1]})`;
else
    background.style.backgroundImage = null;

const firebaseConfig = {
    apiKey: "AIzaSyCmqdx87z3TlgjsHTgLtc3UccKoV7kWPh0",
    authDomain: "test-d6b17.firebaseapp.com",
    projectId: "test-d6b17",
    storageBucket: "test-d6b17.appspot.com",
    messagingSenderId: "710933111598",
    appId: "1:710933111598:web:4d17dd349f0dbd9516d0bf",
    measurementId: "G-1HMQ1Y4VVS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();


nextBtn.addEventListener("click", function(event) {
    // var thank_you_page = document.getElementById("thank-you-page");
    var menu = document.getElementById("menu-container-menu");
    menu.style.display = "none";
    var demo = document.getElementById("menu-container-demo");
    demo.style.display = "block";
});

submitBtn.addEventListener("click", function(event) {
    try{
        response["main"] = document.querySelector('input[name="menu-item-main"]:checked').value;
    }
    catch (e) {console.log(e)}
    try {
        response["side"] = document.querySelector('input[name="menu-item-side"]:checked').value;
    }
    catch (e) {console.log(e)}
    try {
        response["drink"] = document.querySelector('input[name="menu-item-drnk"]:checked').value;
    }
    catch (e) {console.log(e)}
    try {
        response["citytier"] = document.querySelector('input[name="menu-item-citytier"]:checked').value;
    }
    catch (e) {console.log(e)}
    try {
        response["gender"] = document.querySelector('input[name="menu-item-gender"]:checked').value;
    }
    catch (e) {console.log(e)}
    response["age"] = document.querySelector('input[name="menu-item-age"]').value;
    response["name"] = document.querySelector('input[name="menu-item-name"]').value;
    response["state"] = document.querySelector('select[name="menu-item-states"]').value;
    response["glasses_of_water"] = document.querySelector('input[name="menu-item-waterglasses"]').value;
    response["r"] = r;


    // addDoc(collection(db, "users"), response)
    // .then((docRef) => {
    //     console.log("Document written with ID: ", docRef.id);
    // })
    // .catch((error) => {
    //     console.error("Error adding document: ", error);
    // });

    console.log(response);
    const selectedSideMenu = document.querySelector('input[name="menu-item-side"]:checked');
    var demo = document.getElementById("menu-container-demo");
    demo.style.display = "none";
    var thank_you_page = document.getElementById("thank-you-page");
    thank_you_page.style.display = "block";
});
