let bsk__container = document.getElementById("data__container");

const toggleButton = document.getElementById("hamburger");
const dropmenu = document.getElementById("dropmenu");
const mainElement = document.querySelector(".myitems-box");

toggleButton.addEventListener("click", function () {
  dropmenu.classList.toggle("show");
  if (dropmenu.classList.contains("show")) {
    mainElement.style.display = "none";
  } else {
    mainElement.style.display = "block";
  }
});

var loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
if (loggedInUser) {
  document.querySelectorAll(".login-button").forEach(function (button) {
    button.textContent = loggedInUser.name;
  });
}

function formatPhoneNumber(phoneNumber) {
  return phoneNumber.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, "$1-$2-$3-$4");
}

const renderProducts = () => {
  bsk__container.innerHTML = "";
  let mycvs = JSON.parse(localStorage.getItem("mycvs"));
  mycvs.forEach((item, id) => {
    let box__item = document.createElement("div");
    box__item.className = "box__item";
    box__item.innerHTML = `
    <div class="cvbox">
    <div class="cvbox-top">
        <div class="cvbox-info">
            <div class="cvbox-image">
                <img src="${item.image}" alt="">
            </div>
            <div class="cvbox-title">
                <h4>${item.prof}</h4>
                <p>${item.name}</p>
                <span>Təstiq gözləyir</span>
            </div>
        </div>
        <div class="cvbox-buttons">
            <div class=" d-flex align-items-center flex-column">
                <a class="btn mb-3" target="_blank" href="../main-pages/resumes.html">
                    <img loading="lazy" src="https://www.hellojob.az/content/assets/images/profile/svg-icons/eye.svg"
                        alt="">
                    <span>Elana bax</span>
                </a>
                <a href="#" class=" btn mb-3">
                    <img loading="lazy" src="https://www.hellojob.az/content/assets/images/profile/svg-icons/edit.svg"
                        alt="">
                    <span>Redaktə et</span>
                </a>
                <a onclick="removeFrommycvs(${id})" class="btn">
                    <img loading="lazy" src="https://www.hellojob.az/content/assets/images/profile/svg-icons/delete.svg"
                        alt="">
                    <span>Sil</span>
                </a>
            </div>
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
    bsk__container.append(box__item);
  });
};

renderProducts();

const removeFrommycvs = (id) => {
  let mycvs = JSON.parse(localStorage.getItem("mycvs"));
  mycvs.splice(id, 1);
  localStorage.setItem("mycvs", JSON.stringify(mycvs));
  renderProducts();
  displaycount();
};

const displaycount = () => {
  let mycvs = JSON.parse(localStorage.getItem("mycvs"));
  let cvcount = document.getElementById("cvcount");
  cvcount.innerText = `CV-lər (${mycvs.length})`;
};
displaycount();
