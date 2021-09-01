import React, { useState, useEffect } from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { Link, ListItemText, Badge } from '@material-ui/core';
import axios from 'axios';

import { CreateNewFolderOutlined, FileCopyOutlined, PersonalVideoOutlined, ForumOutlined, HistoryOutlined, HomeWorkOutlined, ReportOutlined,WorkOutlineOutlined } from '@material-ui/icons';
import Api from '../../api/Api';
const BarFreeland = () => {
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
                <Link href={"/profile/" + localStorage.getItem('User_id')}>
                    <ListItem button>
                        <ListItemIcon><PersonalVideoOutlined style={{ color: 'orange' }} /></ListItemIcon>
                        <ListItemText primary="ข้อมูลส่วนตัว" />
                    </ListItem>
                </Link>
                <Link href="/post">
                    <ListItem button>
                        <ListItemIcon><CreateNewFolderOutlined style={{ color: 'orange' }} /></ListItemIcon>
                        <ListItemText primary="โพสต์งาน" />
                    </ListItem>
                </Link>
                <Link href="/mypost">
                    <ListItem button>
                        <ListItemIcon><WorkOutlineOutlined style={{ color: 'orange' }} /></ListItemIcon>
                        <ListItemText primary="งานของฉัน" />
                    </ListItem>
                </Link>
                <Link href="/employmentFl">
                    <ListItem button>
                        <ListItemIcon><FileCopyOutlined style={{ color: 'orange' }} /></ListItemIcon>
                        <ListItemText primary="การจ้างงาน" />
                    </ListItem>
                </Link>
                <Link href="/history">
                    <ListItem button>
                        <ListItemIcon><HistoryOutlined style={{ color: 'orange' }} /></ListItemIcon>
                        <ListItemText primary="ประวัติการทำงาน" />
                    </ListItem>
                </Link>
                <Link href="/chat">
                    <ListItem button>
                        <ListItemIcon>
                            <Badge badgeContent={msg} color="primary">
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

export default BarFreeland
