import React, { useEffect, useState } from 'react';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import LoadingModal from '../functions/LoadingModual';
import { getRequest, sendRequest, addFriend, declineFriend} from '../functions/fetch';
import './ScreenStyle/FriendRequest.css';


export default function FriendRequest() {
    const userId = localStorage.getItem("userId");
    const [friendRequests, setFriendRequests] = useState([]);
    const [successMsg, setSuccessMsg] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            await handleGetFriendRequest(userId);
        };
        fetchData();
    }, []);

    const handleGetFriendRequest = async (id) => {
      
        setIsLoading(true);
        try{
            const response = await getRequest("/friends/requests", id);
            const responseData = await response.json();
            setFriendRequests(responseData);
        }catch(error){
            alert("Kan ikke hente forespørsler, prøv igjen senere")
            console.error('Error fetching requestes:', error);
        }finally{
            setIsLoading(false);
        };

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
            const response = await sendRequest("/friends/add", request);
            const responseData = await response.json();
            setSuccessMsg("Forespørsel sendt");
        } catch (error) {
            alert("Kan ikke legge til venn, prøv igjen senere")
            console.error('Error updating requestes:', error);
        }
    };

    const handleAddFriend = async (id) => {
       
        const status = "friend";
        const request = {
            id: id,
            status: status,
        };

        try {
            const response = await addFriend("/friends/ans", request);
            const responseData = await response.json();
            await handleGetFriendRequest(userId);
        } catch (error) {
            alert("Kan ikke legge til venn, prøv igjen senere")
            console.error('Error updating requestes:', error);
        }
    };

    const handleDeclineFriend = async (id) => {
        const status = "declined";
        const request = {
            id: id,
            status: status,
        };

        try {

            const response = await declineFriend("/friends/ans", request);
            const responseData = await response.json();
            await handleGetFriendRequest(userId);
        } catch (error) {
            alert("Kan ikke fjerne venn, prøv igjen senere")
            console.error('Error updating requestes:', error);
        }

    };

    const handleAccept = async (id) => {
        try {
            await handleAddFriend(id);
        } catch (error) {
            alert("Kan ikke legge til venn, prøv igjen senere")
            console.error('Error updating requestes:', error);
        }
    }

    const handleDecline = async (id) => {
        try {
            await handleDeclineFriend(id);
        } catch (error) {
            alert("Kan ikke fjerne venn, prøv igjen senere")
            console.error('Error updating requestes:', error);
        }
    }

    return (
        <div className="friend-container">
            <LoadingModal isLoading={isLoading} />
            <h1>Forespøsler</h1>
            <div className="add-request-rectangle">
                <h1>Min bruker id: {userId}</h1>

                <input placeholder='Legg til din venns bruker id:' className="friendId-input" ></input>

                <button className='send-button' onClick={handleSendFriendRequest}>Send forespørsel</button>
                <p>{successMsg}</p>
            </div>

            <div className='Request'>
                {
                    friendRequests.map(request => (
                        <div key={request.id} className="friend-request-item">
                            <h3>Navn: {request.name}</h3>
                            <div className='btn-container'>
                                <AiOutlineCheck className="checkIcon" onClick={() => handleAccept(request.id)} />
                                <AiOutlineClose className="xIcon" onClick={() => handleDecline(request.id)} />
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}
