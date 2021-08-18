import React, { useState } from 'react';
import {
    Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Input, Form, Button, InputGroup, InputGroupAddon, Label
} from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsersCog } from "@fortawesome/free-solid-svg-icons";
const Menu = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar style={{ backgroundColor: '#fb5531' }} className="text-white shadow fixed-top  " expand="md">
                <NavbarBrand href="/">Home</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink href="/login">LOG IN</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/login2">LOGIN 2</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/register">REGISTER</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/addCateg">CATEGORY</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/work">WORK</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/post">POST</NavLink>
                        </NavItem>
                    </Nav>



                    {/* <NavbarText><Input></Input></NavbarText> */}
                </Collapse>

                <Form>
                    <InputGroup size="sm" >
                        <Input />
                        <InputGroupAddon addonType="append">
                            <Button>ค้นหา</Button>
                        </InputGroupAddon>
                    </InputGroup>
                </Form>
                <Label className="m-2"><FontAwesomeIcon icon={faUsersCog}  size="lg"/> ชื่อผู้ใช้</Label>
            </Navbar>
        </div>
    );
}
export default Menu;



