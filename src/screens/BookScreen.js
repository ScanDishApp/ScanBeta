import React from 'react';
import './ScreenStyle/Book.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();
    const handleDelete = async () => {
        async function deleteBook(url, data) {
            const paramUrl = `${url}?id=${data}`;
            return await fetchData(paramUrl, "DELETE");
        }
        let id = 4;
        const response = await deleteBook("http://localhost:8080/book/delete", id);
        console.log(response);
    };
    const handleGet = async () => {
        async function getBook(url, data) {
            const paramUrl = `${url}?userId=${data}`;
            return await fetchData(paramUrl, "GET");
        }
        let userId = null
        const response = await getBook("http://localhost:8080/book/get", userId);
        console.log(response);
    };
    const handleCreate = async () => {
        async function createBook(url, data) {
            return await fetchData(url, "POST", data);
        }
        let book = null
        const response = await createBook("http://localhost:8080/book/", book);
        console.log(response);
    };

    const handleNewBook = async () => {
        navigate('/bookDesign');
    };



    return (
        <div className="book-container">
            <h1>Mine Bøker</h1>
            <div className="rectangle-grid">
                <div className="rectangle">
                    <button onClick={handleNewBook} className="NewBook">+</button>
                </div>
                <br></br>
                <div className="rectangle">
                    <h2>Bok 1</h2>
                    <button onClick={handleDelete} className="NewBook">Slett</button>
                </div>
            </div>



        </div>
    );
}
