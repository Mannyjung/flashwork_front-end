import React from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from '@material-ui/core';
import { ContactsOutlined, HomeWorkOutlined, PersonAddOutlined } from '@material-ui/icons';
const mystyle = {
    color: "orange",
    fontFamily: "Kanit"
};
const BarEmploy = () => {
    return (
        <>
            <List style={{ marginLeft: '6px' }} >
                <Link href="/">
                    <ListItem button>
                        <ListItemIcon><HomeWorkOutlined style={{ color: 'orange' }} />
                        </ListItemIcon>
                        <ListItemText primary="หน้าหลัก" style={mystyle} />
                    </ListItem>
                </Link>
                <Link href="/login2">
                    <ListItem button>
                        <ListItemIcon><ContactsOutlined style={{ color: 'orange' }} /></ListItemIcon>
                        <ListItemText primary="เข้าสู่ระบบ" />
                    </ListItem>
                </Link>
                <Link href="/register">
                    <ListItem button>
                        <ListItemIcon><PersonAddOutlined style={{ color: 'orange' }} /></ListItemIcon>
                        <ListItemText primary="สมัครสมาชิก" />
                    </ListItem>
                </Link>
            </List>
        </>
    )
}

export default BarEmploy
