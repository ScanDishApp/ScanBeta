import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import temperatureImage from '../../src/assets/temperature.png';
import addBookIcon from '../../src/assets/addbook.png';
import calkIcon from '../../src/assets/calk.png';
import LoadingModal from './LoadingModual';
import { IoClose } from 'react-icons/io5';
import { FaCheck } from 'react-icons/fa';
import { motion } from 'framer-motion';

const linkStyle = {
    textDecoration: 'none',
    color: 'inherit',
    cursor: 'default',
    display: 'inline-block',
    lineHeight: 'inherit',
};

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

const Home = () => {
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");
    const [showModal, setShowModal] = useState(false);
    const [titleText, setTitleText] = useState("");
    const [errorMsg, setErrorMsg] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    let profileImg = localStorage.getItem("profileImg");
    const getOfflineBooks = () => {
        const books = localStorage.getItem("offlineBooks");
        return books ? JSON.parse(books) : [];
    };

    const [offlineBooks, setOfflineBooks] = useState(getOfflineBooks);

    const addNewBook = async (event) => {
        if (!titleText.trim()) {
            document.querySelector('.input-text').classList.add('error-border');
            setErrorMsg("Venligst fyll inn tittel!");
            return;
        }
        event.preventDefault();

        const openBook = async (id) => {
            async function getPages(url) {
                return await fetchData(url, "GET");
            }
            const response = await getPages(`/page/get?bookId=${id}`);
            if (response.ok) {
                const responseData = await response.json();
                localStorage.setItem("contents", JSON.stringify(responseData));
                localStorage.setItem("bookId", id);
                navigate('/NewPage');
            }
        };

        let contents = "";
        const book = {
            userId: userId,
            contents: contents,
            title: titleText
        };
        setIsLoading(true);
        const response = await fetchData("/book/", "POST", book);
        if (response.ok) {
            const responseData = await response.json();
            const responseParse = JSON.parse(responseData);
            localStorage.setItem("bookId", responseParse.id);
            const page = {
                bookId: responseParse.id,
                title: '',
                ingredients: '',
                imageFile: null,
                desc: '',
                images: [],
                selectedColor: '#000000',
                selectedFont: 'DM Serif Display, serif'
            };

            const responsePage = await fetchData("/page/", "POST", page);
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
                await openBook(responsePageDataParse.id);
            } else {
                await openBook(responsePageDataParse.id);
            }
            setIsLoading(false);
        } else {
            console.log("Error saving book to server.");
        }
    };
if(userId){


    return (
        <motion.div
            className="home-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
        >
            <div className="cover-rectangle">
            <Link to="/dummy-page" style={linkStyle}>
            <img src={profileImg} alt='Profile img' className='profile-img' />
            </Link>
            </div>

            <div className="boxes-container">
                <div className="box1">
                    <Link to="/Calculator" style={linkStyle}>
                        <img src={calkIcon} alt='Add calk' className='add-icon-book' />
                    </Link>
                </div>
                <div className="box2">
                    <Link to="/TemperatureConverter" style={linkStyle}>
                        <img src={temperatureImage} alt='Temperatur' className='add-icon-book' />
                    </Link>
                </div>
            </div>
            <div className="book-rectangle">
                <img src={addBookIcon} alt='Add Book' className='add-icon-book' />
                <div className="nested-rectangle" onClick={() => setShowModal(true)}>
                    LEGG TIL NY BOK
                </div>
            </div>
            <div className={`modal-overlay ${showModal ? 'show' : ''}`} onClick={() => setShowModal(false)}></div>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <IoClose className="close" onClick={() => setShowModal(false)} />
                        <form onSubmit={addNewBook}>
                            <input
                                type="text"
                                placeholder="Legg til en tittel..."
                                value={titleText}
                                onChange={(e) => setTitleText(e.target.value)}
                                className="input-text"
                            />
                            <button type="submit" className="check-icon">
                                <FaCheck />
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </motion.div>
    );
}else{
    return (
        <motion.div
            className="home-container"
            
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
        >   <LoadingModal isLoading={isLoading} />
            <div className="cover-rectangle"></div>

            <div className="boxes-container">
                <div className="box1">
                    <Link to="/Calculator" style={linkStyle}>
                        <img src={calkIcon} alt='Add calk' className='add-icon-book' />
                    </Link>
                </div>
                <div className="box2">
                    <Link to="/TemperatureConverter" style={linkStyle}>
                        <img src={temperatureImage} alt='Temperatur' className='add-icon-book' />
                    </Link>
                </div>
            </div>
            <div className="book-rectangle">
                <img src={addBookIcon} alt='Add Book' className='add-icon-book' />
                <div className="nested-rectangle" onClick={() => setShowModal(true)}>
                    Legg til ny bok 
                </div>
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
                        <FaCheck className="check-icon" onClick={addNewBook} />
                    </div>
                </div>
            )}
        </motion.div>
    ); 
}
};

export default Home;
