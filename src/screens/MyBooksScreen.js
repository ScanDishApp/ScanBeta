import React, { useState, useEffect } from 'react';
import { IoAdd, IoClose, IoTrash } from 'react-icons/io5';
import { FaPencilAlt, FaCheck } from 'react-icons/fa';
import './ScreenStyle/Home.css';
import './ScreenStyle/MyBooks.css';



export default function MyBooks() {
    const [rectangles, setRectangles] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [titleText, setTitleText] = useState("");

    useEffect(() => {
        const savedRectangles = JSON.parse(localStorage.getItem('rectangles'));
        if (savedRectangles) {
            setRectangles(savedRectangles);
        }
    }, []);

    const addRectangle = () => {
        const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        const newRectangle = {
            id: rectangles.length,
            title: titleText,
            color: randomColor
        };
        setRectangles([...rectangles, newRectangle]);
        setShowModal(false);
        setTitleText("");
        saveRectangles([...rectangles, newRectangle]);
    };

    const deleteRectangle = (id) => {
        const updatedRectangles = rectangles.filter(rectangle => rectangle.id !== id);
        setRectangles(updatedRectangles);
        saveRectangles(updatedRectangles);
    };

    const saveRectangles = (rectangles) => {
        localStorage.setItem('rectangles', JSON.stringify(rectangles));
    };

    return (
        <div className="myBooks-container">
            <h1>Mine Bøker</h1>

            <div className="rectangle-grid">
                {rectangles.map(rectangle => (
                    <div key={rectangle.id} className="rectangle-card" style={{ backgroundColor: rectangle.color }}>
                        <span>{rectangle.title}</span>
                        <FaPencilAlt className="edit-icon" />
                        <IoTrash className="delete-icon" onClick={() => deleteRectangle(rectangle.id)} />
                    </div>
                ))}
            </div>

            <div className={`modal-overlay ${showModal ? 'show' : ''}`} onClick={() => setShowModal(false)}></div>

            <div className="square-button" onClick={() => setShowModal(true)}>
                <IoAdd />
            </div>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <IoClose className="close" onClick={() => setShowModal(false)} />
                        <input
                            type="text"
                            placeholder="Legg til en tittel..."
                            value={titleText}
                            onChange={(e) => setTitleText(e.target.value)}
                            className="input-text"
                        />
                        <FaCheck className="check-icon" onClick={addRectangle} />
                    </div>
                </div>
            )}
        </div>
    );
}
