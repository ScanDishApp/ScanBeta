import React from 'react';
import './ScreenStyle/Setting.css';
async function fetchData(url, method, data) {
    const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*" // Legg til denne linjen for å tillate forespørsler fra alle domener
    };

    const options = {
        method,
        headers,
        
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);
    return response;
}


export default function Setting() {
    const handleDelete = async () => {
        async function deleteUser(url) {
            return await fetchData(url, "DELETE");
        }
        let id = 4;
        const response = await deleteUser(`http://localhost:8080/user/${id}`);
        console.log(response);
    };
    const handleGet = async () => {
        async function getUser(url , data) {
            const paramUrl = `${url}?id=${data}`;
            return await fetchData(paramUrl, "GET");
        }
        let id = null
        const response = await getUser("http://localhost:8080/user/get", id);
        console.log(response);
    };
    
    const handleLogin = async () => {
        async function loginUser(url, data) {
            return await fetchData(url, "POST", data);
        }
       let user = null
        const response = await loginUser("http://localhost:8080/user/login", user);
        console.log(response);
    };
   
    const handleCreate = async () => {
        async function createUser(url , data) {
            return await fetchData(url, "POST", data);
        }
       let user = null
        const response = await createUser("http://localhost:8080/user/", user);
        console.log(response);
    };
    const handleUpdate = async () => {
        async function updateUser(url , data) {
            return await fetchUser(url, "PUT", data);
        }
        let id = null;
        let user = null;
        const response = await updateBook(`http://localhost:8080/user/${id}`, user);
        console.log(response);
    };
    
    return (
        <div className="setting-container">
            <h1>SettingsScreen</h1>


            <div className="rectangle-grid">
                <div className="rectangle">
                    <h2>⚙️ Settings...</h2>
                </div>
            </div>


        </div>
    );
}
