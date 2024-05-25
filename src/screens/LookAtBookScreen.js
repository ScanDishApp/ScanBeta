import React, { useState, useEffect } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineHeart, AiOutlineSave } from 'react-icons/ai';
import html2pdf from 'html2pdf.js';
import './ScreenStyle/LookAtBook.css';

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
};

export default function LookMyBooks() {
    const [content, setContent] = useState([]);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [images, setImages] = useState([]);
    const userId = localStorage.getItem("userId")
    const getOfflineFavorite = () => {
        const like = localStorage.getItem("offlineLike");
        return like ? JSON.parse(like) : [];
    };
    const [offlineFavorites, setofflineFavorites] = useState(getOfflineFavorite);

    useEffect(() => {
        let storedPages = localStorage.getItem("contents");
        if (storedPages) {
            storedPages = JSON.parse(storedPages)
            setContent(storedPages[0]);

        }
    }, []);

    useEffect(() => {
        handlePage();
    }, [currentPageIndex]);

    useEffect(() => {
        handlePage();
    }, [content]);

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
        async function createFavorite(url, data) {
            return await fetchData(url, "POST", data);
        }
        const like = {
            userId: userId,
            contents: content[currentPageIndex],
        };
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
        };
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

    return (
        <div className="myBooks-container">
            <div className="icon-row" style={{ marginTop: '10px' }}>
                <AiOutlineArrowLeft className="icon" onClick={handlePreviousPage} />
                <AiOutlineSave className="icon" onClick={downloadHtmlAsPDF} />
                <AiOutlineHeart className="icon" onClick={handleFavorite} />
                <AiOutlineArrowRight className="icon" onClick={handleNextPage} />
            </div>
            <div className="book-content" >
            </div>
        </div>
    );
}
