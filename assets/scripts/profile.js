var loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
if (loggedInUser) {
  document.querySelector(".profile-name").textContent =
    "Xoş gəlmisiniz, " + loggedInUser.name;
  document.querySelectorAll(".login-button").forEach(function (button) {
    button.textContent = loggedInUser.name;
  });
}

let logout = document.querySelector(".logout-button");

function logOut() {
  let condition = JSON.parse(localStorage.getItem("loggedInUser"));
  if (condition) {
    localStorage.removeItem("loggedInUser");
    document.querySelector(".login-button").textContent = "Sayta daxil ol";
    window.location.href = "../main-pages/home.html"
  }
}

logout.addEventListener("click", logOut);
