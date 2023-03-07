const backgrounds = ['bkgs/healthy-background.jpg', 'bkgs/junk-background.jpg'];
const background = document.querySelector('.background');
// const form = document.querySelector('form');
const checkboxes = document.querySelectorAll('input[name="menu-item"]');
const submitButton = document.getElementById("submit-button");


const menuitems = [
  {name: 'Burger', type: 'Main Course', healthy: -2},
  {name: 'Salad', type: 'Main Course', healthy: 2},
]

// Randomly load a background image
r = Math.random();
if (r < 0.5)
    background.style.backgroundImage = `url(${backgrounds[0]})`;
else
    background.style.backgroundImage = `url(${backgrounds[1]})`;

// Record the participant's order
// form.addEventListener('submit', (event) => {
//   event.preventDefault();
//   const order = [];
//   checkboxes.forEach((checkbox) => {
//     if (checkbox.checked) {
//       order.push(checkbox.value);
//     }
//   });
//   console.log(order);
// });

submitButton.addEventListener("click", function(event) {
    var thank_you_page = document.getElementById("thank-you-page");
    var menu = document.getElementById("menu-container");
    menu.style.display = "none";
    thank_you_page.style.visibility = "visible";
    thank_you_page.style.display = "block";
    console.log("Thank you for your order!");
});
