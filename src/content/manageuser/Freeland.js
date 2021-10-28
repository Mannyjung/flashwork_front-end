import React, { useEffect, useState } from 'react'
import { Table, Button } from 'reactstrap'
import axios from 'axios'
import Api from '../../api/Api'
const Freeland = () => {
    const [freeland, setFreeland] = useState([])
    useEffect(() => {
        axios.get(Api('Managestudent'))
            .then((res) => {
                setFreeland(res.data);
            })
    }, [])
    return (
        <>
            <Table striped>
                <thead>
                    <tr>
                        <th>รูปโปรไฟล์</th>
                        <th>รหัสนักศึกษา</th>
                        <th>ชื่อ</th>
                        <th>นามสกุล</th>
                        <th>อีเมล์ </th>
                        
                        <th>ดูข้อมูล</th>
                    </tr>
                </thead>
                {freeland.map((data) => (
                    <>
                        <tbody>
                            <tr>
                                <th scope="row"><img src={data.std_image} width="40px" height="20px" alt="" /></th>
                                <td>{data.std_id}</td>
                                <td>{data.std_fname}</td>
                                <td>{data.std_lname}</td>
                                <td>{data.std_email}</td>
                                
                                <Button style={{backgroundColor:"#ff5722", color:"white"}}  size="lg" href={"/ProfileFreeforadmin/" + data.std_id}>ดูข้อมูล</Button>
                            </tr>
                            <p></p>
                        </tbody>
                    </>
                ))}

            </Table>
        </>
    )
}

export default Freeland
