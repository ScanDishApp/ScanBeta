import React, { useState, useEffect } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineHeart, AiOutlineSave } from 'react-icons/ai';

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
          console.log(responseData);

        };
        handleGetFavorite();
    }, []);

    return (
        <div className="myBooks-container">
            <div className='book-content'></div>
        </div>
    );
}
