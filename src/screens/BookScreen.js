import React from 'react';
import './ScreenStyle/Book.css'; 

export default function Book() {
    const handleDelete = () => {
    
        console.log('Delete button clicked');
    };

    return (
        <div className="book-container">
            <h1>BookScreen</h1>

            <div className="rectangle-grid">
                <div className="rectangle">
                    <h2>📚 Book...</h2>
                </div>
            </div>

            <button onClick={handleDelete} className="delete-button">Delete</button>
        </div>
    );
}
