import { Container, Typography } from '@material-ui/core'
import React from 'react'
import Combin from '../content/checkwork/Combin'

const Combinework = () => {
    if (localStorage.getItem('User_id') == null) {

      
        window.location.assign("/login2")

   
}
else {
    return (
        <>
            <Container>
                {/* There is already an h1 in the page, let's not duplicate it. */}
                <Typography variant="h3" component="h4" align="center" className="mb-5">
                    แก้ไขและสถานะงาน
                </Typography>
                <Combin />
            </Container>
        </>
    )}
}

export default Combinework
