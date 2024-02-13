var loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
if (loggedInUser) {

  document.querySelector(".profile-name").textContent = "Xoş gəlmisiniz, " +loggedInUser.name
  document.querySelectorAll(".login-button").forEach(function(button) {
    button.textContent = loggedInUser.name;
  });
}