import React, { useState, useEffect } from 'react';
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    Col,
    Row

} from 'reactstrap';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Api from '../../api/Api';
const useStyles = makeStyles((theme) => ({

    gridList: {
        maxWidth: 950,
        minWidth: 300,
    },
}));
const CarluselPost = ({ id }) => {



    // -----------------------------------------
    const classes = useStyles();
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
    const [showdetail, setShowdetail] = useState([]);
    useEffect(() => {
        let isMounted = true;
        axios.get(Api('PIC') + id)
            .then((response) => {
                if (isMounted) setShowdetail(response.data)
            })
        return () => { isMounted = false };

    }, [id]);

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === showdetail.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }
    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? showdetail.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }
    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    }
    const slides = showdetail.map((pic) => {
        return (
            <CarouselItem
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={pic.w_img_id}
            >
                <br />

                <img src={pic.w_img_name} className="size-pic" alt="pic.w_img_name" />


            </CarouselItem>
        );
    });

    // ----------------------------------------------------------
    return (
        <>
            <Row>
                <Col sm={12}>
                    <Carousel
                        className="custom-tag m-3 "
                        activeIndex={activeIndex}
                        next={next}
                        previous={previous}
                    >
                        <CarouselIndicators
                            items={showdetail}
                            activeIndex={activeIndex}
                            onClickHandler={goToIndex}
                        />
                        {slides}
                        <CarouselControl
                            direction="prev"
                            directionText="Previous"
                            onClickHandler={previous}
                        />
                        <CarouselControl
                            direction="next"
                            directionText="Next"
                            onClickHandler={next} />
                    </Carousel>
                </Col>

                <Col sm={12}>
                    <GridList cellHeight={100} className={classes.gridList} cols={6}>
                        {showdetail.map((pic) => (
                            <GridListTile key={pic.w_img_id} >
                                <img src={pic.w_img_name} alt={pic.w_img_name} />
                            </GridListTile>
                        ))}
                    </GridList>
                </Col>
            </Row>
        </>
    )
}
export default CarluselPost;