import axios from "axios";
import React, { useState, useEffect } from "react";
import Api from "../../../api/Api";
import "./chatList.css";
import Chattitle from './Chattitle'
const ChatList = () => {
  const [allmessage, setallmessage] = useState([])
  const [statusmessage, setstatusmessage] = useState([])

  useEffect(() => {
    let isMounted = true;

    axios.get(Api('showallusermessage') + localStorage.getItem("User_id")
    ).then((res) => {
      if (isMounted) setallmessage(res.data)
    })
    axios.get(Api('showalluserandstatusmessage') + localStorage.getItem("User_id")
    ).then((res) => {
      if (isMounted) setstatusmessage(res.data)
    })
    return () => { isMounted = false };

  }, [])
  return (
    <>
      <div className="main__chatlist">
        <div className="chatlist__items">
          <div className="scoll">
            {allmessage.map((item) => {
              let status = false;
              statusmessage.filter(data => item.Username === data.Username).forEach(usermessage => {
                if (usermessage.status === 'unread') {
                  status = true;
                }
              }
              )
              if (status === true) {
                return <Chattitle
                  key={item.m_id}
                  name={item.Username}
                  image={item.std_image || item.em_image}
                  m_room={item.m_room}
                  status='N'
                />
              } else {
                return <Chattitle
                  key={item.m_id}
                  name={item.Username}
                  image={item.std_image || item.em_image}
                  m_room={item.m_room}
                />
              }
            }
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default ChatList