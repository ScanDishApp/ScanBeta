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

export default function MyBooks() {
    const navigate = useNavigate();
    const [id, setId] = useState([]);
    const [rectangles, setRectangles] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [titleText, setTitleText] = useState("");
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        async function fetchBooks() {
          
            const response = await listBook(`http://localhost:8080/book/list?userId=${userId}`);
            const responseData = await response.json();
            // Construct rectangles array from responseData
            const rectanglesFromData = responseData.map((item, index) => ({
                id: item.id,
                title: item.id,
                color: `#${Math.floor(Math.random() * 16777215).toString(16)}` // Generate random color
            }));
            
            setRectangles(rectanglesFromData);
        }
        fetchBooks();
    }, []);

    const addRectangle = async () => {
        const randomColor 
        = '#' + Math.floor(Math.random() * 16777215).toString(16);
        let contents = "";
        const book = {
            userId: userId,
            contents: contents
        };
    

        const updatedRectangles = [...rectangles, book];
        setRectangles(updatedRectangles);
        setShowModal(false);
        setTitleText("");
        saveRectangles(updatedRectangles);

        await saveToServer(book);
        console.log("Book added successfully to the server:", book);
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

    const saveToServer = async (book) => {
        try {
            const response = await fetchData("http://localhost:8080/book/", "POST", book);
            if (response.ok) {
                const responseData = await response.json();
                const responseParse= JSON.parse(responseData)
                localStorage.setItem("bookId" , responseParse.id )
               displayRectangleId(responseParse.id)
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

    const handleSharedBooks = async () => {
        navigate('/shared-books');
        
    };

    const displayRectangleId = async (id) => {
        async function getBook(url) {
            return await fetchData(url, "GET");
        }
       
        const response = await getBook(`http://localhost:8080/book/get?id=${id}`);
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
        
        localStorage.setItem("bookId" , id )
        navigate(`/NewPage`);

    
    };

    return (
        <div className="myBooks-container">
            <h1>Mine Bøker</h1>
            <div>
                <button>Alle bøker</button>
                <button onClick={handleSharedBooks}>Delte bøker</button>
            </div>
            <div className="rectangle-grid">
                {rectangles.map(rectangle => (
                    <div className="rectangle-card" style={{ backgroundColor: rectangle.color }} onClick={() => displayRectangleId(rectangle.id)}>
                        <span>{rectangle.title}</span>
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
