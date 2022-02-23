import React, { useState } from 'react';
import { Row, Col, Card, Button, Form, Collapse, Spinner, FormGroup } from 'react-bootstrap';
import Select from 'react-select';
import PageTitle from '../../components/PageTitle';
import { useHistory, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { API_BASE_URL } from '../../apiconstant';
import { toast } from 'react-toastify';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Modal } from 'react-bootstrap';
import { Divider } from 'antd';


const Membership = (item, index) => {
    const [open, setOpen] = useState(false);
    const [validated, setValidated] = useState(false);

    const location = useLocation();
    const loggedInUser = JSON.parse(window.localStorage.getItem('token'));
    const token = loggedInUser.token;
    const doctorid = ((location.pathname).split('/'))[3];
    const [membership, setMembership] = useState([]);
    const [assoname, setAssoname] = useState('')
    const [modalData, setModalData] = useState(null);

    const toggle = () => {

        setOpen((prevState) => !prevState);

    };
    useEffect(() => {

        fetch(API_BASE_URL + `/admin/doctor_memberships/get_by_doctor_id?token=${token}&doctor_id=${doctorid}`, {
            method: 'get',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },

        })
            .then(response => response.json())
            .then(result => {
                // console.log('result professional', result.data);
                setMembership(result.data);
            }).catch(error => console.log(error))

    }, [doctorid, token]);

    const handleInputChange = (key) => (event) => {
        setModalData({
            ...modalData,
            [key]: event.target.value,
        });
    };

    //add membership for edit

    //add membership
    const [showModal, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //edit Membership
    const [editshow, setEditshow] = useState(false);
    const handleEditClose = () => setEditshow(false);

    const handleEditShow = () => setEditshow(true);

    //submit data for edit 

    const reload = () => window.location.reload();

    //add handel submit
    const handleAddMemberSubmit = (event) => {

        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            let data = {
                doctor_id: doctorid,
                association_name: assoname,

            }
            console.log('Edit memberdata', data)
            fetch(API_BASE_URL + `/admin/doctors/add_membership?token=${token}`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(result => {
                    console.log('Membership Data Updated', result);
                    if (result.status !== 0) {
                        toast.success('Memership Added Succesfully');
                        setTimeout(() => {
                            window.location.reload();
                        }, 3000);

                    } else {
                        toast.error(result.message);
                    }
                }).catch(error => console.log(error))
        }
        setValidated(true);
    }


    const handleEditMemberSubmit = (event) => {

        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            let data = {
                id: JSON.stringify(modalData.id),
                association_name: modalData.association_name,
            }
            console.log('Edit memberdata', data)
            fetch(API_BASE_URL + `/admin/doctors/update_membership?token=${token}`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(result => {
                    console.log('membership update data', result);

                    if (result.status !== 0) {
                        toast.success('Memership Updated Succesfully');

                        setTimeout(() => {
                            // console.log('updated membership', membership);
                            window.location.reload();
                        }, 3000);
                    } else {
                        toast.error(result.message);
                    }
                }).catch(error => console.log(error))
        }
        setValidated(true);
    }
    return (<div>

        {membership && membership.length == 0 ? 'Data Is Not Available In Expert Information' : membership && membership.map((item, index) => {
            // console.log('item', item);

            return (


                <div key={index}>
                    <Card className="mb-0">

                        <Card.Header>
                            <h5 className="m-0">
                                <Link
                                    to="#"
                                    className={classNames('custom-accordion-title d-block py-1', { collapsed: open !== true })}
                                    onClick={toggle}
                                    aria-controls={'collapse' + index}
                                    aria-expanded={open}>
                                    Membership #{index + 1}
                                    {/* <i className="mdi mdi-chevron-down accordion-arrow"></i> */}
                                </Link>
                            </h5>

                        </Card.Header>
                        <i class="mdi mdi-pencil accordion-arrow" style={{ marginRight: '10px', marginTop: '10px' }}
                            onClick={() => {
                                setModalData(item);
                                handleEditShow();
                            }}

                        ></i>

                        {/* <Collapse in={open} appear> */}

                        <div >

                            <Card.Body>

                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label htmlFor="associationame" column sm={3} className='d-flex flex-row-reverse'>
                                        Association Name
                                    </Form.Label>

                                    <Col sm={9}>
                                        <Form.Control type="text" name="associationname" id="associationname" placeholder="Enter Your Association Name" required type="text"
                                            // onChange={(e) => setClinicname(e.target.value)}
                                            value={item ? item.association_name : ''}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please choose a Association Name.
                                        </Form.Control.Feedback>
                                    </Col>

                                </Form.Group>
                            </Card.Body>

                        </div>

                        {/* </Collapse> */}
                    </Card>
                </div>
            );

        })}
        <Modal size="lg" show={editshow} onHide={handleEditClose}>

            <Modal.Header closeButton>
                <Modal.Title>Edit Membership</Modal.Title>
            </Modal.Header>
            <Form noValidate validated={validated} onSubmit={handleEditMemberSubmit}>

                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3} className='d-flex flex-row-reverse'>
                                Association Name
                            </Form.Label>

                            <Col sm={9}>
                                <Form.Control type="text" name="asoname" id="asoname" placeholder="Enter Your Association Name" required type="text"
                                    value={modalData ? modalData.association_name : ''}
                                    // value={assoname}
                                    onChange={handleInputChange('association_name')}

                                />
                                <Form.Control.Feedback type="invalid">
                                    Please choose a Association Name.
                                </Form.Control.Feedback>
                            </Col>

                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleEditClose}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit">
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>

        {/* Add Membership */}
        <Modal size="lg" show={showModal}>

            <Modal.Header closeButton>
                <Modal.Title>Add Membership</Modal.Title>
            </Modal.Header>
            <Form noValidate validated={validated} onSubmit={handleAddMemberSubmit}>
                <Modal.Body>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={3} className='d-flex flex-row-reverse'>
                            Association Name
                        </Form.Label>

                        <Col sm={9}>
                            <Form.Control type="text" name="addasoname" id="addasoname" placeholder="Enter Your Association Name" required type="text"
                                value={assoname}
                                onChange={(e) => setAssoname(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a Association Name.
                            </Form.Control.Feedback>
                        </Col>

                    </Form.Group>
                    {/* <Form.Group as={Row} className="mb-0" controlId="formHorizontalCheck">
                        <Col sm={{ span: 9, offset: 3 }}>
                            <Button variant="primary" type="submit">
                                Add Doctor
                            </Button>
                        </Col>
                    </Form.Group> */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit">
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
        <Form.Group as={Row} className="mb-3 mt-3">
            <div className="d-grid">

                <Button onClick={handleShow} variant="outline-primary"> <i class="mdi mdi-plus" style={{ marginRight: '10px' }}></i>Add Membership</Button>
            </div>

        </Form.Group>
    </div>
    )
}
export default Membership;