import React from 'react'
import { css } from "@emotion/core";
import '../css/load.css';
import PuffLoader
    from "react-spinners/PuffLoader";
const Load = () => {
    const override = css`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    `;
    return (
        <>
            <PuffLoader
                css={override}
                color="#fb5531"
                id="Puff"
                size={200}
            >
            </PuffLoader>
        </>
    )
}

export default Load
