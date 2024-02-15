let data__container = document.getElementById("data__container");

const API = "http://localhost:3000/jobdata/";
values = [];

const renderData = (arr) => {
  data__container.innerHTML = "";
  arr.forEach((item) => {
    let data__box = document.createElement("tr");
    data__box.innerHTML = `
      <td>${item.id}</td>
      <td><img src="${item.image}" alt=""></td>
      <td>${item.title}</td>
      <td>${item.salary}</td>
      <td>
        <button class="reject" onclick="deleteData(${item.id})">Remove</button>
        <button class="approve" onclick="openUpdateModal(${item.id}, '${item.title}', ${item.salary})">Update</button>
      </td>
    `;
    data__container.append(data__box);
  });
};

const openUpdateModal = (id, title, salary) => {
  const modal = document.getElementById("updateModal");
  const titleInput = document.getElementById("updateTitle");
  const salaryInput = document.getElementById("updateSalary");

  titleInput.value = title;
  salaryInput.value = salary;

  modal.style.display = "block";

  const updateButton = document.getElementById("updateButton");
  updateButton.onclick = () => {
    const newTitle = titleInput.value;
    const newSalary = salaryInput.value;

    modal.style.display = "none";
  };
};

window.onclick = (event) => {
  const modal = document.getElementById("updateModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

const closeUpdateModal = () => {
  const modal = document.getElementById("updateModal");
  modal.style.display = "none";
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
const mainElement = document.querySelector(".data-box");

toggleButton.addEventListener("click", function () {
  dropmenu.classList.toggle("show");
  if (dropmenu.classList.contains("show")) {
    mainElement.style.display = "none";
  } else {
    mainElement.style.display = "block";
  }
});


