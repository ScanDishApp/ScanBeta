import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import LoadingModal from './LoadingModual';
import './ScreenStyle/FriendList.css';

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

export default function Friends() {
    let userId = localStorage.getItem("userId")
    const navigate = useNavigate();
    const [friendsList, setFriendsList] = useState([]);
    const [friendRequests, setFriendRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            await handleGetFriend(userId);
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            await handleGetFriendRequest(userId);
        };
        fetchData();
    }, []);

    const handleGetFriend = async (id) => {
        async function getFriend(url, data) {
            const paramUrl = `${url}?userId=${data}`;
            return await fetchData(paramUrl, "GET");
        }
        setIsLoading(true);
        const response = await getFriend("/friends/get", id);
        const responseData = await response.json();
        console.log("Response:", responseData);
        setFriendsList(responseData);
        setIsLoading(false);

    };

    const handleDeleteFriend = async (id) => {
        async function declineFriend(url, data) {
            return await fetchData(url, "PUT", data);
        }
        const status = "removed";
        const request = {
            id: id,
            status: status,
        };
        console.log(request);

        try {
            const response = await declineFriend("/friends/remove", request);
            const responseData = await response.json();
            console.log("Response:", responseData);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            console.log("Accepted request with id:", id);
            await handleDeleteFriend(id);
            console.log(id);
            await handleGetFriend(userId);
        } catch (error) {
            console.error("Error:", error);
        }
    }

    const handleRequest = async () => {

        navigate('/friend-request-screen');

    };

    const handleGetFriendRequest = async (id) => {
        async function getRequest(url, data) {
            const paramUrl = `${url}?userId=${data}`;
            return await fetchData(paramUrl, "GET");
        }

        const response = await getRequest("/friends/requests", id);
        const responseData = await response.json();
        let waitingRequest = responseData.length
        setFriendRequests(waitingRequest);
    };

    if (friendRequests > 0) {
        return (
            <div className="friend-container">
                <p className='waiting-request'>{friendRequests}</p>
                <div onClick={handleRequest} className="add-rectangle">
                    <h1>Legg til nye venner!</h1>
                    <span className='hest'>Trykk her for å se om du har noen nye forespørseler</span>
                </div>
                <h1>Mine venner</h1>
                <div className='friends-rectangle'>
                    <ul>
                        {friendsList.map((friend, index) => (
                            <div className='friend'>
                                <h1 className='friend-name'>{friend.name}</h1>
                                <AiOutlineClose className="xIcon" onClick={() => handleDelete(friend.id)} />
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        );
    } else {
        return (
            <div className="friend-container">
            <LoadingModal isLoading={isLoading} />
                <div onClick={handleRequest} className="add-rectangle">
                    
                    <h1>Legg til nye venner!</h1>
                    <span className='hest'>Trykk her for å se om du har noen nye forespørseler</span>

                </div>

                <h1>Mine venner</h1>
                <div className='friends-rectangle'>
                    <ul>
                        {friendsList.map((friend, index) => (
                            <div className='friend'>
                                <h1 className='friend-name'>{friend.name}</h1>
                                <AiOutlineClose className="xIcon" onClick={() => handleDelete(friend.id)} />
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}
