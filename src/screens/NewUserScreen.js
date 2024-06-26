import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ScreenStyle/NewUser.css';
import defaultImage from '../assets/xug.png';
import LoadingModal from '../functions/LoadingModual';
import logo from '../assets/Logo_Big.png'
import sha256 from '../functions/sha256'
import { userManager } from '../functions/user';
import { getUser, createUser } from '../functions/fetch';


export default function NewUser() {
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
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

        try{
            const response = await getUser("/user/get", id);
            const responseData = await response.json();
            let profileName = responseData.name
            userManager.setName(profileName)
            let profileEmail = responseData.email

            userManager.setEmail(profileEmail)

           let profilePswHash = responseData.pswHash
         userManager.setPsw(profilePswHash)

            let profileImg = responseData.img
            userManager.setImg(profileImg)
            setProfileImage(profileImg);
        }catch(error){
            alert("Kan ikke hente bruker, prøv igjen senere")
            console.error('Error fethcing user:', error);  
        }
    };

    const handleCreate = async () => {
        const nameInput = document.querySelector('.create-username');
        const passwordInput = document.querySelector('.create-password');
        const emailInput = document.querySelector('.create-email');
        let pswHash = passwordInput.value;
        pswHash = await sha256(pswHash);

        const email = emailInput.value;
        const name = nameInput.value;

        let img = image;

        if (!img) {
            img = defaultImage;
        }

        if (!name.trim()) {
            nameInput.classList.add('error-border');
            setErrorMsg("Venligst fyll inn brukernavn!");
            return;
        } else {
            nameInput.classList.remove('error-border');
        }

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

        const user = {
            name: name,
            pswHash: pswHash,
            email: email,
            img: img
        };

        setIsLoading(true);
        try{
            const response = await createUser("/user/", user);
            if (response.status == 500) {
                passwordInput.classList.add('error-border');
                setErrorMsg("Email er allerede i bruk");
                setIsLoading(false);
                return;
            }
            const responseData = await response.json();
            let userId = responseData.id
            userManager.setId(userId)
            await handleGet(userId)
            navigate('/my-page')
            
        }catch(error){
            alert("Kan ikke lage bruker, prøv igjen senere")
            console.error('Error creating user:', error); 
        }finally{
            setIsLoading(false);
        }
    };

    return (
        <div className="create-user-container">
            <LoadingModal isLoading={isLoading} />
            <img src={logo} alt="Logo" style={{ maxHeight: '200px' }} />
            <div className="create-user-grid">
                <br></br>
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
