import { AppBar, Box, Tab, Tabs, Typography } from '@material-ui/core';
import React from 'react'
import PropTypes from 'prop-types';
import Employer from '../content/manageuser/Employer';
import Freeland from '../content/manageuser/Freeland';
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


const MangeProfile = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    if (localStorage.getItem('User_id') == null) {

      
        window.location.assign("/login2")

   
}
else {
    return (
        <>
            <div className="mt-5">
                <AppBar position="static" color="none">
                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                        <Tab label="ผู้ว่าจ้าง" {...a11yProps(0)} />
                        <Tab label="ฟรีแลนซ์" {...a11yProps(1)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <Employer />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Freeland />
                </TabPanel>
            </div>
        </>
    )}
}

export default MangeProfile
