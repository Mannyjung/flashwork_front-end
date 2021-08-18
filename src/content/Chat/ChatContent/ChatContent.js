import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from 'uuid';
import "./Content.css";
import io from "socket.io-client"
import { Card, CardBody, ToastBody, Input, Button } from "reactstrap";
// import Moment from 'react-moment';
// import 'moment-timezone';
const User_id = localStorage.getItem('User_id')


const ChatContent = ({ id, Username }) => {
  let defmsg = ""
  const [msg, setmsg] = useState(defmsg)
  const [oldchat, setoldchat] = useState([])
  const [countdata, setcountdata] = useState(20)
  const socketRef = useRef()
  const messagesEndRef = useRef()

  useEffect(() => {
    if (id !== null) {
      socketRef.current = io.connect("https://serverchat-flaswork.herokuapp.com/")
      socketRef.current.emit("joinroom", id)

      socketRef.current.on("message", (result) => {
        let data = result
        data.sort().reverse()
        setoldchat(data)
        scrollToBottom()
      })

      return () => socketRef.current.disconnect()
    }
  }, [id])



  const history = () => {
    let data = countdata + 5
    setcountdata(data)
    socketRef.current.emit("history", { countdata })
  }


  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView()
  }
  const onStateChange = (e) => {
    const toUser_id = Username
    const message = msg
    if (message === "") {
      e.preventDefault()
      setmsg(defmsg)
    } else {
      socketRef.current.emit("message", { User_id, toUser_id, message })
      e.preventDefault()
      setmsg(defmsg)
    }
  };

  if (id !== null) {

    return (
      <>
        <CardBody>

          <ToastBody className="Chat">

            {oldchat.map((oldchat) => {

              return (

                <Card style={{ backgroundColor: "#ffe0b2", marginTop: "8px" }} key={uuidv4()} >
                  <h6 className="pl-3 pt-3"><b style={{ color: 'red' }}>ชื่อผู้ใช้ : {oldchat.Username}</b><p className="pt-3"> ข้อความ : {oldchat.m_message}
                    {/* <p style={{ fontSize: 13, marginLeft: "75%" }}>
                      <br></br>
                      <Moment format="HH:mm DD/MM/YYYY" style={{ color: "gray" }}>
                        {oldchat.m_time}
                      </Moment></p> */}
                  </p></h6>
                  <div ref={messagesEndRef} />

                </Card>
              )
            })
            }

          </ToastBody>
          <Button onClick={history} color="link" style={{ float: 'right', fontSize: 15, color: 'gray' }}>ดูข้อความก่อนหน้า</Button>
          <br />
          <form onSubmit={onStateChange}>

            <Input
              className="fixinput"
              type="text"
              placeholder="พิมพ์ข้อความ"
              onChange={e => setmsg(e.target.value)}
              value={msg}

            />
          </form>
        </CardBody>
      </>
    )
  } else {
    return (
      <>
      </>
    )
  }
}
export default ChatContent