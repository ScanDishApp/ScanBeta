import React, { useState, useEffect } from 'react';
import { IoAdd, IoClose, IoTrash } from 'react-icons/io5';
import { FaPencilAlt, FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './ScreenStyle/Home.css';
import './ScreenStyle/MyBooks.css';

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
async function listBook(url) {
    return await fetchData(url, "GET");
}
const userId = localStorage.getItem("userId");
const response = await listBook(`http://localhost:8080/book/list?userId=${userId}`, userId);
console.log(response);
const responseData = await response.json();

console.log("Response:", responseData);

export default function MyBooks() {
    const navigate = useNavigate();

    const [rectangles, setRectangles] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [titleText, setTitleText] = useState("");

    useEffect(() => {
        const savedRectangles = JSON.parse(localStorage.getItem('rectangles'));
        if (savedRectangles) {
            setRectangles(savedRectangles);
        }
    }, []);

    const addRectangle = async () => {
        const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        const newRectangle = {
            id: rectangles.length + 1,
            title: titleText,
            color: randomColor
        };

        const updatedRectangles = [...rectangles, newRectangle];
        setRectangles(updatedRectangles);
        setShowModal(false);
        setTitleText("");
        saveRectangles(updatedRectangles);

        await saveToServer(newRectangle);
        console.log("Book added successfully to the server:", newRectangle);
    };

    const deleteRectangle = async (id) => {
        const response = await deleteFromServer(id);
        if (response.ok) {
            const updatedRectangles = rectangles.filter(rectangle => rectangle.id !== id);
            setRectangles(updatedRectangles);
            saveRectangles(updatedRectangles);
            console.log("Book deleted successfully from the server:", id);
        } else {
            console.log("Error deleting book from the server.");
        }
    };

    const saveToServer = async (newRectangle) => {
        try {
            const response = await fetchData("http://localhost:8080/book/", "POST", newRectangle);
            if (response.ok) {
                console.log("Book saved to server successfully:", newRectangle);
            } else {
                console.log("Error saving book to server.");
            }
        } catch (error) {
            console.error("Error saving book to server:", error);
        }
    };

    const deleteFromServer = async (id) => {
        try {
            const response = await fetchData(`http://localhost:8080/book/delete?id=${id}`, "DELETE");
            return response;
        } catch (error) {
            console.error("Error deleting book from server:", error);
        }
    };

    const saveRectangles = (rectangles) => {
        localStorage.setItem('rectangles', JSON.stringify(rectangles));
    };

    const displayRectangleId = async (id) => {
        async function getBook(url) {
            return await fetchData(url, "GET");
        }
       
        const response = await getBook(`http://localhost:8080/book/get?id=${id}`, id);
        console.log(response);
        const responseData = await response.json();
        
        console.log("Response:", responseData);
        
        // Stringify responseData.contents before storing in local storage
        const contentsString = responseData.contents;
        console.log(contentsString);
        localStorage.setItem("contents", contentsString);
        try {
            const contentsArray = JSON.parse(`[${contentsString}]`);
            console.log("contentsArray:", contentsArray);
        } catch (error) {
            console.error("Error parsing contentsString:", error);
        }
        
        
        navigate(`/NewPage?id=${id}`);
    };
    
    let number = 39;
    return (
        <div className="myBooks-container">
            <h1>Mine Bøker</h1>

            <div className="rectangle-grid">
                {rectangles.map(rectangle => (
                    <div key={rectangle.id} className="rectangle-card" style={{ backgroundColor: rectangle.color }} onClick={() => displayRectangleId(number)}>
                        <span>{rectangle.title}</span>
                        <FaPencilAlt className="edit-icon" onClick={(e) => e.stopPropagation()} />
                        <IoTrash className="delete-icon" onClick={(e) => { e.stopPropagation(); deleteRectangle(rectangle.id); }} />
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
