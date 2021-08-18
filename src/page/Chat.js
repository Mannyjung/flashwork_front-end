import React from 'react';
import '../css/link.css';
import '../css/regfree.css';
import ChatList from '../content/Chat/ChatList/ChatList';
import "../css/Chat.css";
import ChatBody from '../content/Chat/ChatBody/ChatBody';


const Chat = () => {
    if (localStorage.getItem('User_id') == null) {

      
        window.location.assign("/login2")

   
}
else {
    return (
        <>
            <div id="black">
                <div className="__main mt-5">
                    <ChatList />
                    <ChatBody />
                </div>
            </div>
        </>
    );}
}

export default Chat