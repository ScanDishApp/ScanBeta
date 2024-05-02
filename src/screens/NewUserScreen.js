import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ScreenStyle/NewUser.css';
import defaultImage from '../assets/xug.png';
import logo from '../assets/Logo_Big.png'

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
    let userId = localStorage.getItem("userId");
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [profileImage, setProfileImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            setImage(e.target.result);
        };

        reader.readAsDataURL(file);
    };

    const handleGet = async (id) => {
        async function getUser(url, data) {
            const paramUrl = `${url}?id=${data}`;
            return await fetchData(paramUrl, "GET");
        }

        const response = await getUser("https://scanbeta.onrender.com/user/get", id);
        //const response = await getUser("http://localhost:8080/user/get", id);
        const responseData = await response.json();
        console.log("Response:", responseData);

        let profileName = responseData.name
        localStorage.setItem("profileName", profileName)
        let profileEmail = responseData.email
        localStorage.setItem("profileEmail", profileEmail)
        let profileImg = responseData.img
        console.log(profileImg);
        localStorage.setItem("profileImg", profileImg)
        setProfileImage(profileImg);
    };

    const handleCreate = async () => {
        console.log("handleCreate function called");
        async function createUser(url, data) {
            return await fetchData(url, "POST", data);
        }
        const name = document.querySelector('.create-username').value;
        const pswHash = document.querySelector('.create-password').value;
        const email = document.querySelector('.create-email').value;
        let img = image;
        if (!img) {
            img = defaultImage;
        }
        const user = {
            name: name,
            pswHash: pswHash,
            email: email,
            img: img
        };
        console.log(user);
        const response = await createUser("https://scanbeta.onrender.com/user/", user);
        // const response = await createUser("http://localhost:8080/user/", user);
        if (response.status !== 200) {
            setErrorMsg("Alle feltene må fylles ut!");
            console.log("Error message:", errorMsg);
        } else {
            setErrorMsg(null);
        }
        console.log(response);
        const responseData = await response.json();
        const responseDataJson = JSON.parse(responseData)
        console.log("Response:", responseDataJson);
        let userId = responseDataJson.id
        localStorage.setItem("userId", userId);
        await handleGet(userId)
        navigate('/dummy-page')
    };

    return (
        <div className="create-user-container">
                <img src={logo} alt="Logo" style={{ maxHeight: '200px' }} />

            <div className="create-user-grid">
                <h1>Lag en ny bruker</h1>
                <div className="create-user-rectangle">
                    <h2>Brukernavn: </h2>
                    <input className="create-username"></input>
                </div>
                <br></br>
                <div className="create-user-rectangle">
                    <h2>Email: </h2>
                    <input className="create-email"></input>
                </div>
                <br></br>
                <div className="create-user-rectangle">
                    <h2>Passord: </h2>
                    <input className="create-password" type='password'></input>
                </div>
                <div className="profile-img-rectangle" >
                    <h2>Profil bilde:</h2>
                    <label className="pfp-square-create" htmlFor="imageUpload">
                        {image ? <img src={image} alt="Profile" /> : <p>Legg til bilde</p>}
                        <input
                            type="file"
                            id="imageUpload"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ display: 'none' }}
                        />
                    </label>
                </div>
                <p>{errorMsg}</p>
            </div>
            <button onClick={handleCreate} className="create-button">Lag bruker</button>
        </div>
    );
}
