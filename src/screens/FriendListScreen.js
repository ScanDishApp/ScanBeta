import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import LoadingModal from '../functions/LoadingModual';
import './ScreenStyle/FriendList.css';
import { userManager } from '../functions/user';
import { getFriend, declineFriend, getRequest  } from '../functions/fetch';

export default function Friends() {
    let userId = localStorage.getItem("userId");
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
      
        setIsLoading(true);
        try{
            const response = await getFriend("/friends/get", id);
            const responseData = await response.json();
            setFriendsList(responseData);
        }catch(error){
            alert("Kan ikke hante venner, prøv igjen senere")
            console.error('Error fetching friends:', error);
        }finally{
            setIsLoading(false);
        }
    };

    const handleDeleteFriend = async (id) => {
       
        const status = "removed";
        const request = {
            id: id,
            status: status,
        };

        try {
            const response = await declineFriend("/friends/remove", request);
            const responseData = await response.json();
        } catch (error) {
            alert("Kan ikke fjerne venne, prøv igjen senere")
            console.error('Error deleting friends:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await handleDeleteFriend(id);
            await handleGetFriend(userId);
        } catch (error) {
            alert("Kan ikke fjerne venne, prøv igjen senere")
            console.error('Error deleting friends:', error);
        }
    }

    const handleRequest = async () => {
        navigate('/friend-request-screen');
    };

    const handleGetFriendRequest = async (id) => {
        try{
            const response = await getRequest("/friends/requests", id);
            const responseData = await response.json();
            let waitingRequest = responseData.length
            setFriendRequests(waitingRequest);
        }catch(error){
            alert("Kan ikke hente forespørsler, prøv igjen senere")
            console.error('Error fetching requestes:', error);
        }     
    };

    if (friendRequests > 0) {
        return (
            <div className="friend-container">
                <p className='waiting-request'>{friendRequests}</p>
                <div onClick={handleRequest} className="add-rectangle">
                    <h1>Legg til nye venner!</h1>
                    <span className='request-page-link '>Trykk her for å se om du har noen nye forespørseler</span>
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
                    <span className='request-page-link'>Trykk her for å se om du har noen nye forespørseler</span>

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
