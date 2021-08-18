import React, { useState } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Collapse, Link } from '@material-ui/core';
import {
    ContactsOutlined,
    ExpandLess,
    ExpandMore,
    GavelSharp,
    HomeWorkOutlined,
    LibraryAddCheckOutlined,
    ReportOutlined,
    WidgetsOutlined
} from '@material-ui/icons';
// import { DashboardIcon } from '@material-ui/icons';
const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper
    },
    nested: {
        paddingLeft: theme.spacing(4)
    }
}));
const Baradmin = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <>
            <List style={{ marginLeft: '6px' }} >
                <Link color="inherit" href="/">
                    <ListItem button>
                        <ListItemIcon><HomeWorkOutlined style={{ color: 'orange' }} />
                        </ListItemIcon>
                        <ListItemText primary="หน้าหลัก" />
                    </ListItem>
                </Link>
            </List>
            <List style={{ marginLeft: '6px' }} >
                <Link color="inherit" href="/checkwork">
                    <ListItem button>
                        <ListItemIcon><LibraryAddCheckOutlined style={{ color: 'orange' }} />
                        </ListItemIcon>
                        <ListItemText primary="คำร้องขอโพสต์งาน" />
                    </ListItem>
                </Link>
            </List>
            
            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                className={classes.root}
                style={{ marginLeft: '6px' }}
            >
                <ListItem button onClick={handleClick}>
                    <ListItemIcon>
                        <GavelSharp />
                    </ListItemIcon>
                    <ListItemText primary="การจัดการ" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List style={{ marginLeft: '6px' }} >
                        <Link color="inherit" href="/manageprofile">
                            <ListItem button>
                                <ListItemIcon><ContactsOutlined style={{ color: 'orange' }} fontSize="small" />
                                </ListItemIcon>
                                <ListItemText primary="จัดการข้อมูลผู้ใช้" />
                            </ListItem>
                        </Link>
                    </List>
                    <List style={{ marginLeft: '6px' }} >
                        <Link color="inherit" href="/category">
                            <ListItem button>
                                <ListItemIcon><WidgetsOutlined style={{ color: 'orange' }} fontSize="small" />
                                </ListItemIcon>
                                <ListItemText primary="จัดการประเภทงาน" />
                            </ListItem>
                        </Link>
                    </List>
                    <List style={{ marginLeft: '6px' }} >
                    <Link color="inherit" href="/reportAdmin">
                            <ListItem button>
                                <ListItemIcon><ReportOutlined style={{ color: 'orange' }} fontSize="small" />
                                </ListItemIcon>
                                <ListItemText primary="คำร้องเรียน" />
                            </ListItem>
                        </Link>
                    </List>
                    
                </Collapse>
            </List>


        </>
    )
}

export default Baradmin
