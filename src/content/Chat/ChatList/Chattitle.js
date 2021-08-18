import React from 'react'
import axios from "axios";
import "./chatList.css";
import { useDispatch } from 'react-redux'
import { Badge } from '@material-ui/core';
import Api from '../../../api/Api';

const Chattitle = (props) => {

    const dispatch = useDispatch()
    const $status = {
        'status': true,
        'm_room': props.m_room
    }
    const $userdata = localStorage.getItem("User_id")

    const selectChat = () => {
        axios.put(Api('readmessage') + $userdata, $status)
            .then(res => {
            })
        dispatch({
            type: "JoinRoom",
            payload: {
                room: props.m_room,
                Username: props.name
            },
        })
    };
    return (
        <div
            onClick={selectChat}
            className={`chatlist__item`}>
            <div className="avatar">
                <div className="avatar-img">
                    <img src={props.image} alt="#" />
                </div>
            </div>
            <div className="userMeta">
                <p>{props.name}</p>

            </div>
            <Badge className="ml-3 mt-1" badgeContent={props.status} color="primary"></Badge>
        </div>

    )
}

export default Chattitle
