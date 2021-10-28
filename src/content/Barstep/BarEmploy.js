import React, { useState, useEffect } from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { Link, ListItemText, Badge } from '@material-ui/core';
import { FileCopyOutlined, ForumOutlined, HistoryOutlined, HomeWorkOutlined, PersonalVideoOutlined, ReportOutlined } from '@material-ui/icons';
import axios from 'axios';
import Api from '../../api/Api';

const BarEmploy = () => {
    const [msg, setmsg] = useState([])
    useEffect(() => {
        axios.get(Api('notificationsmessage') + localStorage.getItem('User_id'))
            .then((res) => {
                setmsg(res.data[0].To_Username)
            });
    }, []);

    return (
        <>
            <List style={{ marginLeft: '6px' }} >
                <Link href="/">
                    <ListItem button>
                        <ListItemIcon><HomeWorkOutlined style={{ color: 'orange' }} />
                        </ListItemIcon>
                        <ListItemText primary="หน้าหลัก" />

                    </ListItem>
                </Link>
                <Link href={"/profileEmp/" + localStorage.getItem('User_id')}>
                    <ListItem button>
                        <ListItemIcon><PersonalVideoOutlined style={{ color: 'orange' }} /></ListItemIcon>
                        <ListItemText primary="ข้อมูลส่วนตัว" />
                    </ListItem>
                </Link>
                <Link href="/employmentEpy">
                    <ListItem button>
                        <ListItemIcon><FileCopyOutlined style={{ color: 'orange' }} /></ListItemIcon>
                        <ListItemText primary="การจ้างงาน" />
                    </ListItem>
                </Link>
                <Link href="/historyEmp">
                    <ListItem button>
                        <ListItemIcon><HistoryOutlined style={{ color: 'orange' }} /></ListItemIcon>
                        <ListItemText primary="ประวัติการจ้าง" />
                    </ListItem>
                </Link>
                <Link href="/chat">
                    <ListItem button>
                        <ListItemIcon>
                            <Badge badgeContent={0 | msg} color="primary">
                                <ForumOutlined style={{ color: 'orange' }} />
                            </Badge>
                        </ListItemIcon>
                        <ListItemText primary="ข้อความ" />
                    </ListItem>
                </Link>
                <Link href="/freeReport">
                    <ListItem button>
                        <ListItemIcon><ReportOutlined style={{ color: 'orange' }} /></ListItemIcon>
                        <ListItemText primary="คำร้องเรียน" />
                    </ListItem>
                </Link>
            </List>

        </>
    )
}

export default BarEmploy