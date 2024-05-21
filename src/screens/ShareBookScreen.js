import React, { useState, useEffect } from 'react';
import { IoAdd, IoClose, IoTrash } from 'react-icons/io5';
import { FaPencilAlt, FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import divider from '../assets/divider.png'
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

export default function SharedBooks() {
    const navigate = useNavigate();
    const [rectangles, setRectangles] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [titleText, setTitleText] = useState("");
    const [friendsList, setFriendsList] = useState([]);
    const [selectedFriends, setselectedFriends] = useState([]);
    let userId = localStorage.getItem("userId");

    useEffect(() => {
        async function fetchBooks() {

            const response = await listBook(`/book/listShared?userId=${userId}`);
            const responseData = await response.json();
            const rectanglesFromData = responseData.map((item, index) => ({
                id: item.id,
                title: item.title,
                color: `#${Math.floor(Math.random() * 16777215).toString(16)}`
            }));
            setRectangles(rectanglesFromData);
        }
        fetchBooks();
    },);

    useEffect(() => {
        handleGetFriend(userId);
    }, );

    const handleGetFriend = async (id) => {
        async function getFriend(url, data) {
            const paramUrl = `${url}?userId=${data}`;
            return await fetchData(paramUrl, "GET");
        }
        const response = await getFriend("/friends/get", id);
        const responseData = await response.json();
        setFriendsList(responseData); 
    };

    const addRectangle = async (id) => {
       
        let contents = "";
        const userIdWithFriends = `${userId},${selectedFriends.map(friend => friend.userId).join(',')}`;
        const book = {
            userId: userIdWithFriends,
            contents: contents,
            title: titleText
        };

        const updatedRectangles = [...rectangles, book];
        setRectangles(updatedRectangles);
        setShowModal(false);
        setTitleText("");
        saveRectangles(updatedRectangles);

        await saveToServer(book);
        localStorage.removeItem("lastRecognizedText")
        localStorage.removeItem("previousRecognizedText")
        console.log("Book added successfully to the server:", book);
    };

    const deleteRectangle = async (id) => {
        const response = await deleteBookFromServer(id);
        if (response.ok) {
            const response = await deletePageFromServer(id);
            console.log(response);
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
            const response = await fetchData("/book/", "POST", book);
            if (response.ok) {
                const responseData = await response.json();
                const responseParse = JSON.parse(responseData)
                localStorage.setItem("bookId", responseParse.id)
                displayRectangleId(responseParse.id)
                const page = {
                    bookId: responseParse.id,
                    title: '',
                    ingridens: '',
                    imageFile: null,
                    desc: '',
                    images: JSON.stringify([]),
                    selectedColor: '#000000',
                    selectedFont: 'DM Serif Display, serif'

                };
                const responsePage = await fetchData("/page/", "POST", page);
                const responsePageData = await responsePage.json();
                const responsePageDataParse = JSON.parse(responsePageData)
                localStorage.setItem("pageId", responsePageDataParse.id)
            } else {
                console.log("Error saving book to server.");
            }
        } catch (error) {
            console.error("Error saving book to server:", error);
        }
    };

    const deleteBookFromServer = async (id) => {
        try {
            const response = await fetchData(`/book/delete?id=${id}`, "DELETE");
            return response 

        } catch (error) {
            console.error("Error deleting book from server:", error);
        }
    };
    const deletePageFromServer = async (id) => {
        try {
            const response = await fetchData(`/page/delete?bookId=${id}`, "DELETE");
            return response 

        } catch (error) {
            console.error("Error deleting book from server:", error);
        }
    };

    const saveRectangles = (rectangles) => {
        localStorage.setItem('rectangles', JSON.stringify(rectangles));
    };




    const handleLookAtBook = async (id) => {
        async function getBook(url) {
            return await fetchData(url, "GET");
        }

        const response = await getBook(`/page/get?bookId=${id}`);
        console.log(response);
        const responseData = await response.json();

        console.log("Response:", responseData);
        localStorage.setItem("contents", responseData);
        try {
            const contentsArray = JSON.parse(responseData);
            console.log("contentsArray:", contentsArray);
            localStorage.setItem("contentsArray", contentsArray);
        } catch (error) {
            console.error("Error parsing contentsString:", error);
        }
        navigate('/look-my-book');

    };
    
    const displayRectangleId = async (id) => {
        async function getPages(url) {
            return await fetchData(url, "GET");
        }
        const response = await getPages(`/page/get?bookId=${id}`);
        console.log(response);
        if (response.ok) {
            const responseData = await response.json();
            const responseDataParse = JSON.stringify(responseData)
            console.log(responseData);
            localStorage.setItem("contents", responseDataParse);
            localStorage.setItem("bookId", id)
            navigate('/NewPage');
        }

    };

    const handleFriendSelection = (e) => {
        const selectedFriendId = e.target.value;
        const selectedFriend = friendsList.find(friend => friend.userId === selectedFriendId);
        if (selectedFriend) {
            setselectedFriends([...selectedFriends, selectedFriend]);
        }
    };

    const handleMyBooks = async () => {
        navigate('/MyBooks');
    };

    return (
        <div className="myBooks-container">
            <h1>Delte Bøker</h1>
            <img src={divider} alt="Divider" style={{ maxHeight: '50px' }} />
            <div className='top-buttons-container'>
                <button className="my-books-button" onClick={handleMyBooks}>Alle bøker</button>
                <button className="shared-books-button" >Delte bøker</button>
                <div className="add-book-button" onClick={() => setShowModal(true)}>
                <IoAdd />
            </div>

            </div>
            <div className="rectangle-grid">
                {rectangles.map(rectangle => (
                     <div className="rectangle-card" style={{ backgroundColor: '#def294' }} onClick={() => handleLookAtBook(rectangle.id)}>
                        <span>{rectangle.title}</span>
                        <FaPencilAlt className="edit-icon" onClick={(e) => { e.stopPropagation(); displayRectangleId(rectangle.id); }} />
                        <IoTrash className="delete-icon" onClick={(e) => { e.stopPropagation(); deleteRectangle(rectangle.id); }} />
                    </div>
                ))}
            </div>

            <div className={`modal-overlay ${showModal ? 'show' : ''}`} onClick={() => setShowModal(false)}></div>

           
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
                        <select onChange={handleFriendSelection}>
                            <option value="">Velg venn</option>
                            {friendsList.map(friend => (
                                <option key={friend.userId} value={friend.userId}>{friend.name}</option>

                            ))}
                        </select>
                        <FaCheck className="check-icon" onClick={addRectangle} />
                    </div>
                </div>
            )}
        </div>
    );
}
