import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Form, Container, Button } from "react-bootstrap";

function Login(props) {
    return (
        <div className="bg-image d-flex justify-content-center align-items-center">
            <div className="form-box">
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control name="uname" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" type="password" />
                </Form.Group>
                <Button onClick={() => {
                    props.history.push('/')
                }
                }>Submit</Button>
            </div>
        </div>
    );
}

Login.propTypes = {};

export default Login;
