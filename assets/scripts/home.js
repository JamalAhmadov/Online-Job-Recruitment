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

// RENDER DATA
let data__box = document.getElementById("data__box");

const renderJobs = async () => {
  const res = await fetch(`https://65be533bdcfcce42a6f24256.mockapi.io/jobs/`);
  const data = await res.json();
  db = data;
  db.forEach((item) => {
    let box__item = document.createElement("div");
    box__item.className = "box__item";
    box__item.innerHTML = `
      
      <div class="box__main">
      <div >
        <img src="${item.image}" alt="Quartz belt watch">
      </div>
      <div>
        <h3>${item.title}</h3>
        <p>${item.desc}</p>
        <div class="box__span">
        <span ><svg xmlns="http://www.w3.org/2000/svg" width="11" height="13" viewBox="0 0 11 13" fill="none"><path d="M3.5625 2H6.9375V1.0625C6.9375 0.757812 7.17188 0.5 7.5 0.5C7.80469 0.5 8.0625 0.757812 8.0625 1.0625V2H9C9.82031 2 10.5 2.67969 10.5 3.5V11C10.5 11.8438 9.82031 12.5 9 12.5H1.5C0.65625 12.5 0 11.8438 0 11V3.5C0 2.67969 0.65625 2 1.5 2H2.4375V1.0625C2.4375 0.757812 2.67188 0.5 3 0.5C3.30469 0.5 3.5625 0.757812 3.5625 1.0625V2ZM1.125 11C1.125 11.2109 1.28906 11.375 1.5 11.375H9C9.1875 11.375 9.375 11.2109 9.375 11V5H1.125V11Z" fill="#A3A6AC"></path></svg>
        ${item.date}
        </span>
        <span ><svg xmlns="http://www.w3.org/2000/svg" width="15" height="11" viewBox="0 0 15 11" fill="none"><path d="M4.75 5.5C4.75 3.85938 6.08594 2.5 7.75 2.5C9.39062 2.5 10.75 3.85938 10.75 5.5C10.75 7.16406 9.39062 8.5 7.75 8.5C6.08594 8.5 4.75 7.16406 4.75 5.5ZM7.75 7.375C8.78125 7.375 9.625 6.55469 9.625 5.5C9.625 4.46875 8.78125 3.625 7.75 3.625C7.72656 3.625 7.70312 3.625 7.67969 3.625C7.72656 3.76562 7.75 3.88281 7.75 4C7.75 4.84375 7.07031 5.5 6.25 5.5C6.10938 5.5 5.99219 5.5 5.875 5.45312C5.875 5.47656 5.875 5.5 5.875 5.5C5.875 6.55469 6.69531 7.375 7.75 7.375ZM3.22656 2.14844C4.32812 1.11719 5.85156 0.25 7.75 0.25C9.625 0.25 11.1484 1.11719 12.25 2.14844C13.3516 3.15625 14.0781 4.375 14.4297 5.21875C14.5 5.40625 14.5 5.61719 14.4297 5.80469C14.0781 6.625 13.3516 7.84375 12.25 8.875C11.1484 9.90625 9.625 10.75 7.75 10.75C5.85156 10.75 4.32812 9.90625 3.22656 8.875C2.125 7.84375 1.39844 6.625 1.04688 5.80469C0.976562 5.61719 0.976562 5.40625 1.04688 5.21875C1.39844 4.375 2.125 3.15625 3.22656 2.14844ZM7.75 1.375C6.20312 1.375 4.96094 2.07812 4 2.96875C3.08594 3.8125 2.47656 4.79688 2.14844 5.5C2.47656 6.20312 3.08594 7.21094 4 8.05469C4.96094 8.94531 6.20312 9.625 7.75 9.625C9.27344 9.625 10.5156 8.94531 11.4766 8.05469C12.3906 7.21094 13 6.20312 13.3281 5.5C13 4.79688 12.3906 3.8125 11.4766 2.96875C10.5156 2.07812 9.27344 1.375 7.75 1.375Z" fill="#A3A6AC"></path></svg>
        ${item.views}
        </span>
        </div>
      </div>
      </div>

      <div>
        <span class="box__fav"><i class="unliked-icon"></i></span>
        <p>${item.salary} AZN</p>
      </div>
      
    
      `;
    data__box.append(box__item);
  });
};

renderJobs();

const renderAuthors = async () => {
  const res = await fetch(`https://65be533bdcfcce42a6f24256.mockapi.io/jobs/`);
  const data = await res.json();
  let kapitalbank = data.filter((item) =>
    item.author.toLowerCase().includes("kapital")
  );
  let capitalcount = document.getElementById("capital-count");
  capitalcount.innerText = kapitalbank.length + " vakansiya";

  let abbbank = data.filter((item) =>
    item.author.toLowerCase().includes("abb")
  );
  let abbcount = document.getElementById("abb-count");
  abbcount.innerText = abbbank.length + " vakansiya";

  let xalqbank = data.filter((item) =>
    item.author.toLowerCase().includes("xalq")
  );
  let xalqcount = document.getElementById("xalq-count");
  xalqcount.innerText = xalqbank.length + " vakansiya";

  let restaurants = data.filter((item) =>
    item.author.toLowerCase().includes("res")
  );
  let rescount = document.getElementById("res-count");
  rescount.innerText = restaurants.length + " vakansiya";

  let asthetik = data.filter((item) =>
    item.author.toLowerCase().includes("asthetik ")
  );
  let astcount = document.getElementById("ast-count");
  astcount.innerText = asthetik.length + " vakansiya";
};

renderAuthors();

const toggleButton = document.getElementById("hamburger");
const dropmenu = document.getElementById("dropmenu");

toggleButton.addEventListener("click", function () {
  dropmenu.classList.toggle("show");
});

// REGISTER

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

//LOGIN

var users = JSON.parse(localStorage.getItem('users')) || [];
var loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

if (loggedInUser) {
    document.querySelector(".login-button").textContent = "Welcome, " + loggedInUser.name;
}

function login(event) {
    event.preventDefault(); 
    var email = document.getElementById("loginEmail").value;
    var password = document.getElementById("loginPassword").value;
    document.querySelector(".errorMessages").innerHTML = "";

    if (!email.trim() || !password.trim()) {
        displayErrorMessage("Email and password are required.");
        return;
    }

    var loginUser = users.find(function(user) {
        return user.email === email && user.password === password;
    });

    if (!loginUser) {
        displayErrorMessage("Invalid email or password. Please try again.");
        return;
    }

    document.querySelector(".login-button").textContent = "Welcome, " + loginUser.name;
    localStorage.setItem('loggedInUser', JSON.stringify(loginUser));
}

function logout() {
    localStorage.removeItem('loggedInUser');
    document.querySelector(".login-button").textContent = "Sayta daxil ol";
}

function displayErrorMessage(message) {
    var errorMessages = document.querySelector(".errorMessages");
    var errorMessageElement = document.createElement("div");
    errorMessageElement.textContent = message;
    errorMessages.appendChild(errorMessageElement);
}
