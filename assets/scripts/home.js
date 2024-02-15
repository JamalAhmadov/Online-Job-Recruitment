const theme__btn = document.getElementById("theme__btn");
const wmode__logo = document.getElementById("wmode__logo");
const nmode__logo = document.getElementById("nmode__logo");

const myModal = bootstrap.Modal.getOrCreateInstance("#staticBackdrop");

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

const renderAuthors = async () => {
  const res = await fetch(`http://localhost:3000/jobdata`);
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
const mainElement = document.getElementsByTagName("main")[0];
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

// SEARCH DATA

const search = document.getElementById("search__input");

const searchByName = async (title) => {
  const res = await fetch(`http://localhost:3000/jobdata`);
  const data = await res.json();
  let flteddata = data.filter((item) =>
    item.title.toLowerCase().includes(title)
  );
  data__box.innerHTML = " ";
  flteddata.forEach((item) => {
    let card = document.createElement("div");
    card.className = "box__item";
    card.innerHTML = `
      
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
      <span onclick="addToFav(${item.id})" class="box__fav"><i id="favIcon_${item.id}"  class="unliked-icon"></i></span>
      <p>${item.salary} AZN</p>
    </div>
    
  
    `;
    data__box.append(card);
  });
};

search.addEventListener("input", (e) => {
  searchByName(e.target.value);
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
// ADD TO FAV

const addToFav = async (id) => {
  try {
    const response = await fetch("http://localhost:3000/favorites");
    const favorites = await response.json();
    const filteredfav = favorites.find((item) => item.id == id);
    if (filteredfav) {
      await fetch(`http://localhost:3000/favorites/${id}`, {
        method: "DELETE",
      });
      document.getElementById(`item${id}`).classList.remove("liked-icon");
      document.getElementById(`item${id}`).classList.add("unliked-icon");
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

// const likedchecker = () => {
//   let likedItems = [];
//   likedItems = JSON.parse(localStorage.getItem("liked")) || [];
//   likedItems.forEach((id) => {
//     let item = document.getElementById(`item${id}`);
//     if (item) {
//       item.classList.add("liked-icon");
//     }
//   });
// };

// likedchecker();


const filterOpen = () => {
  document.querySelector(".search-bar-bottom").style.display = "flex";
  document.querySelector(".search-bar-top").style.display = "none";
};
const filterClose = () => {
  document.querySelector(".search-bar-bottom").style.display = "none";
  document.querySelector(".search-bar-top").style.display = "flex";
};

const swiper = new Swiper(".swiper", {
  slidesPerView: 6,
  direction: "horizontal",
  loop: false,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  scrollbar: {
    el: ".swiper-scrollbar",
  },
  breakpoints: {
    1200: {
      slidesPerView: 6,
    },
    992: {
      slidesPerView: 5,
    },
    768: {
      slidesPerView: 4,
      navigation: {
        nextEl: null,
        prevEl: null,
      },
    },
    400: {
      slidesPerView: 3,
      navigation: {
        nextEl: null,
        prevEl: null,
      },
    },
    0: {
      slidesPerView: 2,

      navigation: {
        nextEl: null,
        prevEl: null,
      },
    },
  },
});

//

async function getData() {
  const response = await fetch("http://localhost:3000/jobdata/");
  const data = await response.json();
  return data;
}

async function main() {
  const postsData = await getData();
  let currentPage = 1;
  let rows = 10;

  function displayList(arrData, rowPerPage, page) {
    const postsEl = document.querySelector("#data__box");
    postsEl.innerHTML = "";
    page--;

    const start = rowPerPage * page;
    const end = start + rowPerPage;
    const paginatedData = arrData.slice(start, end);

    paginatedData.forEach((item) => {
      const postEl = document.createElement("div");
      postEl.classList.add("box__item");
      postEl.innerHTML = `
      
      <div class="box__main">
      <div >
        <img src="${item.image}" alt="">
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
        <span onclick="addToFav(${item.id})" class="box__fav"><i id="item${item.id}" class="unliked-icon"></i></span>
        <p>${item.salary} AZN</p>
      </div>
      
    
      `;
      postsEl.appendChild(postEl);
    });
  }

  function displayPagination(arrData, rowPerPage) {
    const paginationEl = document.querySelector(".pagination");
    const pagesCount = Math.ceil(arrData.length / rowPerPage);
    const ulEl = document.createElement("ul");
    ulEl.classList.add("pagination__list");

    for (let i = 0; i < pagesCount; i++) {
      const liEl = displayPaginationBtn(i + 1);
      ulEl.appendChild(liEl);
    }
    paginationEl.appendChild(ulEl);
  }

  function displayPaginationBtn(page) {
    const liEl = document.createElement("li");
    liEl.classList.add("pagination__item");
    liEl.innerText = page;

    if (currentPage == page) liEl.classList.add("pagination__item--active");

    liEl.addEventListener("click", () => {
      currentPage = page;
      displayList(postsData, rows, currentPage);

      let currentItemLi = document.querySelector("li.pagination__item--active");
      currentItemLi.classList.remove("pagination__item--active");

      liEl.classList.add("pagination__item--active");
    });

    return liEl;
  }

  displayList(postsData, rows, currentPage);
  displayPagination(postsData, rows);
}

main();


