import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardImg, CardText, Col, Container, Row } from 'reactstrap'
import Api from '../api/Api';
import '../css/nextpage.css'
import '../css/cardhome.css';
import ReactPaginate from "react-paginate";
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';


const Nextpage = () => {
    const [posts, setPosts] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);

    useEffect(() => {
        axios.get(Api('show_work'))
            .then((res) => {
                setPosts(res.data)
            });
    }, []);
    <></>
    const usersPerPage = 6;
    const pagesVisited = pageNumber * usersPerPage;

    const displayUsers = posts
        .slice(pagesVisited, pagesVisited + usersPerPage)

        .map((reports) => {

            return (
                <>
                    <Col sm="4">
                        <a className="linkwork" href={"/SelectPost/" + reports.aw_id} >
                            <Card id="card-work" key={reports.aw_id} className="cardw">
                                <CardHeader
                                    avatar={
                                        <Avatar alt="Travis Howard"
                                            src={reports.std_image} />
                                    }
                                   
                                    title={reports.std_fname}
                                    subheader={reports.aw_std_id}


                                />
                                <CardImg className="imgwork" src={reports.w_img_name} alt="Card image cap" />
                                
                                <CardBody className="body-name">
                                    <Row >
                                        <Col sm="12" className="cwc11">
                                            <b><CardText>{reports.aw_name}</CardText></b>
                                            <CardText > <b style={{ color: "orange" }}> ราคา  </b>
                                                <b>{reports.pk_price} {reports.pk_time_period}</b>
                                            </CardText>
                                        </Col>

                                    </Row>
                                   
                                </CardBody>
                            </Card>
                        </a>
                        <br /><p></p>
                    </Col>
                </>
            );
        });
    const pageCount = Math.ceil(posts.length / usersPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };
    return (
        <>
            <Container className="mt-5">

                <Row>
                    {displayUsers}</Row>

                <br />
                <center>
                    <ReactPaginate
                        className="pagination"
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        containerClassName={"paginationBttns"}
                        previousLinkClassName={"previousBttn"}
                        nextLinkClassName={"nextBttn"}
                        disabledClassName={"paginationDisabled"}
                        activeClassName={"paginationActive"}
                        color="primary"
                        count={pageCount}
                    /></center>

            </Container>
        </>
    )
}


export default Nextpage
