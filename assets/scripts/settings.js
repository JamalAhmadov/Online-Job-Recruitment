var loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
if (loggedInUser) {
  document.querySelectorAll(".login-button").forEach(function (button) {
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

document.addEventListener("DOMContentLoaded", function () {
  var loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  var users = JSON.parse(localStorage.getItem("users"));

  if (loggedInUser && users) {
    document.getElementById("email").value = loggedInUser.email;

    document
      .getElementById("settingsForm")
      .addEventListener("submit", function (event) {
        event.preventDefault();

        var oldPassword = document.getElementById("oldPassword").value;
        var newPassword = document.getElementById("newPassword").value;
        var confirmPassword = document.getElementById("confirmPassword").value;

        if (oldPassword !== loggedInUser.password) {
          alert("Eski şifrenizi yanlış girdiniz.");
          return;
        }

        if (newPassword !== confirmPassword) {
          alert("Yeni şifreler eşleşmiyor.");
          return;
        }

        loggedInUser.password = newPassword;
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

        users.forEach(function (user) {
          if (user.email === loggedInUser.email) {
            user.password = newPassword;
            return;
          }
        });

        localStorage.setItem("users", JSON.stringify(users));
        settingsForm.reset()

        alert("Şifre başarıyla güncellendi.");
      });
  } else {
    alert("Kullanıcı oturumu bulunamadı veya kullanıcı verileri eksik.");
  }
});
