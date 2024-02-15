let data__container = document.getElementById("data__container");


var loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
if (loggedInUser) {
  document.querySelectorAll(".login-button").forEach(function(button) {
    button.textContent = loggedInUser.name;
  });
}

const API = "http://localhost:3000/favorites/";
values = [];

const renderData = (arr) => {
  data__container.innerHTML = " ";
  arr.forEach((item) => {
    let data__box = document.createElement("div");
    data__box.className = "box__item"
    data__box.innerHTML = `
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
      </div>
    </div>
    </div>

    <div>
      <span onclick="deleteData(${item.id})" class="box__fav"><i class="unliked-icon"></i></span>
      <p>${item.salary ?  ` ${item.salary } AZN` : "" }</p>
    </div>

        `;
    data__container.append(data__box);
  });
};

const getData = () => {
  fetch(API)
    .then((res) => res.json())
    .then((data) => {
      values = data;
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



const toggleButton = document.getElementById("hamburger");
const dropmenu = document.getElementById("dropmenu");
const mainElement = document.querySelector(".wishlist-box");

toggleButton.addEventListener("click", function () {
  dropmenu.classList.toggle("show");
  if (dropmenu.classList.contains("show")) {
    mainElement.style.display = "none";
  } else {
    mainElement.style.display = "block";
  }
});

if (!loggedInUser) {
  window.location.href = "../main-pages/home.html";
}
