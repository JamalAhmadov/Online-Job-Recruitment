var accessGranted = sessionStorage.getItem("accessGranted");
var sessionTimeout = 300000;

function checkAccess() {
  if (!accessGranted) {
    var password = prompt("Lütfen parolayı giriniz:");
    if (password === "admin123") {
      accessGranted = true;
      sessionStorage.setItem("accessGranted", true);
      setTimeout(clearSession, sessionTimeout);
      showContent();
    } else {
      window.location.href = "../main-pages/home.html";
    }
  } else {
    showContent();
  }
}

function showContent() {
  document.body.style.display = "block";
  setTimeout(clearSession, sessionTimeout);
}

function clearSession() {
  sessionStorage.removeItem("accessGranted");
  alert("Oturumunuzun süresi doldu. Tekrar giriş yapmalısınız.");
  window.location.href = "../main-pages/home.html";
}

window.onload = checkAccess;

let data__container = document.getElementById("data__container");

const API = "http://localhost:3000/cvs/";
let values = [];

function formatPhoneNumber(phoneNumber) {
  return phoneNumber.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, "$1-$2-$3-$4");
}

const renderData = (arr) => {
  data__container.innerHTML = "";
  arr.forEach((item) => {
    let data__box = document.createElement("div");
    data__box.className = "box__item ";
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
            <button class="approve" onclick="approveData(${item.id})">Təstiq et</button>
            <button class="reject" onclick="rejectData(${item.id})">Rədd et</button>

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
    </div>
</div>`;
    data__container.append(data__box);
  });
};

const getData = () => {
  fetch(API)
    .then((res) => res.json())
    .then((data) => {
      values = data.filter((item) => item.approv === false);
      renderData(values);
    });
};

getData();

const rejectData = (id) => {
  fetch(API + id, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Data rejected and deleted:", data);
      getData();
    })
    .catch((error) => {
      console.error("Error rejecting and deleting data:", error);
    });
};

const approveData = (id) => {
  fetch(API + id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ approv: true }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Data approved:", data);
      getData();
    })
    .catch((error) => {
      console.error("Error approving data:", error);
    });
};


const toggleButton = document.getElementById("hamburger");
const dropmenu = document.getElementById("dropmenu");
const mainElement = document.querySelector(".admin-box");

toggleButton.addEventListener("click", function () {
  dropmenu.classList.toggle("show");
  if (dropmenu.classList.contains("show")) {
    mainElement.style.display = "none";
  } else {
    mainElement.style.display = "block";
  }
});