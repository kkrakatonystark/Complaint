import { Nav, Navbar, NavLink } from "react-bootstrap";
import {Link } from "react-router-dom";

const Navi = () => {
      return (

        <Navbar collapse0nSelect expand="sm" bg="dark" variant="dark">
         <Navbar.Toggle aria-controls="navbarScroll" data-bs-target="#navbarScroll"/> 
            <Navbar.Collapse id="navbarScroll">
            <Nav>
                <NavLink eventKey="1" as={Link} to="/">Home</NavLink>
                <NavLink eventKey="1" as={Link} to="/">Home</NavLink>
                <NavLink eventKey="1" as={Link} to="/">Home</NavLink>
            </Nav>
        </Navbar.Collapse>

</Navbar>

);

export default Navi;