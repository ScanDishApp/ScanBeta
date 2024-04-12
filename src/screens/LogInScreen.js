import React, { useEffect } from 'react';
import { IoCameraOutline } from 'react-icons/io5';
import { useHistory } from 'react-router-dom'; // Import useHistory from react-router-dom
import './ScreenStyle/Home.css';

export default function Login() {
    const history = useHistory();

    useEffect(() => {
        // Check if user is already logged in
        const userId = localStorage.getItem("userId");
        if (userId) {
            // Redirect to Profile or any other route if user is already logged in
            history.push("/LogIn");
        }
    }, []); // Ensure this effect runs only once when the component mounts

    return (
        <div className="home-container"> {/* Corrected the typo in className */}
            <h1>ScanDish</h1>

            <div className="rectangle-grid">
                <div className="rectangle">
                    <h2>👋 Login...</h2>
                </div>
            </div>

            <div className="square-grid">
                <div className="square">
                    <div className="mini-square">⭐️</div>
                    <div className="option-text">Favoritter 1</div>
                </div>
                <div className="square">
                    <div className="mini-square">👨‍🍳</div>
                    <div className="option-text">Chef 2</div>
                </div>
                <div className="square">
                    <div className="mini-square">🛒</div>
                    <div className="option-text">Notis 3</div>
                </div>
                <div className="square">
                    <div className="mini-square">🧮</div>
                    <div className="option-text">Kalkulator 4</div>
                </div>
            </div>

            <div className="big-rectangle">
                <IoCameraOutline size={48} />
            </div>
        </div>
    );
}
