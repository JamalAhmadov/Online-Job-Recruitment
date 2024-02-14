function getUsersFromLocalStorage() {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    return users;
}

function renderUsersList() {
    let users = getUsersFromLocalStorage();
    let userList = document.getElementById('user-list');
    userList.innerHTML = '';

    users.forEach(function(user) {
        let listItem = document.createElement('li');
        listItem.textContent = `${user.name} - ${user.email}`;

        let banButton = document.createElement('button');
        banButton.textContent = 'Ban';
        banButton.addEventListener('click', function() {
            banUser(user);
        });

        listItem.appendChild(banButton);
        userList.appendChild(listItem);
    });
}

function banUser(user) {
    let bannedUsers = JSON.parse(localStorage.getItem('bannedUsers')) || [];
    bannedUsers.push(user);
    localStorage.setItem('bannedUsers', JSON.stringify(bannedUsers));

    let users = getUsersFromLocalStorage();
    let filteredUsers = users.filter(function(u) {
        return u.name !== user.name || u.email !== user.email;
    });
    localStorage.setItem('users', JSON.stringify(filteredUsers));

    renderUsersList();
}

document.addEventListener('DOMContentLoaded', function() {
    renderUsersList();
});
