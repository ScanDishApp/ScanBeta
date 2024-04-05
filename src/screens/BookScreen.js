import React from 'react';
import './ScreenStyle/Book.css'; // Import the external CSS file

export default function Book() {
    const handleDelete = () => {
        // Implement your delete logic here
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
