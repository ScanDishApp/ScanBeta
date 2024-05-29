import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineBook, AiOutlineTeam, AiFillHeart, AiFillSetting } from 'react-icons/ai';
import LoadingModal from '../functions/LoadingModual';
import logo from '../assets/Logo_Big.png'
import sha256 from '../functions/sha256'
import { getUser, loginUser, getFriend } from '../functions/fetch';
import './ScreenStyle/MyPage.css';

export default function MyPage() {
    let userId = localStorage.getItem("userId");
    let profileName = localStorage.getItem("profileName");
    let profileImg = localStorage.getItem("profileImg");
    const [errorMsg, setErrorMsg] = useState(null);
    const [friendsList, setFriendsList] = useState([]);
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


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
        navigate('/my-page');
    }

    const handleEditUser = () => {
        navigate('/edit-user-page');
    }

    useEffect(() => {
        setProfileImage(profileImg);
    }, []);

    const handleGet = async (id) => {
        try {
            const response = await getUser("/user/get", id);
            const responseData = await response.json();
            let profileName = responseData.name
            localStorage.setItem("profileName", profileName)
            let profileEmail = responseData.email
            localStorage.setItem("profileEmail", profileEmail)
            let profileImg = responseData.img
            localStorage.setItem("profileImg", profileImg)
            setProfileImage(profileImg);
            localStorage.setItem("profileName", profileName)
            let profilePswHash = responseData.pswHash
            localStorage.setItem("profilePswHash", profilePswHash)
        } catch (error) {
            alert("Kan ikke hente bruker, prøv igjen senere")
            console.error('Error fetching user data:', error);
        }

    };

    const handleLogin = async () => {
        const emailInput = document.querySelector('.log-in-email');
        const passwordInput = document.querySelector('.log-in-password');

        const email = emailInput.value;
        let pswHash = passwordInput.value;
        pswHash = await sha256(pswHash);

        const user = {
            pswHash: pswHash,
            email: email
        };

        if (!email.trim()) {
            emailInput.classList.add('error-border');
            setErrorMsg("Venligst fyll inn emailen!");
            return;
        } else {
            emailInput.classList.remove('error-border');
        }

        if (!pswHash.trim()) {
            passwordInput.classList.add('error-border');
            setErrorMsg("Venligst fyll inn passord!");
            return;
        } else {
            passwordInput.classList.remove('error-border');
        }
       
        setIsLoading(true);
        try {
            const response = await loginUser("/user/login", user);
            if (response.status == 401 || response.status == 500) {
                emailInput.classList.add('error-border');
                passwordInput.classList.add('error-border');
                setErrorMsg("Feil brukernavn eller passord!");
            } else {
                passwordInput.classList.remove('error-border');
                emailInput.classList.remove('error-border');
            }
            const responseData = await response.json();
            let userId = responseData.id
            localStorage.setItem("userId", userId)
            navigate('/my-page');
            handleGet(userId)
        } catch (error) {
            alert("Kan ikke logge inn, prøv igjen senere")
            console.error('Error logging in user:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGetFriend = async (id) => {
        try{
            const response = await getFriend("/friends/get", id);
            const responseData = await response.json();
            setFriendsList(responseData.length);
        }catch(error){
            alert("Kan ikke hente venner, prøv igjen senere")
            console.error('Error fetching friends:', error);
        }
      
    };

    useEffect(() => {
        const fetchData = async () => {
            await handleGetFriend(userId);
        };

        fetchData();
    }, []);

    const handleCreatePage = async () => {
        navigate('/new-user-page');

    };
    const handleFavoritePage = async () => {
        navigate('/favorites-screen');

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
                <div className="rectangle-grid-profile">
                    <div className="rectangle">
                        <h2>Velkommen tilbake!</h2>
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
                    <div className="bar-counter">
                        <p>- - //Venner: {friendsList}// - -</p>
                    </div>
                </div>

                <div className="square-grid">
                    <div onClick={handleFavoritePage} className="square">
                        <div className="mini-square">
                            <AiFillHeart className="square-icon" />
                        </div>
                        <div className="option-text">Favoritter</div>
                    </div>
                    <div onClick={handleEditUser} className="square">
                        <div className="mini-square"><AiFillSetting className="square-icon" /></div>
                        <div className="option-text">Innstillinger</div>
                    </div>
                    <div onClick={handleFriendPage} className="square">
                        <div className="mini-square"><AiOutlineTeam className="square-icon" /></div>
                        <div className="option-text">Venner</div>
                    </div>
                    <div onClick={handleSharedBooks} className="square">
                        <div className="mini-square"><AiOutlineBook className="square-icon" /></div>
                        <div className="option-text">Delte bøker</div>
                    </div>
                </div>

                <div onClick={handleLogOut} className="logOut-rectangle">
                    <h2 >Logg Ut</h2>
                </div>
            </div>
        );
    } else {
        return (
            <div className="login-container">
                <LoadingModal isLoading={isLoading} />
                <div className="rectangle-grid">
                    <img src={logo} alt="Logo" style={{ maxHeight: '200px' }} />
                    <br></br>
                    <h1>Logg inn</h1>
                    <div className="login-rectangle">
                        <h2>E-post: </h2>
                        <input className="log-in-email" placeholder='E-postadrese'></input>
                    </div>

                    <br></br>
                    <div className="login-rectangle">
                        <h2>Passord: </h2>
                        <input className="log-in-password" type='password' placeholder='Passord' ></input>
                    </div>

                    <p>{errorMsg}</p>

                    <button onClick={handleLogin} className="login-button" data-placeholder="Logg inn">Logg inn</button>
                    <button onClick={handleCreatePage} className="createUser-button">Lag bruker</button>
                </div>
            </div>
        );
    }
}
