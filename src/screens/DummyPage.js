import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoCameraOutline } from 'react-icons/io5';
import './ScreenStyle/DummyPage.css';

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

export default function DummyPage() {
    let userId = localStorage.getItem("userId");
    let profileName = localStorage.getItem("profileName");
    let profileImg = localStorage.getItem("profileImg");
    const [errorMsg, setErrorMsg] = useState(null);


    const navigate = useNavigate();
    const contentCount = 20;
    const followersCount = 1000;
    const followingCount = 500;

    const [image, setImage] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            setImage(e.target.result);
        };

        reader.readAsDataURL(file);
    };

    const handleLogOut = () => {
        localStorage.removeItem("userId")
        navigate('/dummy-page');
    }

    const handleEditUser = () => {
        navigate('/edit-user-page');
    }

    useEffect(() => {
        setProfileImage(profileImg);
    }, []);

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

    const handleLogin = async () => {
        async function loginUser(url, data) {
            return await fetchData(url, "POST", data);
        }

        const email = document.querySelector('.log-in-email').value;
        const pswHash = document.querySelector('.log-in-password').value;

        const user = {
            pswHash: pswHash,
            email: email
        };
        const response = await loginUser("https://scanbeta.onrender.com/user/login", user);
        //const response = await loginUser("http://localhost:8080/user/login", user);

        if (response.status !== 200) {
            setErrorMsg("Feil brukernavn eller passord!");
            console.log(errorMsg);
        } else {
            setErrorMsg(null);
        }

        const responseData = await response.json();
        console.log("Response:", responseData);
        let userId = responseData.id
        localStorage.setItem("userId", userId)
        navigate('/dummy-page');
        handleGet(userId)
    };

    const handleCreatePage = async () => {
        navigate('/new-user-page');

    };

    const handleFriendPage = async () => {
        navigate('/friends');

    };

    const handleSharedBooks = async () => {
        navigate('/shared-books');

    };

    if (userId) {
        return (
            <div className="profile-container">
                <h1>ScanDish</h1>

                <div className="rectangle-grid">
                    <div className="rectangle">
                        <h2>👑 Profil...</h2>
                    </div>
                </div>
                <div className="rectangle-grid">
                    <div className="rectangle-profile">
                        <div className="small-square">
                            <h2>Hei! {profileName}</h2>
                        </div>
                        <label className="pfp-square" htmlFor="imageUpload">
                            <img src={profileImage} alt="Profile" />

                        </label>
                    </div>
                    <div className="counter">
                        <h2>{contentCount} posts // {followersCount} følgere // {followingCount} følger</h2>
                    </div>
                </div>

                <div className="square-grid">
                    <div className="square">
                        <div className="mini-square">🔔</div>
                        <div className="option-text">Favoritter</div>
                    </div>
                    <div onClick={handleEditUser} className="square">
                        <div className="mini-square">🔨</div>
                        <div className="option-text">Innstillinger</div>
                    </div>
                    <div className="square">
                        <div className="mini-square">👯</div>
                        <div className="option-text" onClick={handleFriendPage}>Venner</div>
                    </div>
                    <div className="square">
                        <div className="mini-square">🛒</div>
                        <div className="option-text" onClick={handleSharedBooks}>Delte bøker</div>
                    </div>
                </div>

                <div onClick={handleLogOut} className="big-rectangle">
                    <h2 >Logg Ut</h2>
                </div>
            </div>
        );
    } else {
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
                        <input className="log-in-password" type='password'></input>
                    </div>
                    <p>{errorMsg}</p>
                    <button onClick={handleLogin} className="login-button">Logg inn</button>
                    <button onClick={handleCreatePage} className="create-button">Lag bruker</button>
                </div>
            </div>
        );
    }
}
