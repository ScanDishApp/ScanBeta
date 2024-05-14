import React, { useState, useEffect } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineDelete, AiOutlineHeart, AiOutlineSave } from 'react-icons/ai';

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

export default function Favorites() {
    const [content, setContent] = useState([]);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const userId = localStorage.getItem("userId")


    useEffect(() => {

        const handleGetFavorite = async () => {
            async function getFavorite(url) {
                return await fetchData(url, "GET");
            }

            const response = await fetchData(`http://localhost:8080/favorite/get?userId=${userId}`);
            console.log(response);
            const responseData = await response.json();
            const dbFavorite = responseData.dbFavorite
            console.log(dbFavorite);
          setContent(dbFavorite);

        };
        handleGetFavorite();
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
            let page = content[currentPageIndex].contents;
            page = JSON.parse(page)
            console.log(page);
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
                        ${page.images.map((image, index) => (
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
        async function deleteFavorite(url) {
            return await fetchData(url, "DELETE");
        }

        let id = content[currentPageIndex].id
        id = JSON.parse(id)
        console.log(id);
        const response = await deleteFavorite(`https://scanbeta.onrender.com/favorite/${id}`);
        //const response = await deleteFavorite(`http://localhost:8080/favorite/${id}`);

        console.log(response);
    };
   
    return (
        <div className="myFavorites-container" style={{ textAlign: 'center'}}>
         <div className="icon-row" style={{ marginTop: '10px'}}>
                <AiOutlineArrowLeft className="icon" onClick={handlePreviousPage} />
                <AiOutlineDelete className="icon" onClick={handleFavorite} />
                <AiOutlineArrowRight className="icon" onClick={handleNextPage} />
                
            </div>
            <div className='book-content'></div>
        </div>
    );
}
