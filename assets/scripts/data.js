let data__container = document.getElementById("data__container");

const API = "http://localhost:3000/jobdata/";
values = [];

const renderData = (arr) => {
  data__container.innerHTML = " ";
  arr.forEach((item) => {
    let data__box = document.createElement("tr");
    data__box.innerHTML = `
        
        <td>${item.id}</td>
        <td><img src="${item.image}" alt=""></td>
        <td> ${item.title}</td>
        <td> ${item.salary}</td>
        <td><button onclick="deleteData(${item.id})">Remove </button> <button>Update </button></td>
        

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
