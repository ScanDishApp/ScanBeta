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

export default function EditUser() {
    const navigate = useNavigate(); // Hook for navigation
    const [image, setImage] = useState(localStorage.getItem("profileImg")); 
    const [errorMsg, setErrorMsg] = useState(null);
    const profileName = localStorage.getItem("profileName");
    const profileEmail = localStorage.getItem("profileEmail");

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            setImage(e.target.result);
        };

        reader.readAsDataURL(file);
    };
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
            img: image,
            id: id,

        };
        
        if (pswHash == "") {
            setErrorMsg("Husk å skrive passord!"); // Update error message state
            console.log("Error message:", errorMsg);
        } else {
            setErrorMsg(null); // Clear error message if login is successful
            const response = await updateUser(`http://localhost:8080/user/${id}`, user);
            const responseData = await response.json();
            let profileName = responseData.name
            localStorage.setItem("profileName", profileName) 
            let profileEmail = responseData.email
            localStorage.setItem("profileEmail", profileEmail)
            let profileImg = responseData.img
            console.log(profileImg);
            localStorage.setItem("profileImg", profileImg)
            navigate('/dummy-page');
        }
      
    };

    return (
        <div className="edit-user-container">

            <div className="rectangle-grid">

                <h1>Endre bruker</h1>
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
                    <input className="update-username" value={profileName}></input>
                </div>
                <br></br>
                <div className="rectangle">
                    <h2>Email: </h2>
                    <input className="update-email" value={profileEmail}></input>
                </div>
                <br></br>
                <div className="rectangle">
                    <h2>Passord: </h2>
                    <input className="update-password" type='password'></input>
                </div>
                <p>{errorMsg}</p>
                <button onClick={handleUpdate} className="update-button">Endre bruker</button>
                <button onClick={handleDelete} className="delete-button">Slett bruker</button>
            </div>




        </div>
    );
}
