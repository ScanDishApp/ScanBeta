import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import { IoCameraOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom


import addBookIcon from '../../src/assets/addbook.png';

export default function Friends() {
    let userId = localStorage.getItem("userId")
    const navigate = useNavigate();
    const [friendsList, setFriendsList] = useState([]);

    useEffect(() => {
        handleGetFriend(userId);
    }, []);

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
    const handleGetFriendRequest = async (id) => {
        async function getRequest(url, data) {
            const paramUrl = `${url}?userId=${data}`;
            return await fetchData(paramUrl, "GET");
        }
    
        const response = await getRequest("http://localhost:8080/friends/requests", id);
        const responseData = await response.json();
        console.log("Response:", responseData);
        const parsedJson = JSON.stringify(responseData)
        localStorage.setItem("request", parsedJson)
     
    };

    const handleGetFriend = async (id) => {
        async function getFriend(url, data) {
            const paramUrl = `${url}?userId=${data}`;
            return await fetchData(paramUrl, "GET");
        }
    
        const response = await getFriend("http://localhost:8080/friends/get", id);
        const responseData = await response.json();
        console.log("Response:", responseData);
        
        // Update the friendsList state with the fetched data
        setFriendsList(responseData); 
    };


    const handleDeleteFriend = async (id) => {
        async function declineFriend(url, data){
            return await fetchData(url, "PUT", data);
        }
        const status = "removed";
        const request = {
            id: id,
            status: status,
        };
        console.log(request);

        try {
            const response = await declineFriend("http://localhost:8080/friends/remove", request);
            const responseData = await response.json();
            console.log("Response:", responseData);
        } catch(error) {
            console.error("Error:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            console.log("Accepted request with id:", id);
            await handleDeleteFriend(id);
            console.log(id);
        } catch(error) {
            console.error("Error:", error);
        }
    }

        const handleRequest = async () => {
            await handleGetFriendRequest(userId)
            navigate('/friend-request-screen');
            
        };
    
   

        return (
            <div className="friend-container">
                {/* Cover image rectangle */}
                <div onClick={handleRequest} className="cover-rectangle">
                    <h1>Legg til nye venner!</h1>
                </div>
                <h1>Mine venner</h1>
                <ul>
                    {friendsList.map((friend, index) => (
                        <div>
                        <h1>{friend.name}</h1>
                        <AiOutlineClose className="xIcon"  onClick={  () =>   handleDelete(friend.id)} />
                        </div>
                    ))}
                </ul>
            </div>
        );
}
