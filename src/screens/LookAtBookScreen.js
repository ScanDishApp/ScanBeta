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
}

export default function LookMyBooks() {
    const [content, setContent] = useState([]);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const userId = localStorage.getItem("userId")

    useEffect(() => {
        const storedContent = localStorage.getItem("contents");
        if (storedContent) {
            setContent(JSON.parse(storedContent));
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
            bookContent.innerHTML = `
                <h1>${page.title}</h1>
                     <div class="book-coverImg">
                    <img src="${page.imageFile}" alt="Book Cover" class="coverImg"/>
                </div>
                <h2 class="undertitle" >Ingredienser:</h2>
                <div class="book-ingridens">${page.ingridens}</div>
                <h2 class="undertitle" >Fremgangsmåte:</h2>
                <div class="book-desc">${page.desc}</div>
                <div class="book-images">
                    ${page.images.map(image => `<img src="${image.src}" alt="Book Image" style="max-width: 50px; max-height: 50px;" />`).join('')}
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
       console.log(like);
       //const response = await createFavorite("https://scanbeta.onrender.com/favorite/", like);
       const response = await createFavorite("http://localhost:8080/favorite/", like);
       
       console.log(response);
    };

    const downloadHtmlAsPDF = () => {
        const bookContent = document.querySelector(".book-content").innerHTML;
        const title = content[currentPageIndex].title;
    
        const contentHTML = `
            <h1>${title}</h1>
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

            <div className="icon-row">
                <AiOutlineArrowLeft className="icon" onClick={handlePreviousPage} />
                <AiOutlineArrowRight className="icon" onClick={handleNextPage} />
                <AiOutlineSave className="icon"  onClick={downloadHtmlAsPDF}/>
                <AiOutlineHeart className="icon"  onClick={handleFavorite}/>
            </div>

            <div className="book-content"></div>
           
        </div>
    );
}
