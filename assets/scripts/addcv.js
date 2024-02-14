var loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
if (loggedInUser) {
  document.querySelectorAll(".login-button").forEach(function (button) {
    button.textContent = loggedInUser.name;
  });
}
const toggleButton = document.getElementById("hamburger");
const dropmenu = document.getElementById("dropmenu");
const mainElement = document.querySelector(".addcv-box");

toggleButton.addEventListener("click", function () {
  dropmenu.classList.toggle("show");
  if (dropmenu.classList.contains("show")) {
    mainElement.style.display = "none";
  } else {
    mainElement.style.display = "block";
  }
});


var nameInput = document.getElementById("cv__name");
var bdayInput = document.getElementById("cv__bday");
var phoneInput = document.getElementById("cv__phone");
var phoneCode = document.getElementById("cv__pcode");
var salaryInput = document.getElementById("cv__salary");
var profInput = document.getElementById("cv__prof");
var workInput = document.getElementById("cv__work");

let cv__post = document.getElementById("cv__post");

let avatar = document.querySelector("#cvimage");
let fimage = document.querySelector('input[type="file"]');

fimage.addEventListener("input", (e) => {
  let file = e.target.files[0];
  if (file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      avatar.src = reader.result;
    };
  }
});

function checkInputs() {
  if (nameInput.value.trim() === "") {
    alert("Zəhmət olmazsa adınızı daxil edin.");
    return false;
  }

  if (
    phoneInput.value.trim() === "" ||
    phoneInput.value.length !== 7 ||
    isNaN(phoneInput.value)
  ) {
    alert("Keçərsiz mobil nömrə.");
    return false;
  }

  if (salaryInput.value.trim() === "" || isNaN(salaryInput.value)) {
    alert("Keçərsiz maaş miqdarı.");
    return false;
  }

  if (profInput.value.trim() === "") {
    alert("Zəhmət olmazsa vəzifənizi daxil edin.");
    return false;
  }

  if (workInput.value === "") {
    alert("Zəhmət olmazsa iş rejiminizi daxil edin.");
    return false;
  }

  return true;
}

const postCv = () => {
  if (checkInputs()) {
    axios
      .post("http://localhost:3000/cvs/", {
        image: avatar.src,
        name: cv__name.value,
        bday: cv__bday.value,
        phone: cv__pcode.value + cv__phone.value,
        salary: cv__salary.value,
        prof: cv__prof.value,
        work: cv__work.value,
      })
      .then(function (response) {
        console.log(response);
        // JSON sunucusuna başarıyla gönderildiğinde, local storage'e de ekleyelim.
        let myCvs = JSON.parse(localStorage.getItem("mycvs")) || [];
        myCvs.push({
          image: avatar.src,
          name: cv__name.value,
          bday: cv__bday.value,
          phone: cv__pcode.value + cv__phone.value,
          salary: cv__salary.value,
          prof: cv__prof.value,
          work: cv__work.value,
        });
        localStorage.setItem("mycvs", JSON.stringify(myCvs));
      })
      .catch(function (error) {
        console.log(error);
      });
  }
};

cv__post.addEventListener("click", postCv);
