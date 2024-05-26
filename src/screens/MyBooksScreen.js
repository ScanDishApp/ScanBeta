import React, { useState, useEffect } from 'react';
import { IoAdd, IoClose, IoTrash } from 'react-icons/io5';
import { FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import LoadingModal from '../functions/LoadingModual';
import divider from '../assets/divider.png'
import './ScreenStyle/MyBooks.css';
import { listBook ,getPages, createPage, createBook, deletePage, deleteBook} from '../functions/fetch';
import { AiFillEye, AiOutlineEye } from 'react-icons/ai';


export default function MyBooks() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [rectangles, setRectangles] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [titleText, setTitleText] = useState("");
    const userId = localStorage.getItem("userId");
    const [errorMsg, setErrorMsg] = useState(null);

    const getOfflineBooks = () => {
        const books = localStorage.getItem("offlineBooks");
        return books ? JSON.parse(books) : [];
    };

    const [offlineBooks, setOfflineBooks] = useState(getOfflineBooks);

    useEffect(() => {

        async function fetchBooks() {
            setIsLoading(true);
            if (userId) {

                const response = await listBook(`/book/list?userId=${userId}`);
                const responseData = await response.json();
                if (responseData) {
                    const rectanglesFromData = responseData.map((item, index) => ({
                        id: item.id,
                        title: item.title,

                    }));
                    setRectangles(rectanglesFromData);
                } else {

                    const rectangleGrid = document.querySelector(".rectangle-grid");
                    rectangleGrid.innerHTML = `<p>Ingen bøker enda.</p>`
                }

            } else {
                let books = localStorage.getItem("offlineBooks");
                if (books) {
                    books = JSON.parse(books);
                    if (books) {
                        const rectanglesFromData = books.map((item, index) => ({
                            id: item.bookId,
                            title: item.title,

                        }));
                        setRectangles(rectanglesFromData);
                    } else {
                        const rectangleGrid = document.querySelector(".rectangle-grid");
                        rectangleGrid.innerHTML = `<p>Ingen bøker enda.</p>`
                    }
                }
            } setIsLoading(false);
        }
        fetchBooks();
    }, [userId]);

    const addRectangle = async () => {
        if (!titleText.trim()) {
            document.querySelector('.input-text').classList.add('error-border');
            setErrorMsg("Venligst fyll inn tittel!");
            return;
        }

        let contents = "";
        const book = {
            userId: userId,
            contents: contents,
            title: titleText
        };

        const updatedRectangles = [...rectangles, book];
        setRectangles(updatedRectangles);
        setShowModal(false);
        setTitleText("");
        saveRectangles(updatedRectangles);
        await saveToServer(book);
        localStorage.removeItem("lastRecognizedText");
        localStorage.removeItem("previousRecognizedText");
    };

    const deleteRectangle = async (id) => {
        const response = await deleteBookFromServer(id);
        if (response.ok) {
            const responsePage = await deletePageFromServer(id);
            const updatedRectangles = rectangles.filter(rectangle => rectangle.id !== id);
            setRectangles(updatedRectangles);
            saveRectangles(updatedRectangles);
            const updatedOfflineBooks = offlineBooks.filter(book => book.bookId !== id);
            setOfflineBooks(updatedOfflineBooks);
            localStorage.setItem("offlineBooks", JSON.stringify(updatedOfflineBooks));
            console.log("Book deleted successfully from the server:", id);
            setIsLoading(false);
        } else {
            console.log("Error deleting book from the server.");
        }
    };

    const saveToServer = async (book) => {

        try {
            setIsLoading(true);
            const response = await createBook("/book/", book);
            if (response.ok) {
                const responseData = await response.json();
                const responseParse = JSON.parse(responseData);
                localStorage.setItem("bookId", responseParse.id);
                displayRectangleId(responseParse.id);
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
                const responsePageDataParse = JSON.parse(responsePageData);
                localStorage.setItem("pageId", responsePageDataParse.id);

                if (!userId) {
                    const offlineBook = {
                        bookId: responseParse.id,
                        title: responseParse.title,
                        pageId: responsePageDataParse.id

                    };
                    const updatedOfflineBooks = [...offlineBooks, offlineBook];
                    setOfflineBooks(updatedOfflineBooks);
                    localStorage.setItem("offlineBooks", JSON.stringify(updatedOfflineBooks));
                }
            } else {
                console.log("Error saving book to server.");
            }
        } catch (error) {
            console.error("Error saving book to server:", error);
        }
    };

    const deleteBookFromServer = async (id) => {
        try {
            setIsLoading(true);
            const response = await deleteBook(`/book/delete?id=${id}`);
            return response;
        } catch (error) {
            console.error("Error deleting book from server:", error);
        }

    };

    const deletePageFromServer = async (id) => {
        try {
            const response = await deletePage(`/page/delete?bookId=${id}`);
            return response;
        } catch (error) {
            console.error("Error deleting book from server:", error);
        }
    };

    const saveRectangles = (rectangles) => {
        localStorage.setItem('rectangles', JSON.stringify(rectangles));
    };

    const handleSharedBooks = async () => {
        setIsLoading(true);
        navigate('/shared-books');
    };

    const handleLookAtBook = async (id) => {
        setIsLoading(true);
        const response = await getPages(`/page/get?bookId=${id}`);
        if (response.ok) {
            const responseData = await response.json();
            const responseDataParse = JSON.stringify(responseData);
            localStorage.setItem("contents", responseDataParse);
            localStorage.setItem("bookId", id);
            navigate('/look-my-book');
            setIsLoading(false);
        }
    };

    const displayRectangleId = async (id) => {
        localStorage.setItem("bookId", id);
        localStorage.removeItem("lastRecognizedText")
        localStorage.removeItem("previousRecognizedText")
        navigate('/NewPage');
        setIsLoading(false);
    };

    return (
        <div className="myBooks-container">
            <LoadingModal isLoading={isLoading} />
            <h1>Mine Bøker</h1>
            <img src={divider} alt="Divider" style={{ maxHeight: '50px' }} />
            <div className='top-buttons-container'>
                <button className="my-books-button">Alle bøker</button>
                <button className="shared-books-button" onClick={handleSharedBooks}>Delte bøker</button>
                <div className="add-book-button" onClick={() => setShowModal(true)}>
                    <IoAdd />
                </div>
            </div>

            <div className="rectangle-grid">
                {rectangles.map(rectangle => (
                    <div key={rectangle.id} className="rectangle-card" style={{ backgroundColor: rectangle.color }} onClick={(e) => { e.stopPropagation(); displayRectangleId(rectangle.id); }}  >
                        <span>{rectangle.title}</span>
                        <AiFillEye className="look-icon" onClick={(e) => { e.stopPropagation(); handleLookAtBook(rectangle.id); }} />
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
                        <p>{errorMsg}</p>
                        <FaCheck className="check-icon" onClick={addRectangle} />
                    </div>
                </div>
            )}
        </div>
    );
}
