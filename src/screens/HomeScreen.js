import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import temperatureImage from '../../src/assets/temperature.png';
import addBookIcon from '../../src/assets/addbook.png';
import calkIcon from '../../src/assets/calk.png';
import LoadingModal from '../functions/LoadingModual';
import { IoClose } from 'react-icons/io5';
import { FaCheck } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { userManager } from '../functions/user';
import { bookManager } from '../functions/book';
import { pageManager } from '../functions/page';
import { getPages, createBook, createPage } from '../functions/fetch';

const linkStyle = {
    textDecoration: 'none',
    color: 'inherit',
    cursor: 'default',
    display: 'inline-block',
    lineHeight: 'inherit',
};


const Home = () => {
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");
    const [showModal, setShowModal] = useState(false);
    const [titleText, setTitleText] = useState("");
    const [errorMsg, setErrorMsg] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    let profileImg = userManager.img;
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
            try {
                const response = await getPages(`/page/get?bookId=${id}`);
                if (response.ok) {
                    const responseData = await response.json();
                    localStorage.setItem("contents", JSON.stringify(responseData));
                    bookManager.setId(id)
                    navigate('/NewPage');
                }
            } catch (error) {
                alert("Kan ikke åpne book, prøv igjen senere")
                console.error('Error fethcing page:', error);
            }

        };

        let contents = "";
        const book = {
            userId: userId,
            contents: contents,
            title: titleText
        };
        setIsLoading(true);
        try {
            const response = await createBook("/book/", book);
            if (response.ok) {
                const responseData = await response.json();
                const responseParse = JSON.parse(responseData);
                bookManager.setId(responseParse.id)
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

                const responsePage = await createPage("/page/", page);
                const responsePageData = await responsePage.json();
                const responsePageDataParse = JSON.parse(responsePageData);
                pageManager.setId(responsePageDataParse.id)

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

            } else {
                console.log("Error saving book to server.");
            }
        } catch (error) {
            alert("Kan ikke lage book, prøv igjen senere")
            console.error('Error creating book:', error);
        } finally {
            setIsLoading(false);
        }
    };
    if (userId) {
        return (
            <motion.div
                className="home-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: 'easeInOut' }}
            >
                <div className="cover-rectangle">
                    <Link to="/my-page" style={linkStyle}>
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
    } else {
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
