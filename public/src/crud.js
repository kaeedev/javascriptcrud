import { getUsers, deleteUser, updateUser } from './api.js';

let editUser = null; // va a contener el usuario que estemos editando
const form = document.getElementById('form');
const userList = document.getElementById('user-list'); // Definir userList en el alcance adecuado

// Render de usuarios (obtener los usuarios y verlos en pantalla)
const renderUsers = async () => {
    const users = await getUsers();
    userList.innerHTML = ''; // Limpiar la lista antes de renderizar
    users.forEach(user => {
        const element = document.createElement('li');
        element.innerHTML = `
            <span>${user.name} (${user.email})</span>
            <button type='button' class='edit' data-id='${user.id}'>Editar</button>
            <button type='button' class='delete' data-id='${user.id}'>Eliminar</button>
        `;
        userList.appendChild(element);
    });
};

// Manejar el click en userList
const handleUserListClick = (event) => {
    const target = event.target;

    if (target.classList.contains('edit')) {
        const id = target.getAttribute('data-id');
        const user = target.parentNode.children[0].innerText.split(' (');
        const name = user[0];
        const email = user[1].replace(')', '');
        handleEdit(id, name, email);
    } else if (target.classList.contains('delete')) {
        const id = target.getAttribute('data-id');
        handleDelete(id);
    }
};

// Manejar el submit
const handleSubmit = async (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    if (editUser) {
        await updateUser({ name, email, id: editUser.id });
    } else {
        await updateUser({ name, email }); // Crear un nuevo usuario si no estamos editando
    }

    form.reset();
    editUser = null; // Resetear editUser
    renderUsers();
};

// Manejar el edit
const handleEdit = (id, name, email) => {
    editUser = { id, name, email };
    document.getElementById('name').value = name;
    document.getElementById('email').value = email;
};

// Manejar el delete
const handleDelete = async (id) => {
    await deleteUser(id);
    renderUsers();
};

// Agregar eventos al HTML
form.addEventListener('submit', handleSubmit);
userList.addEventListener('click', handleUserListClick);

renderUsers();
