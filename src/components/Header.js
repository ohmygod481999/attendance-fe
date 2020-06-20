import React from "react";
import PropTypes from "prop-types";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function Header(props) {
    return (
        <div>
            <Navbar bg="light" className="mb-2">
                <Container>
                    <Nav className="ml-auto">
                        <Nav.Link>
                            <Link to="/">Home</Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link to="login">Logout</Link>
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    );
}

Header.propTypes = {};

export default Header;
