import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Table, Button } from 'reactstrap'
import Api from '../../api/Api'

const Employer = () => {
    const [employer, setEmployer] = useState([])

    useEffect(() => {
        axios.get(Api('Manageemployer'))
            .then((res) => {
                setEmployer(res.data);
            })
    }, [])

    return (
        <>
            <Table striped>
                <thead>
                    <tr>
                        <th>รูปโปรไฟล์</th>
                        <th>ชื่อผู้ใช้</th>
                        <th>ชื่อ</th>
                        <th>นามสกุล</th>
                        <th>อีเมล์</th>

                       
                        <th>ดูข้อมูล</th>
                    </tr>
                </thead>
                {employer.map((data) => (
                    <>

                        <tbody>
                            <tr>
                                <th scope="row"><img src={data.em_image} width="40px" height="20px" alt="" /></th>
                                <td>{data.em_username}</td>
                                <td>{data.em_fname}</td>
                                <td>{data.em_lname}</td>
                                <td>{data.em_email}</td>
                                
                                <Button style={{backgroundColor:"#ff5722", color:"white"}}  size="lg" href={"/ProfileEmpforadmin/" + data.em_username}>ดูข้อมูล</Button>
                              
                            </tr>  <p></p>
                        </tbody>

                    </>
                ))}

            </Table>
        </>
    )
}

export default Employer
