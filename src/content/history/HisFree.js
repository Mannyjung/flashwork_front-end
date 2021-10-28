import React, { useEffect, useState } from 'react'
import { Container} from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import Api from '../../api/Api';

const useStyles = makeStyles({
    table: {
        minWidth: 500,
    },
});

const HisFree = () => {
    const classes = useStyles();

    const [history, setHistory] = useState([]);
    const id = localStorage.getItem('User_id');
    useEffect(() => {
        let isMounted = true;
        axios.get(Api('getHistory') + id)
            .then((response) => {
                if (isMounted) setHistory(response.data)
            })
            return () => { isMounted = false };
    }, [id]);

    return (
        <>
            <Container style={{ marginTop: "3%", marginLeft: "5%" }} fluid>
                <h1>ประวัติการทำงานทั้งหมด</h1>
            </Container>
            <Container fluid>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">ชื่อผู้จ้าง</TableCell>
                                <TableCell align="center">ชื่องานที่จ้าง</TableCell>
                                <TableCell align="center">ชื่อแพ็กเกจที่จ้าง</TableCell>
                                <TableCell align="center">วันที่จ้าง</TableCell>
                            </TableRow>
                        </TableHead>
                        {history.map((his)=> {
                                return(
                        <TableBody>
                          
                                    <TableRow key="">
                                        <TableCell component="th" scope="row">{his.emm_user_id}</TableCell>
                                        <TableCell align="center">{his.aw_name}</TableCell>
                                        <TableCell align="center">{his.pk_name}</TableCell>
                                        <TableCell align="center">{his.emm_date_time}</TableCell>

                                    </TableRow>
                              
                        </TableBody>
                           )
                        })} 
                    </Table>
                </TableContainer>
            </Container>
        </>
    )
}

export default HisFree
