import React from 'react';
import './ScreenStyle/Book.css'; 
async function fetchData(url, method, data) {
    const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*" // Legg til denne linjen for å tillate forespørsler fra alle domener
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

export default function Book() {
    const handleDelete = async () => {
        async function deleteBook(url , data) {
            const paramUrl = `${url}?id=${data}`;
            return await fetchData(paramUrl, "DELETE");
        }
        let id = 4;
        const response = await deleteBook("http://localhost:8080/book/delete", id);
        console.log(response);
    };
    

    return (
        <div className="book-container">
            <h1>BookScreen</h1>

            <div className="rectangle-grid">
                <div className="rectangle">
                    <h2>📚 Book...</h2>
                </div>
            </div>

            <button onClick={handleDelete} className="delete-button">Delete</button>
        </div>
    );
}
