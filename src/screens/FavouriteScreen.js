import React, { useState, useEffect } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineDelete } from 'react-icons/ai';
import { IoHeartDislikeOutline } from "react-icons/io5";
import { getFavorite, deleteFavorite } from '../functions/fetch';
import { useNavigate } from 'react-router-dom';
import LoadingModal from '../functions/LoadingModual';

export default function Favorites() {
    const [content, setContent] = useState([]);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const userId = localStorage.getItem("userId")
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    let favorites = localStorage.getItem("offlineLike");
    favorites = JSON.parse(favorites)

    useEffect(() => {

        const handleGetFavorite = async () => {
            
            setIsLoading(true);
            if (userId) {
                const response = await getFavorite(`/favorite/get?userId=${userId}`);
                if (response.ok) {
                    const responseData = await response.json();
                    let dbFavorite = responseData.dbFavorite
                    setContent(dbFavorite);
                }

            } else {
                if (favorites) {
                    for (let like of favorites) {
                        const response = await getFavorite(`/favorite/getOffline?id=${like.id}`);
                        if (response.ok) {
                            const responseData = await response.json();
                            let dbFavorite = responseData.dbFavorite
                            setContent(dbFavorite);
                        }
                    }
                }else{
                    const bookContent = document.querySelector(".book-content");
                    bookContent.innerHTML = `<p>Ingen favoritter enda.</p>`
                }

            } setIsLoading(false);

        };
        handleGetFavorite();

    }, [userId]);


    useEffect(() => {
        handlePage();
    }, [currentPageIndex]);


    useEffect(() => {
        handlePage();
    }, [content]);

    const handlePage = () => {
        const bookContent = document.querySelector(".book-content");
        if (content.length > 0 && content[currentPageIndex]) {
            let page = content[currentPageIndex].contents;
            page = JSON.parse(page)
            const images = JSON.parse(page.images);
            bookContent.innerHTML = `
                <h1 style="font-family: ${page.selectedFont}; color: ${page.selectedColor};">${page.title}</h1>
                <div class="book-coverImg">
                    <img src="${page.imageFile}" alt="Book Cover" class="coverImg"/>
                </div>
                <h2 style="font-family: ${page.selectedFont}; color: ${page.selectedColor};" class="undertitle" >Ingredienser:</h2>
                <div style="font-family: ${page.selectedFont}; color: ${page.selectedColor};" class="book-ingridens">
                    <ul>
                        ${page.ingridens.split('\n').map(ingredient => `<li>${ingredient.trim()}</li>`).join('')}
                    </ul>
                </div>
                <h2 style="font-family: ${page.selectedFont}; color: ${page.selectedColor};" class="undertitle">Fremgangsmåte:</h2>
                <div style="font-family: ${page.selectedFont}; color: ${page.selectedColor};" class="book-desc">
                    <ul>
                        ${page.desc.split('\n').map(desc => `<li>${desc.trim()}</li>`).join('')}
                    </ul>
                    <div class="book-images">
                        ${images.map((image, index) => (
                `<img
                                key=${index}
                                src=${image.src}
                                alt="Book Image"
                                style="position: absolute; left: ${image.position.x}px; top: ${image.position.y}px; z-index: ${image.zIndex};"
                            />`
            )).join('')}
                    </div>
                `;
        }else{
            const bookContent = document.querySelector(".book-content");
            bookContent.innerHTML = `<p>Ingen favoritter enda.</p>`
        }
    };

    const handlePreviousPage = () => {
        setCurrentPageIndex(prevIndex => Math.max(prevIndex - 1, 0));
    };

    const handleNextPage = () => {
        setCurrentPageIndex(prevIndex => Math.min(prevIndex + 1, content.length - 1));
    };

    const handleFavorite = async () => {
        
        let id = content[currentPageIndex].id
        id = JSON.parse(id)
        const response = await deleteFavorite(`/favorite/${id}`);
        navigate('/favorites-screen');        
    };

    return (
        <div className="myFavorites-container" style={{ textAlign: 'center' }}>
            <LoadingModal isLoading={isLoading} />
            <div className="icon-row" style={{ marginTop: '10px' }}>
                <AiOutlineArrowLeft className="icon" onClick={handlePreviousPage} />
                <IoHeartDislikeOutline className="icon" onClick={handleFavorite} />
                <AiOutlineArrowRight className="icon" onClick={handleNextPage} />

            </div>
            <div className='book-content'></div>
        </div>
    );
}
