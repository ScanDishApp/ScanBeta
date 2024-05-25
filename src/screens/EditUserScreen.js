import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import sha256 from './sha256'
import LoadingModal from './LoadingModual';
import divider from '../assets/divider.png';
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
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState(null);
    const [profileName, setProfileName] = useState(localStorage.getItem("profileName"));
    const [profileEmail, setProfileEmail] = useState(localStorage.getItem("profileEmail"));
    const [profilePswHash, setProfilePswHash] = useState(localStorage.getItem("profilePswHash"));
    const [profileImage, setProfileImage] = useState(localStorage.getItem("profileImg"));
    const [isLoading, setIsLoading] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            setProfileImage(e.target.result);
        };

        reader.readAsDataURL(file);
    };
    const handleDelete = async () => {
        async function deleteUser(url) {
            return await fetchData(url, "DELETE");
        }
        let id = localStorage.getItem("userId");

        const response = await deleteUser(`/user/${id}`);
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

        const response = await getUser("/user/get", id);
        const responseData = await response.json();
        let profileName = responseData.name
        localStorage.setItem("profileName", profileName)
        let profileEmail = responseData.email
        localStorage.setItem("profileEmail", profileEmail)
        let profileImg = responseData.img
        localStorage.setItem("profileImg", profileImg)
        setProfileImage(profileImg);
        let profilePswHash = responseData.pswHash
        setProfilePswHash(profilePswHash)
        localStorage.setItem("profilePswHash", profilePswHash)

    };

    const handleUpdateUserInfo = async () => {
        async function updateUser(url, data) {
            return await fetchData(url, "PUT", data);
        }
        const name = document.querySelector('.update-username').value;
        const email = document.querySelector('.update-email').value;
        const emailImp = document.querySelector('.update-email');
        let id = localStorage.getItem("userId")
        let img = profileImage;
        let pswHash = profilePswHash;
        const user = {
            name,
            pswHash,
            email,
            img,
            id,
        };
        setErrorMsg(null);
        setIsLoading(true);
        const response = await updateUser(`/user/${id}`, user);
        if (!response.ok) {

            setErrorMsg("Emailen er i bruk");
            emailImp.classList.add('error-border');

            setIsLoading(false);
        }
        const responseData = await response.json();
        let userId = responseData.id
        localStorage.setItem("userId", userId);
        await handleGet(userId)
        navigate('/dummy-page')
        setIsLoading(false);

    };

    const handleUpdatePassword = async () => {
        async function updateUser(url, data) {
            return await fetchData(url, "PUT", data);
        }
        let currentPswHashInp = document.querySelector('.update-current-password');
        let pswHashInp = document.querySelector('.update-new-password');
        let currentPswHash = document.querySelector('.update-current-password').value;
        currentPswHash = await sha256(currentPswHash);
        let pswHash = document.querySelector('.update-new-password').value;
        pswHash = await sha256(pswHash);
        if (currentPswHash === profilePswHash) {

            let id = localStorage.getItem("userId")
            const user = {
                name: profileName,
                pswHash: pswHash,
                email: profileEmail,
                img: profileImage,
                id: id,
            };
            setErrorMsg(null);
            setIsLoading(true);
            const response = await updateUser(`/user/${id}`, user);
            const responseData = await response.json();
            let userId = responseData.id
            localStorage.setItem("userId", userId);
            await handleGet(userId)
            navigate('/dummy-page')
            setIsLoading(false);

        } else if (currentPswHash === pswHash) {

            setErrorMsg("Passord kan ikke være like");
            currentPswHashInp.classList.add('error-border');
            pswHashInp.classList.add('error-border');

            setIsLoading(false);
        } else {
            setErrorMsg("Ikke riktig passord!");
            currentPswHashInp.classList.add('error-border');
            setIsLoading(false);
        }

    };

    return (
        <div className="edit-user-container">
            <LoadingModal isLoading={isLoading} />
            <div className="rectangle-grid-edit">
                <h1>Endre bruker data</h1>
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

                <div className="profile-img-rectangle">
                    <h2>Profil bilde:</h2>
                    <label className="pfp-square-edit" htmlFor="imageUpload">
                        {profileImage ? <img src={profileImage} alt="Profile" /> : <p>Legg til bidet</p>}
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
                <button onClick={handleUpdateUserInfo} onChange={(e) => setProfilePswHash(e.target.value)} className="update-button">Oppdater bruker</button>

            </div>

            <div className='divider-container'>
                <img src={divider} alt="Divider" style={{ maxHeight: '50px' }} />

            </div>


            <div className='edit-psw'>
                <h1>Endre passord</h1>
                <div className="edit-rectangle-psw">
                    <h2>Nåværende passord: </h2>
                    <input className="update-current-password" type='password'></input>
                </div>
                <div className="edit-rectangle-psw">
                    <h2>Nytt passord: </h2>
                    <input className="update-new-password" type='password'></input>
                </div>
                <button onClick={handleUpdatePassword} onChange={(e) => setProfilePswHash(e.target.value)} className="update-button">Oppdater bruker</button>
                <p>{errorMsg}</p>
            </div>

            <div className='divider-container'>
                <img src={divider} alt="Divider" style={{ maxHeight: '50px' }} />

            </div>

            <button onClick={handleDelete} className="delete-user-button">Slett bruker</button>
        </div>
    );
}