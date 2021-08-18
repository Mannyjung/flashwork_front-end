import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap';
import axios from 'axios';
import Swal from 'sweetalert2'
import MD5 from "crypto-js/md5";
import Api from '../../api/Api';
const ModalFl = (props) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const initpassword = {
    std_password: "",
    conPassword: "",
    oldPass: "",
  };

  const [passwords, setPassword] = useState(initpassword);

  const handleInputChange = (event) => {
    let { name, value } = event.target;
    setPassword({ ...passwords, [name]: value })
  };


  const ChangePass = () => {
    let err = "";
    let oldpass = MD5(passwords.oldPass).toString();

    if (oldpass !== props.pass) {
      err = "กรุณากรอกรหัสผ่านเดิมให้ถูกต้อง"
      document.getElementById('oldPass').innerHTML = err
      return false;
    }

    if (!passwords.std_password) {
      err = "กรุณากรอกรหัสผ่าน"
      document.getElementById('std_password').innerHTML = err
      return false;
    }
    if (!passwords.conPassword) {
      err = "กรุณากรอกรหัสให้ตรงกัน"
      document.getElementById('std_password').innerHTML = err
      return false;
    }

    if (passwords.std_password !== passwords.conPassword) {
      err = "กรุณาใส่รหัสให้ตรงกัน"
      document.getElementById('std_password').innerHTML = err
      return false;
    }
    var data = {
      std_password: passwords.std_password,
    }
    axios.put(Api('changePass') + props.id, data)
      .then((response) => {
        setPassword({ ...passwords, data });
        Swal.fire(
          'เปลี่ยนรหัสผ่านเรียบร้อย?',
          '',
          'success'
        ).then(() => {
          window.location.reload()
        })

      })
      .catch((error) => {
        console.log(error);

      });
  }


  return (
    <>

      <Button style={{ marginTop: "4%" }} color="danger" onClick={toggle}>เปลี่ยนรหัสผ่าน</Button>
      <Modal isOpen={modal} toggle={toggle} className="fixmodal">
        <ModalHeader toggle={toggle}>เปลี่ยนรหัสผ่าน</ModalHeader>
        <ModalBody>
          <Label for="">รหัสผ่านเดิม</Label>
          <Input type="password" name="oldPass" placeholder="กรอกรหัสผ่าน" onChange={handleInputChange} />
          <span className="err" name="err" id="oldPass"></span>
          <p></p>

          <Label for="">รหัสผ่านใหม่</Label>
          <Input type="password" name="std_password" placeholder="กรอกรหัสผ่าน" onChange={handleInputChange} />
          <span className="err" name="err" id="std_password"></span>
          <p></p>
          <Label for="examplePassword">ยืนยันรหัสผ่าน</Label>
          <Input type="password" name="conPassword" placeholder="ยืนยันรหัสผ่าน" onChange={handleInputChange} />
          <span className="err" name="err" id="conPassword"></span>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={ChangePass}>ตกลง</Button>{' '}
          <Button color="secondary" onClick={toggle}>ยกเลิก</Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default ModalFl
