let data__container = document.getElementById("data__container");

var loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
if (loggedInUser) {
  document.querySelectorAll(".login-button").forEach(function (button) {
    button.textContent = loggedInUser.name;
  });
}

const API = "http://localhost:3000/cvs/";
values = [];

const renderData = (arr) => {
  data__container.innerHTML = " ";
  arr.forEach((item) => {
    let data__box = document.createElement("tr");
    data__box.innerHTML = `
    <div >
      <img src="${item.image}" alt="">
    </div>

     <button> Sil </button>

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
