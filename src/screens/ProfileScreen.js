import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ScreenStyle/Profile.css';

async function fetchData(url, method, data) {
    const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
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

export default function Profile() {
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false);

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
        //const response = await loginUser("https://scanbeta.onrender.com/user/login", user);
        const response = await loginUser("http://localhost:8080/user/login", user);

        const responseData = await response.json();
        console.log("Response:", responseData);
        let userId = responseData.id
        localStorage.setItem("userId", userId)

        if (userId) {
            setLoggedIn(true);
            navigate('/dummy-page');
        } else {
            setLoggedIn(false);
        
        }
    };

    const handleDelete = async () => {
        async function deleteUser(url) {
            return await fetchData(url, "DELETE");
        }
        let id = localStorage.getItem("userId");
        const response = await deleteUser(`https://scanbeta.onrender.com/user/${id}`);
       // const response = await deleteUser(`http://localhost:8080/user/${id}`);
        const responseData = await response.json();
        console.log("Response:", responseData);
    };

    const handleGet = async () => {
        async function getUser(url, data) {
            const paramUrl = `${url}?id=${data}`;
            return await fetchData(paramUrl, "GET");
        }
        let id = localStorage.getItem("userId");
        const response = await getUser("https://scanbeta.onrender.com/user/get", id);
        //const response = await getUser("http://localhost:8080/user/get", id);
        const responseData = await response.json();
        console.log("Response:", responseData);
    };

    const handleCreatePage = async () => {
        navigate('/new-user-page');
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
        const response = await updateUser(`https://scanbeta.onrender.com/user/${id}`, user);
        //const response = await updateUser(`http://localhost:8080/user/${id}`, user);
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
                <button onClick={handleCreatePage} className="create-button">Lag bruker</button>
            </div>
        </div>
    );
}
