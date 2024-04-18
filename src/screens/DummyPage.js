import React, { useState } from 'react';
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
    let userId = localStorage.getItem("userId")
    
        const navigate = useNavigate();
        // Dummy data for content, followers, and following
        const contentCount = 20; // Replace with actual count
        const followersCount = 1000; // Replace with actual count
        const followingCount = 500; // Replace with actual count

        const [image, setImage] = useState(null);

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
            navigate('/Profile');
        }
        const handleEditUser = () => {
            navigate('/edit-user-page');
        }
        
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
                navigate('/dummy-page'); // Redirect to DummyPage
            } else {
                setLoggedIn(false);
                // Handle login failure
            }
        };
    
        const handleDelete = async () => {
            async function deleteUser(url) {
                return await fetchData(url, "DELETE");
            }
            let id = localStorage.getItem("userId");
            //const response = await deleteUser(`https://scanbeta.onrender.com/user/${id}`);
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
            //const response = await getUser("https://scanbeta.onrender.com/user/get", id);
            const response = await getUser("http://localhost:8080/user/get", id);
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
            //const response = await updateUser(`https://scanbeta.onrender.com/user/${id}`, user);
            const response = await updateUser(`http://localhost:8080/user/${id}`, user);
            const responseData = await response.json();
            console.log("Response:", responseData);
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
                            <h2>Hei, Kevin</h2>
                        </div>
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

                <div className="big-rectangle">
                    <h2 onClick={handleLogOut}>Logg Ut</h2>
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
                        <input className="log-in-username"></input>
                    </div>
                    <button onClick={handleLogin} className="login-button">Logg inn</button>
                    <button onClick={handleCreatePage} className="create-button">Lag bruker</button>
                </div>
    
    
            </div>
        );
    }
}
