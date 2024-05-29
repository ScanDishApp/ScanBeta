import React, { useState, useEffect } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import {  FiDownload } from "react-icons/fi";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import html2pdf from 'html2pdf.js';
import { createFavorite } from '../functions/fetch';
import './ScreenStyle/LookAtBook.css';
import { getPages } from '../functions/fetch';
import { bookManager } from '../functions/book';
import { pageManager } from '../functions/page';
import { userManager } from '../functions/user';
import LoadingModal from '../functions/LoadingModual';



export default function LookMyBooks() {
    const [content, setContent] = useState([]);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [images, setImages] = useState([]);
    const [isFavorited, setIsFavorited] = useState(false); 
    const [isLoading, setIsLoading] = useState(false);

    const userId = userManager.id;
    
    const getOfflineFavorite = () => {
        const like = localStorage.getItem("offlineLike");
        return like ? JSON.parse(like) : [];
    };
    const [offlineFavorites, setofflineFavorites] = useState(getOfflineFavorite);

    useEffect(() => {
        let bookId = bookManager.id;
        handleGetPages(bookId)
    
    }, []);

    useEffect(() => {
        handlePage();
        checkIfFavorited(); 
    }, [currentPageIndex]);

    useEffect(() => {
        handlePage();
        checkIfFavorited(); 
    }, [content]);

    const handleGetPages = async (id) => {
        setIsLoading(true);
        try{
            const response = await getPages(`/page/get?bookId=${id}`);
            if (response.ok) {
                const responseData = await response.json();
                setContent(responseData[0])
                
            }
        }catch(error){
            alert("Kan ikke åpne book, prøv igjen senere")
            console.error('Error fethcing page:', error);
        }finally{
            setIsLoading(false);
        }
       
    };

    const handlePage = () => {
        const bookContent = document.querySelector(".book-content");
        if (content.length > 0 && content[currentPageIndex]) {
            const page = content[currentPageIndex];
            const images = JSON.parse(page.images)
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
        }
    };

    const handlePreviousPage = () => {
        setCurrentPageIndex(prevIndex => Math.max(prevIndex - 1, 0));
    };

    const handleNextPage = () => {
        setCurrentPageIndex(prevIndex => Math.min(prevIndex + 1, content.length - 1));
    };

    const handleFavorite = async () => {
       
        const like = {
            userId: userId,
            contents: content[currentPageIndex],
        };
        try{
            const response = await createFavorite("/favorite/", like);
            let responseData = await response.json();
            responseData = JSON.parse(responseData)
    
            if (response.ok) {
                if (!userId) {
                    const offlineLike = {
                        id: responseData.id,
                    };
                    const updatedofflineFavorites = [...offlineFavorites, offlineLike];
                    setofflineFavorites(updatedofflineFavorites);
                    localStorage.setItem("offlineLike", JSON.stringify(updatedofflineFavorites));
                };
                setIsFavorited(true); 
            };
        }catch(error){
            alert("Kan ikke lagre som favoritter, prøv igjen senere")
            console.error('Error creating favorites:', error);
        }
        
    };

    const checkIfFavorited = () => {
        const currentContent = content[currentPageIndex];
        const isCurrentlyFavorited = offlineFavorites.some(fav => fav.id === currentContent.id);
        setIsFavorited(isCurrentlyFavorited);
    };

    const downloadHtmlAsPDF = () => {
        const bookContent = document.querySelector(".book-content").innerHTML;

        const contentHTML = `
            <div>${bookContent}</div>
        `;

        const opt = {
            margin: 0.5,
            filename: 'my_books.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        html2pdf().from(contentHTML).set(opt).save();
    };

    if (isFavorited) {
        return (
            
            <div className="myBooks-container">
             <LoadingModal isLoading={isLoading} />
                <div className="icon-row" style={{ marginTop: '10px' }}>
                    <AiOutlineArrowLeft className="icon" onClick={handlePreviousPage} />
                    <FiDownload className="icon" onClick={downloadHtmlAsPDF} />
                    <FaBookmark className="icon" onClick={handleFavorite} />
                    <AiOutlineArrowRight className="icon" onClick={handleNextPage} />
                </div>
                <div className="book-content" >
                </div>
            </div>
        );
    } else {
        return (
            <div className="myBooks-container">
             <LoadingModal isLoading={isLoading} />
                <div className="icon-row" style={{ marginTop: '10px' }}>
                    <AiOutlineArrowLeft className="icon" onClick={handlePreviousPage} />
                    <FiDownload className="icon" onClick={downloadHtmlAsPDF} />
                    <FaRegBookmark className="icon" onClick={handleFavorite} />
                    <AiOutlineArrowRight className="icon" onClick={handleNextPage} />
                </div>
                <div className="book-content" >
                </div>
            </div>
        );
    }


}
