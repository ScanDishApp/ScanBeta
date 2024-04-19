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
    const [errorMsg, setErrorMsg] = useState(null); // State for error message


    const navigate = useNavigate();
    // Dummy data for content, followers, and following
    const contentCount = 20; // Replace with actual count
    const followersCount = 1000; // Replace with actual count
    const followingCount = 500; // Replace with actual count

    const [image, setImage] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    console.log("Profile Image URL:", profileImage);
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
        //const response = await loginUser("https://scanbeta.onrender.com/user/login", user);
        const response = await loginUser("http://localhost:8080/user/login", user);

        if (response.status !== 200) {
            setErrorMsg("Feil brukernavn eller passord!"); // Update error message state
            console.log(errorMsg);
        } else {
            setErrorMsg(null); // Clear error message if login is successful
        }

        const responseData = await response.json();
        console.log("Response:", responseData);
        let userId = responseData.id
        localStorage.setItem("userId", userId)
        let profileName = responseData.name
        localStorage.setItem("profileName", profileName) 
        let profileEmail = responseData.email
        localStorage.setItem("profileEmail", profileEmail)
        let profileImg = responseData.img
        console.log(profileImg);
        localStorage.setItem("profileImg", profileImg)
        setProfileImage(profileImg);
        

        navigate('/dummy-page'); // Redirect to DummyPage

    };

    const handleCreatePage = async () => {
        navigate('/new-user-page');
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
                        <div className="option-text">Varsler</div>
                    </div>
                    <div className="square">
                        <div className="mini-square">👯</div>
                        <div className="option-text">Venner</div>
                    </div>
                    <div className="square">
                        <div className="mini-square">🛒</div>
                        <div className="option-text">Notis 3</div>
                    </div>
                    <div onClick={handleEditUser} className="square">
                        <div className="mini-square">🔨</div>
                        <div className="option-text">Innstillinger</div>
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
