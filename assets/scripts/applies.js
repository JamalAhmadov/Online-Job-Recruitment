

var loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
if (loggedInUser) {
  document.querySelectorAll(".login-button").forEach(function(button) {
    button.textContent = loggedInUser.name;
  });
}



const toggleButton = document.getElementById("hamburger");
const dropmenu = document.getElementById("dropmenu");

toggleButton.addEventListener("click", function () {
  dropmenu.classList.toggle("show");
  if (dropmenu.classList.contains("show")) {
  } else {
  }
});