import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import sha256 from './sha256'
import './ScreenStyle/EditUser.css';

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
    const [profileName, setProfileName] = useState(localStorage.getItem("profileName"));
    const [profileEmail, setProfileEmail] = useState(localStorage.getItem("profileEmail"));
    const [profilePswHash, setProfilePswHash] = useState(localStorage.getItem("profilePswHash"));
    const [profileImage, setProfileImage] = useState(null);

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

        const response = await deleteUser(`https://scanbeta.onrender.com/user/${id}`);
        //const response = await deleteUser(`http://localhost:8080/user/${id}`);
        localStorage.removeItem("profileName")
        localStorage.removeItem("profileEmail")
        localStorage.removeItem("profileImg")
        localStorage.removeItem("userId")
        navigate('/dummy-page')
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
        localStorage.setItem("profileImg", profileImg)
        setProfileImage(profileImg);
        let profilePswHash = responseData.pswHash
        
        localStorage.setItem("profilePswHash", profilePswHash)

    };

    const handleUpdate = async () => {
        async function updateUser(url, data) {
            return await fetchData(url, "PUT", data);
        }
        const name = document.querySelector('.update-username').value;
        let pswHash = document.querySelector('.update-password').value;
        pswHash = await sha256(pswHash);
        const email = document.querySelector('.update-email').value;
        let id = localStorage.getItem("userId")
        
        const user = {
            name: name,
            pswHash: pswHash,
            email: email,
            img: image,
            id: id,

        };
            setErrorMsg(null);

            const response = await updateUser(`https://scanbeta.onrender.com/user/${id}`, user);
            // const response = await updateUser(`http://localhost:8080/user/${id}`, user);
         
            const responseData = await response.json();
            const responseDataJson = JSON.parse(responseData)
            console.log("Response:", responseDataJson);
            let userId = responseDataJson.id
            localStorage.setItem("userId", userId);
            console.log(userId);
            await handleGet(userId)
            navigate('/dummy-page')
        
    };

    return (
        <div className="edit-user-container">
            <div className="rectangle-grid-edit">
                <h1>Endre bruker</h1>
                <div className="edit-rectangle">
                    <h2>Brukernavn: </h2>
                    <input
                        className="update-username"
                        value={profileName}
                        onChange={(e) => setProfileName(e.target.value)}
                    />
                </div>
                <br></br>
                <div className="edit-rectangle">
                    <h2>Email: </h2>
                    <input
                        className="update-email"
                        value={profileEmail}
                        onChange={(e) => setProfileEmail(e.target.value)}
                    />
                </div>
                <br></br>
                <div className="edit-rectangle">
                    <h2>Passord: </h2>
                    <input className="update-password"  type='password' value={profilePswHash} onChange={(e) => setProfilePswHash(e.target.value)}></input>
                </div>
                <div className="profile-img-rectangle">
                    <h2>Profil bilde:</h2>
                    <label className="pfp-square-edit" htmlFor="imageUpload">
                        {image ? <img src={image} alt="Profile" /> : <p>Legg til bidet</p>}
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
            <button onClick={handleUpdate} className="update-button">Oppdater bruker</button>
            <button onClick={handleDelete} className="delete-user-button">Slett bruker</button>
        </div>
    );
}
