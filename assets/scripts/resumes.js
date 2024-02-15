let data__container = document.getElementById("data__container");
const myModal = bootstrap.Modal.getOrCreateInstance("#staticBackdrop");


var loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
if (loggedInUser) {
  document.querySelectorAll(".login-button").forEach(function (button) {
    button.textContent = loggedInUser.name;
  });
}

const API = "http://localhost:3000/cvs/";
values = [];

function formatPhoneNumber(phoneNumber) {
  return phoneNumber.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, "$1-$2-$3-$4");
}


const renderData = (arr) => {
  data__container.innerHTML = " ";
  arr.forEach((item) => {
    let data__box = document.createElement("div");
    data__box.className = "box__item "
    data__box.innerHTML = `
    <div class="cvbox">
    <div class="cvbox-top">
        <div class="cvbox-info">
            <div class="cvbox-image">
                <img src="${item.image}" alt="">
            </div>
            <div class="cvbox-title">
                <h4>${item.prof}</h4>
                <p>${item.name}</p>
            </div>
        </div>
        <div class="cvbox-buttons">
        <p> + </p>
        </div>
    </div>
    <div class="cvbox-bottom">
        <div class="cvbox-work cvbox-bottom-item">
            <div class="icon">
                <img src="https://www.hellojob.az/content/assets/images/resume/svg-icons/user-clock.svg" alt="">
            </div>
            <div>
                <h4>${item.work}</h4>
                <p>İş rejimi</p>
            </div>
        </div>
        <div class="cvbox-salary cvbox-bottom-item">
            <div class="icon">
                <img src="https://www.hellojob.az/content/assets/images/resume/svg-icons/money.svg" alt="">
            </div>
            <div>
                <h4>${item.salary}</h4>
                <p>Minimum əmək haqqı AZN</p>
            </div>
        </div>
        <div class="cvbox-phone cvbox-bottom-item">
            <div class="icon">
                <img src="https://www.hellojob.az/content/assets/images/resume/svg-icons/phone.svg" alt="">
            </div>
            <div>
                <h4>${formatPhoneNumber(item.phone)}</h4>
                <p>Əlaqə</p>
            </div>
        </div>
        <div>
        </div>
    </div>
</div>`;
    data__container.append(data__box);
  });
};

const getData = () => {
  fetch(API)
    .then((res) => res.json())
    .then((data) => {
      values = data.filter(item => item.approv === true);
      renderData(values);
    });
};

getData();



const deleteData = (id) => {
  axios
    .delete(API + id)
    .then((response) => {
      console.log("Resource deleted successfully:", response.data);
      getData();
    })
    .catch((error) => {
      console.error("Error deleting resource:", error);
    });
};

let product__sort = document.getElementById('product__sort')

product__sort.addEventListener('change', e => {
    sortdata = [...values]
    if (e.target.value == 'Artan') {

        sortAz = sortdata.sort((a, b) => a.salary.localeCompare(b.salary))
        renderData(sortAz)

    } else if (e.target.value == 'Artan') {
        sortZa = sortdata.sort((a, b) => b.salary.localeCompare(a.salary))
        renderData(sortZa)
    }
    else {
        renderData(values)
    }
})



const toggleButton = document.getElementById("hamburger");
const dropmenu = document.getElementById("dropmenu");
const mainElement = document.querySelector(".res-box");
const footerElement = document.getElementsByTagName("footer")[0];


toggleButton.addEventListener("click", function () {
  dropmenu.classList.toggle("show");
  if (dropmenu.classList.contains("show")) {
    mainElement.style.display = "none";
    footerElement.style.display = "none";
  } else {
    mainElement.style.display = "block";
    footerElement.style.display = "block";
  }
});













const theme__btn = document.getElementById("theme__btn");
const wmode__logo = document.getElementById("wmode__logo");
const nmode__logo = document.getElementById("nmode__logo");


theme__btn.addEventListener("click", function () {
  document.body.classList.toggle("dark-theme");
  localStorage.setItem("mode", document.body.classList);
  btnControl();
});

if (localStorage.getItem("mode") != "") {
  document.body.classList.add(localStorage.getItem("mode"));
}

function btnControl() {
  if (document.body.classList.contains("dark-theme")) {
    wmode__logo.style.display = "none";
    nmode__logo.style.display = "block";
    theme__btn.classList.remove("white-mode-btn");
    theme__btn.classList.add("night-mode-btn");
  } else {
    theme__btn.classList.add("white-mode-btn");
    theme__btn.classList.remove("night-mode-btn");

    wmode__logo.style.display = "block";
    nmode__logo.style.display = "none";
  }
}

window.onload = () => {
  btnControl();
};


var users = JSON.parse(localStorage.getItem("users")) || [];

function register(event) {
  event.preventDefault();
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("confirmPassword").value;
  var acceptTerms = document.getElementById("acceptTerms").checked;

  document.getElementById("errorMessages").innerHTML = "";

  if (!name.trim()) {
    displayErrorMessage("Adınız sahəsi boş saxlanılmamalıdır.");
    return;
  }

  if (!isValidEmail(email.trim())) {
    displayErrorMessage("Email sahəsi email formatında doldurulmalıdır.");
    return;
  }

  if (!password.trim()) {
    displayErrorMessage("Şifrə sahəsi boş saxlanılmamalıdır.");
    return;
  }

  if (password.trim().length < 4) {
    displayErrorMessage(
      "Şifrə sahəsinin dəyəri göstəriləndən qısa qeyd edilib. Minimum simvol sayı 4 olmalıdır."
    );
    return;
  }

  if (password !== confirmPassword) {
    displayErrorMessage(
      "Şifrənin təkrarı sahəsi Şifrə sahəsi ilə eyni olmalıdır"
    );
    return;
  }

  if (!acceptTerms) {
    displayErrorMessage("Qaydalar qəbul edilməyib.");
    return;
  }

  var existingUser = users.find(function (user) {
    return user.email === email;
  });

  if (existingUser) {
    displayErrorMessage("This email address is already registered.");
    return;
  }

  var user = {
    name: name,
    email: email,
    password: password,
  };

  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  document.getElementById("registerForm").reset();
  console.log("User registered:", user);
  console.log("All users:", users);
}

function displayErrorMessage(message) {
  var errorMessages = document.getElementById("errorMessages");
  var errorMessageElement = document.createElement("div");
  errorMessageElement.textContent = message;
  errorMessages.appendChild(errorMessageElement);
}

function isValidEmail(email) {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}




const loginbtn = document.getElementById("login-btn");
const loginControl = () => {
  if (loggedInUser) {
    myModal.hide();
  }
};
loginbtn.addEventListener("click", loginControl);

function checkLoggedInUser() {
  var loggedInUser = localStorage.getItem("loggedInUser");

  if (loggedInUser) {
    window.location.href = "../user-pages/addcv.html";
  } else {
    myModal.show();
    console.log("modal");
  }
}



function openModal() {
  if (!loggedInUser) {
    myModal.show();
  } else {
    window.location.href = "../user-pages/profile.html";
  }
}

///

var loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
if (loggedInUser) {
  document.querySelectorAll(".login-button").forEach(function (button) {
    button.textContent = loggedInUser.name;
  });
}

function login(event) {
  event.preventDefault();
  var email = document.getElementById("loginEmail").value;
  var password = document.getElementById("loginPassword").value;
  document.querySelector(".errorMessages").innerHTML = "";

  if (!email.trim() || !password.trim()) {
    loginDisplayErrorMessage("Email və şifrə sahəsi boş saxlanılmamalıdır");
    return;
  }

  var loginUser = users.find(function (user) {
    return user.email === email && user.password === password;
  });

  if (!loginUser) {
    loginDisplayErrorMessage("Email və ya şifrə yalnış daxil edilib.");
    return;
  }

  userbtn = document.querySelector(".login-button");
  userbtn.textContent = loginUser.name;
  userbtn.classList.add("userhover");

  localStorage.setItem("loggedInUser", JSON.stringify(loginUser));
  window.location.href = "../user-pages/profile.html";
}

function logout() {
  localStorage.removeItem("loggedInUser");
  document.querySelector(".login-button").textContent = "Sayta daxil ol";
}

function loginDisplayErrorMessage(loginMessage) {
  var loginErrorMessages = document.getElementById("loginError-message");
  loginErrorMessages.innerHTML = loginMessage;
}


loginbtn.addEventListener("click", loginControl);

function checkLoggedInUser() {
  var loggedInUser = localStorage.getItem("loggedInUser");

  if (loggedInUser) {
    window.location.href = "../user-pages/addcv.html";
  } else {
    myModal.show();
    console.log("modal");
  }
}

const addToFav = async (id) => {
  try {
    const response = await fetch("http://localhost:3000/favorites");

    const favorites = await response.json();
    console.log(favorites);

    const filteredfav = favorites.find((item) => item.id == id);
    console.log(filteredfav);

    if (filteredfav) {
      await fetch(`http://localhost:3000/favorites/${id}`, {
        method: "DELETE",
      });
    } else {
      const jobResponse = await fetch(`http://localhost:3000/jobdata/${id}`);

      const jobData = await jobResponse.json();
      await fetch("http://localhost:3000/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobData),
      });
    }
  } catch (error) {
    console.error(error.message);
  }
};
