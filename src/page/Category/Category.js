
import React from 'react'
import { Form, Label, Container } from 'reactstrap';

import '../../css/category.css';
import AddMaincate from '../../content/Category/AddMaincate';
import CateTable from '../../content/Category/CateTable';


const Category = () => {

    return (
        <>
            <Container>
                <center>
                    <Label className="text-center mt-5 mb-4" style={{ fontSize: 36 }}>การจัดการประเภทงาน</Label>
                </center>
            </Container>
            <Container fluid>
                <Form>
                    <AddMaincate />
                </Form>
                <CateTable />
            </Container>
        </>
    )
}

export default Category
