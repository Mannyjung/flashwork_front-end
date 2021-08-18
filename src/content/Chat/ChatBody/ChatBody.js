import React from "react";
import "./chatBody.css";
import ChatContent from "../ChatContent/ChatContent";
import { useSelector } from "react-redux"

const ChatBody = () => {
  const room = useSelector(state => state.roomReducer)
  return (
    <>
      <div className="main__chatbody">
        <ChatContent id={room[0].id} Username={room[0].Username} />
      </div>
    </>
  )
}
export default ChatBody