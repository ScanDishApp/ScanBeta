import React, { useState, useEffect } from 'react';
import { IoAdd, IoClose, IoTrash } from 'react-icons/io5';
import { FaPencilAlt, FaCheck } from 'react-icons/fa';
import LoadingModal from '../functions/LoadingModual';
import { useNavigate } from 'react-router-dom';
import { listBook, getFriend, createBook, deleteBook, getPages, createPage, getBook, deletePage } from '../functions/fetch';
import divider from '../assets/divider.png'
import './ScreenStyle/MyBooks.css';

export default function SharedBooks() {
    const navigate = useNavigate();
    const [rectangles, setRectangles] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [titleText, setTitleText] = useState("");
    const [friendsList, setFriendsList] = useState([]);
    const [selectedFriends, setselectedFriends] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    let userId = localStorage.getItem("userId");

    useEffect(() => {
        async function fetchBooks() {
            setIsLoading(true);
            if (userId) {
                try {
                    const response = await listBook(`/book/listShared?userId=${userId}`);
                    const responseData = await response.json();

                    const rectanglesFromData = responseData.map((item, index) => ({
                        id: item.id,
                        title: item.title,
                        color: `#${Math.floor(Math.random() * 16777215).toString(16)}`
                    }));
                    setRectangles(rectanglesFromData);
                } catch (error) {
                    alert("Kan ikke hente bøker, prøv igjen senere")
                    console.error('Error fetching books:', error);
                } finally {
                    setIsLoading(false);
                }
            }
        }
        fetchBooks();

    }, [userId]);

    useEffect(() => {
        handleGetFriend(userId);
    },);

    const handleGetFriend = async (id) => {
        try {
            const response = await getFriend("/friends/get", id);
            const responseData = await response.json();
            setFriendsList(responseData);
        } catch (error) {
            alert("Kan ikke hente venner, prøv igjen senere")
            console.error('Error fetching friends:', error);
        }
    };

    const addRectangle = async (id) => {
        if (userId) {
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
        } else {
            const rectangleGrid = document.querySelector(".rectangle-grid");
            rectangleGrid.innerHTML = `<p>Logg inn for å bruke denne funksjonen.</p>`
            setShowModal(false);
        }
    };

    const deleteRectangle = async (id) => {
        const response = await deleteBookFromServer(id);
        if (response.ok) {
            const response = await deletePageFromServer(id);
            const updatedRectangles = rectangles.filter(rectangle => rectangle.id !== id);
            setRectangles(updatedRectangles);
            saveRectangles(updatedRectangles);
        }
    };

    const saveToServer = async (book) => {
        try {
            const response = await createBook("/book/", book);
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
                const responsePage = await createPage("/page/", page);
                const responsePageData = await responsePage.json();
                const responsePageDataParse = JSON.parse(responsePageData)
                localStorage.setItem("pageId", responsePageDataParse.id)
            }
        } catch (error) {
            alert("Kan ikke lagre bok, prøv igjen senere")
            console.error('Error saving book:', error);
        }
    };

    const deleteBookFromServer = async (id) => {
        try {
            const response = await deleteBook(`/book/delete?id=${id}`);
            return response

        } catch (error) {
            alert("Kan ikke slette bok, prøv igjen senere")
            console.error("Error deleting book from server:", error);
        }
    };
    const deletePageFromServer = async (id) => {
        try {
            const response = await deletePage(`/page/delete?bookId=${id}`);
            return response

        } catch (error) {
            alert("Kan ikke slette bok, prøv igjen senere")
            console.error("Error deleting book from server:", error);
        }
    };

    const saveRectangles = (rectangles) => {
        localStorage.setItem('rectangles', JSON.stringify(rectangles));
    };

    const handleLookAtBook = async (id) => {


        const response = await getBook(`/page/get?bookId=${id}`);
        const responseData = await response.json();
        localStorage.setItem("contents", responseData);
        try {
            const contentsArray = JSON.parse(responseData);
            localStorage.setItem("contentsArray", contentsArray);
        } catch (error) {
            console.error("Error parsing contentsString:", error);
        }
        navigate('/look-my-book');

    };

    const displayRectangleId = async (id) => {

        const response = await getPages(`/page/get?bookId=${id}`);
        if (response.ok) {
            const responseData = await response.json();
            const responseDataParse = JSON.stringify(responseData)
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
            <LoadingModal isLoading={isLoading} />
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
