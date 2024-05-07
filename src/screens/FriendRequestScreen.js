import React, { useEffect, useState } from 'react';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import addBookIcon from '../../src/assets/addbook.png';
import './ScreenStyle/FriendRequest.css';

export default function FriendRequest() {
    const userId = localStorage.getItem("userId");
    const [friendRequests, setFriendRequests] = useState([]);
    const [successMsg, setSuccessMsg] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            await handleGetFriendRequest(userId);
        };
        fetchData();
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

        const response = await getRequest("https://scanbeta.onrender.com/friends/requests", id);
        //const response = await getRequest("http://localhost:8080/friends/requests", id);

        const responseData = await response.json();
        setFriendRequests(responseData);


    };

    const handleSendFriendRequest = async () => {
        const userId = localStorage.getItem("userId");
        const name = localStorage.getItem("profileName");
        const friendId = document.querySelector('.friendId-input').value;
        const status = "pending";
        const request = {
            userId: userId,
            friendId: friendId,
            status: status,
            name: name
        };

        try {
            const response = await fetchData("https://scanbeta.onrender.com/friends/add", "POST", request);
            //const response = await fetchData("http://localhost:8080/friends/add", "POST", request);
            const responseData = await response.json();
            console.log("Response:", responseData);
            setSuccessMsg("Forespørsel sendt");
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleAddFriend = async (id) => {
        async function addFriend(url, data) {
            return await fetchData(url, "PUT", data);
        }
        const status = "friend";
        const request = {
            id: id,
            status: status,
        };
        console.log(request);

        try {
            const response = await addFriend("https://scanbeta.onrender.com/friends/ans", request);
            // const response = await addFriend("http://localhost:8080/friends/ans", request);
            const responseData = await response.json();
            console.log("Response:", responseData);
            await handleGetFriendRequest(userId);
        } catch (error) {
            console.error("Error:", error);
        }

    };

    const handleDeclineFriend = async (id) => {
        async function declineFriend(url, data) {
            return await fetchData(url, "PUT", data);
        }
        const status = "declined";
        const request = {
            id: id,
            status: status,
        };
        console.log(request);

        try {

            const response = await declineFriend("https://scanbeta.onrender.com/friends/ans", request);
            //const response = await declineFriend("http://localhost:8080/friends/ans", request);
            const responseData = await response.json();
            console.log("Response:", responseData);
            await handleGetFriendRequest(userId);
        } catch (error) {
            console.error("Error:", error);
        }

    };

    const handleAccept = async (id) => {
        try {
            console.log("Accepted request with id:", id);
            await handleAddFriend(id);
        } catch (error) {
            console.error("Error:", error);
        }
    }

    const handleDecline = async (id) => {
        try {
            console.log("Accepted request with id:", id);
            await handleDeclineFriend(id);
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return (
        <div className="friend-container">
            <h1>Forespøsler</h1>
            <div className="add-request-rectangle">
                <h1>Min bruker id: {userId}</h1>
                <div className='input-rectangle'>
                    <input placeholder='Legg til din venns bruker id:' className="friendId-input" ></input>
                </div>
                <button className='send-button' onClick={handleSendFriendRequest}>Send forespørsel</button>
                <p>{successMsg}</p>
            </div>

            <div className='Request'>
                {
                    friendRequests.map(request => (
                        <div key={request.id} className="friend-request-item">
                            <h3>Navn: {request.name}</h3>
                            <AiOutlineCheck className="checkIcon" onClick={() => handleAccept(request.id)} />
                            <AiOutlineClose className="xIcon" onClick={() => handleDecline(request.id)} />
                        </div>
                    ))}
            </div>
        </div>
    );
}
