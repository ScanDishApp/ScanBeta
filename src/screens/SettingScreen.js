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
        let id = localStorage.getItem("userId");
        const response = await deleteUser(`http://localhost:8080/user/${id}`);
        const responseData = await response.json();
        console.log("Response:", responseData);
    };
    const handleGet = async () => {
        async function getUser(url, data) {
            const paramUrl = `${url}?id=${data}`;
            return await fetchData(paramUrl, "GET");
        }
        let id = localStorage.getItem("userId");
        const response = await getUser("http://localhost:8080/user/get", id);
        const responseData = await response.json();
        console.log("Response:", responseData);
    };

    const handleLogin = async () => {
        async function loginUser(url, data) {
            return await fetchData(url, "POST", data);
        }
        const email = document.querySelector('.log-in-email').value;
        const pswHash = document.querySelector('.log-in-username').value;


        const user = {
            pswHash: pswHash,
            email: email
        };
        const response = await loginUser("http://localhost:8080/user/login", user);
        const responseData = await response.json();
        console.log("Response:", responseData);
        let userId = responseData.id
        localStorage.setItem("userId", userId)
    };

    const handleCreate = async () => {
        async function createUser(url, data) {
            return await fetchData(url, "POST", data);
        }
        const name = document.querySelector('.create-username').value;
        const pswHash = document.querySelector('.create-password').value;
        const email = document.querySelector('.create-email').value;

        const user = {
            name: name,
            pswHash: pswHash,
            email: email
        };
        console.log(user);
        const response = await createUser("http://localhost:8080/user/", user);
        const responseData = await response.json();
        console.log("Response:", responseData);
    };
    const handleUpdate = async () => {
        async function updateUser(url, data) {
            return await fetchData(url, "PUT", data);
        }
        const name = document.querySelector('.update-username').value;
        const pswHash = document.querySelector('.update-password').value;
        const email = document.querySelector('.update-email').value;
        let id = localStorage.getItem("userId")

        const user = {
            name: name,
            pswHash: pswHash,
            email: email,
            id: id
        };
        
        const response = await updateUser(`http://localhost:8080/user/${id}`, user);
        const responseData = await response.json();
        console.log("Response:", responseData);
    };

    return (
        <div className="login-container">
            <div className="rectangle-grid">
                <h1>Logg inn</h1>
                <div className="rectangle">
                    <h2>E-post: </h2>
                    <input className="log-in-email"></input>
                </div>
                <br></br>
                <div className="rectangle">
                    <h2>Passord: </h2>
                    <input className="log-in-username"></input>
                </div>
                <button onClick={handleLogin} className="login-button">Logg inn</button>
                <br></br>
                <br></br>
                <br></br>
                <h1>Lag en ny bruker</h1>
                <div className="rectangle">
                    <h2>Brukernavn: </h2>
                    <input className="create-username"></input>
                </div>
                <br></br>
                <div className="rectangle">
                    <h2>Email: </h2>
                    <input className="create-email"></input>
                </div>
                <br></br>
                <div className="rectangle">
                    <h2>Passord: </h2>
                    <input className="create-password"></input>
                </div>
                <button onClick={handleCreate} className="create-button">Lag bruker</button>
                <br></br>
                <br></br>
                <br></br>
                <h1>Endre bruker</h1>
                <div className="rectangle">
                    <h2>Brukernavn: </h2>
                    <input className="update-username"></input>
                </div>
                <br></br>
                <div className="rectangle">
                    <h2>Email: </h2>
                    <input className="update-email"></input>
                </div>
                <br></br>
                <div className="rectangle">
                    <h2>Passord: </h2>
                    <input className="update-password"></input>
                </div>
                <button onClick={handleUpdate} className="update-button">Endre bruker</button>
                <button onClick={handleDelete} className="delete-button">Slett bruker</button>
            </div>
        </div>
    );
}
