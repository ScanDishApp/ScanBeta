import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ScreenStyle/NewUser.css';
import defaultImage from '../assets/hatt.png'

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

export default function NewUser() {
    const navigate = useNavigate(); // Hook for navigation
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            setImage(e.target.result);
        };

        reader.readAsDataURL(file);
    };

    const handleCreate = async () => {
        async function createUser(url, data) {
            return await fetchData(url, "POST", data);
        }
        const name = document.querySelector('.create-username').value;
        const pswHash = document.querySelector('.create-password').value;
        const email = document.querySelector('.create-email').value;
        let img = image;
        if (!img){
             img = defaultImage; 
        }
        const user = {
            name: name,
            pswHash: pswHash,
            email: email,
            img: img
        };
        console.log(user);
        const response = await createUser("http://localhost:8080/user/", user);
        const responseData = await response.json();
        console.log("Response:", responseData);
        navigate('/dummy-page')
    };

    return (
        <div className="create-user-container">
            <div className="rectangle-grid">
                
                <h1>Lag en ny bruker</h1>
                <label className="pfp-square" htmlFor="imageUpload">
                    {image ? <img src={image} alt="Profile" /> : <p>Legg til bidet</p>}
                    <input
                        type="file"
                        id="imageUpload"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                    />
                </label>
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
            </div>

           
        </div>
    );
}
