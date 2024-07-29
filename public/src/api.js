const API_URL ='https://jsonplaceholder.typicode.com/users'

//getUsers
export const getUsers = async() => {
    const response = await fetch(API_URL)  //hacemos un fetch GET a la api para obtener los usuarios
    return await response.json() //esperamos la respuesta y devolvemos lo que nos devuelva en formato json
}
//deleteUser
 export const deleteUser = async(id) => {
    const responser = await fetch(`${API_URL}/${id}`, //cogemos el id del usuario que queremos borrar de la API, debemos pasarlo por parametros
    {
        method: 'DELETE'  //metodo delete para borrar informacion de la api
    })
    return await responser.json() //esperamos la respuesta y devolvemos lo que nos devuelva en formato json
}

//editUser --> addUser
export const updateUser = async(user) => {
    const url = user.id ? `${API_URL}/${user.id}` : API_URL //si tiene user.id entonces mandamos user.id sino, mandamos API_URL
    const method = user.id ? 'PUT' : 'POST'
    const response = await fetch(url, {
            method: method, 
            headers: {
                'Content-Type': 'application/json', //debemos poner que esperamos contenido de tipo json
            },
            body: JSON.stringify(user)
        })
    return await response.json()
}

//Una condicion que diga si estamos editando o no un usuario