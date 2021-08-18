import React, { useState, useEffect } from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import axios from 'axios'
import '../../css/wait.css'
import Api from '../../api/Api';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: '#37474f',
        color: theme.palette.common.white,
    },

}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});



const Notpass = () => {
    const classes = useStyles();
    const [Work, setWork] = useState([])

    useEffect(() => {
        let isMounted = true;

        axios.get(Api('showpostnotpass'))
            .then((res) => {
                if (isMounted) setWork(res.data);
            });
        return () => { isMounted = false };

    }, []);

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead >
                    <TableRow>
                        <StyledTableCell >#id</StyledTableCell>
                        <StyledTableCell>ชื่องาน</StyledTableCell>
                        <StyledTableCell align="center">ประเภท</StyledTableCell>
                        <StyledTableCell align="center">#ฟรีแลนซ์</StyledTableCell>
                        <StyledTableCell align="center">เหตุผล</StyledTableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {Work.map((row) => (
                        <StyledTableRow key={row.aw_id}>
                            <StyledTableCell >{row.aw_id}</StyledTableCell>
                            <StyledTableCell >{row.aw_name}</StyledTableCell>
                            <StyledTableCell align="center">{row.sub_cate_name}</StyledTableCell>
                            <StyledTableCell align="center">{row.std_id}</StyledTableCell>
                            <StyledTableCell align="center">{row.Comment}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
export default Notpass
