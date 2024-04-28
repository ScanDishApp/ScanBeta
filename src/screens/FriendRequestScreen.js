import React, { useEffect, useState } from 'react';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import addBookIcon from '../../src/assets/addbook.png';

export default function FriendRequest() {
    const [userId, setUserId] = useState(null);
    const [friendRequests, setFriendRequests] = useState([]);
    const navigate = useNavigate();
    let request = localStorage.getItem("request");
    request = JSON.parse(request);
    useEffect(() => {
        setFriendRequests(request);
    }, []);

    useEffect(() => {
        const fetchUserId = async () => {
            const id = localStorage.getItem("userId");
            setUserId(id);
        };
        fetchUserId();
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
            const response = await fetchData("http://localhost:8080/friends/add", "POST", request);
            const responseData = await response.json();
            console.log("Response:", responseData);
            // Handle UI updates or further actions based on the response here
        } catch (error) {
            console.error("Error:", error);
            // Handle errors here
        }
    };
    
    const handleAddFriend = async (id) => {
        async function addFriend(url, data){
            return await fetchData(url, "PUT", data);
        }
        const status = "friend";
        const request = {
            id: id,
            status: status,
        };
        console.log(request);

        try {
            const response = await addFriend("http://localhost:8080/friends/ans", request);
            const responseData = await response.json();
            console.log("Response:", responseData);
        } catch(error) {
            console.error("Error:", error);
            // Handle errors here
        }
    };
    
    const handleDeclineFriend = async (id) => {
        async function declineFriend(url, data){
            return await fetchData(url, "PUT", data);
        }
        const status = "declined";
        const request = {
            id: id,
            status: status,
        };
        console.log(request);

        try {
            const response = await declineFriend("http://localhost:8080/friends/ans", request);
            const responseData = await response.json();
            console.log("Response:", responseData);
        } catch(error) {
            console.error("Error:", error);
        }
    };
    
    
    const handleAccept = async (id) => {
        try {
            console.log("Accepted request with id:", id);
            await handleAddFriend(id);
        } catch(error) {
            console.error("Error:", error);
        }
    }

    const handleDecline = async (id) => {
        try {
            console.log("Accepted request with id:", id);
            await handleDeclineFriend(id);
        } catch(error) {
            console.error("Error:", error);
        }
    }
   
    return (
        <div className="friend-container">
            <div className="cover-rectangle">
                <h1>Min bruker id: {userId}</h1>
                <p>Legg til din venns bruker id</p>
                <input placeholder='Bruker id' className="friendId-input" ></input>
                <button onClick={handleSendFriendRequest}>Send forespørsel</button>
            </div>
            <h1>Forespøsler</h1>
            <div className='Request'>
                {/* Map over friendRequests array and render each request */}
                {  
                    friendRequests.map(request =>  (
                    <div key={request.id} className="friend-request-item">
                        <p>Navn: {request.name}</p>
                        <AiOutlineCheck className="checkIcon"  onClick={() =>   handleAccept(request.id)} />                       
                        <AiOutlineClose className="xIcon" onClick={  () =>   handleDecline(request.id)} />
                    </div>
                ))}
            </div>
        </div>
    );
}
