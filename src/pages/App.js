import React, { useState, useRef, useEffect } from "react";
import {
    Navbar,
    Nav,
    Container,
    Jumbotron,
    Row,
    Col,
    Form,
    ListGroup,
    Button,
    Card,
    Breadcrumb,
    Modal,
} from "react-bootstrap";
import { BsSearch } from "react-icons/bs/index";
import {
    AiFillCaretRight,
    AiOutlineCheck,
    AiOutlineDelete,
} from "react-icons/ai";
import { css } from "@emotion/core";
import BeatLoader from "react-spinners/BeatLoader";
import Swal from "sweetalert2";
import Header from "../components/Header";

const override = css`
    display: block;
    margin: auto;
    border-color: #007bff;
`;

function App() {
    const [isShow, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState("");

    const [students, setStudents] = useState([
        {
            id: 17021197,
            name: "Vương Bảo Long",
            attendant: false,
            show: true,
        },
        {
            id: 17020025,
            name: "Nguyễn Nhật Minh",
            attendant: false,
            show: true,
        },
        {
            id: 17021234,
            name: "Nguyễn Duy Chương",
            attendant: false,
            show: true,
        },
        {
            id: 17021456,
            name: "Trần Xuân Hường",
            attendant: false,
            show: true,
        },
        {
            id: 17027548,
            name: "Nguyễn Linh Chi",
            attendant: false,
            show: true,
        },
    ]);

    const [modalInfo, setModalInfo] = useState(students[0]);

    const searchHandle = (e) => {
        setSearchText(e.target.value);
        setTimeout(() => {}, 100);
    };

    useEffect(() => {
        setStudents(
            students.map((student) => {
                var re = new RegExp(`${searchText}`, "g");
                if (student.name.match(re) || student.id.toString().match(re)) {
                    /*you may also store this in a data structure e.g. array*/
                    return {
                        ...student,
                        show: true,
                    };
                } else {
                    return {
                        ...student,
                        show: false,
                    };
                }
            })
        );
    }, [searchText]);

    const checkAttendance = (studentId) => {
        let success = true;
        if (success) {
            setStudents(
                students.map((student) => {
                    if (student.id === studentId)
                        return {
                            ...student,
                            attendant: true,
                        };
                    return student;
                })
            );
        }
    };

    const removeAttendanceHandle = (studentId) => {
        setStudents(
            students.map((student) => {
                if (student.id === studentId)
                    return {
                        ...student,
                        attendant: false,
                    };
                return student;
            })
        );
    };

    const handleClose = () => setShow(false);

    const handleShow = (student) => {
        setModalInfo(student);
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            Swal.fire({
                title: "Thành công",
                text: `${student.name} đã có mặt`,
                icon: "success",
            }).then(({ value }) => {
                checkAttendance(student.id);
                handleClose();
            });
        }, 2000);
        return setShow(true);
    };

    return (
        <div className="App">
            <Header />
            <Modal show={isShow} onHide={handleClose}>
                {/* <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header> */}
                <Modal.Body>
                    <p>{modalInfo.name}</p>
                    <p>Recording...</p>
                    <BeatLoader
                        css={override}
                        size={10}
                        color={"#123abc"}
                        loading={loading}
                    />
                </Modal.Body>
            </Modal>
            <Container>
                {/* <div className="jumbotron">
                    <div class="page-header">
                        <h1></h1>
                    </div>
                </div> */}
                <Breadcrumb>
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="https://uetcodehub.xyz/course/view.php?id=78">
                        INT3411-TQLong
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>Attendance</Breadcrumb.Item>
                </Breadcrumb>
                <Row>
                    <Col md={8}>
                        <Form.Row className="mb-3">
                            <Col className="d-flex align-items-center justify-content-around">
                                <BsSearch size="1.5em" className="mr-3" />
                                <Form.Control
                                    type="text"
                                    placeholder="Search here"
                                    onChange={searchHandle}
                                />
                            </Col>
                        </Form.Row>
                        <div className="list-box">
                            <ListGroup>
                                {students.length > 0 ? (
                                    students
                                        .filter((student) => !student.attendant)
                                        .filter((student) => student.show)
                                        .map((student) => (
                                            <ListGroup.Item key={student.id}>
                                                <div className="title-group">
                                                    <div className="l-title">
                                                        {student.name}
                                                    </div>
                                                    <div className="l-description">
                                                        {student.id}
                                                    </div>
                                                </div>
                                                <div className="float-right clearfix">
                                                    <Button
                                                        variant="outline-success"
                                                        onClick={() =>
                                                            handleShow(student)
                                                        }
                                                    >
                                                        check
                                                    </Button>
                                                </div>
                                            </ListGroup.Item>
                                        ))
                                ) : (
                                    <p>Trống</p>
                                )}
                            </ListGroup>
                        </div>
                    </Col>
                    <Col md={4}>
                        <Card>
                            <Card.Header>Sinh viên có mặt</Card.Header>
                            <Card.Body>
                                <div className="l-list">
                                    {students
                                        .filter((student) => student.attendant)
                                        .map((student) => (
                                            <div
                                                key={student.id}
                                                className="l-item"
                                            >
                                                <AiOutlineCheck
                                                    color="green"
                                                    size="1.3em"
                                                    className="mr-2"
                                                />
                                                <span>{student.name}</span>
                                                <div className="float-right">
                                                    <AiOutlineDelete
                                                        size="1.5em"
                                                        color="red"
                                                        cursor="pointer"
                                                        onClick={() =>
                                                            removeAttendanceHandle(
                                                                student.id
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default App;
