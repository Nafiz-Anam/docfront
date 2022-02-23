import React, { useState } from "react";
import {
    Row,
    Col,
    Card,
    Button,
    Form,
    Collapse,
    Spinner,
    FormGroup,
    Modal,
} from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { API_BASE_URL } from "../../apiconstant";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import classNames from "classnames";
import "./doctor.css";
import { toast } from "react-toastify";
import Select from "react-select";
import countryList from "react-select-country-list";

const CustomAccordions = ({ item1 }) => {
    const location = useLocation();
    const loggedInUser = JSON.parse(window.localStorage.getItem("token"));
    const token = loggedInUser.token;
    const doctorid = location.pathname.split("/")[3];
    const [open, setOpen] = useState(false);
    const [professionalInfo, setProfessionalInfo] = useState([]);

    // conso

    useEffect(() => {
        //profession info for license
        fetch(
            API_BASE_URL +
                `/admin/doctor_medical_licenses/get_by_doctor_id?token=${token}&doctor_id=${doctorid}`,
            {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            }
        )
            .then((response) => response.json())
            .then((result) => {
                console.log("result license", result.data);
                setProfessionalInfo(result.data);
            })
            .catch((error) => console.log(error));
    }, [doctorid, token]);

    const toggle = () => {
        setOpen((prevState) => !prevState);
    };

    // Adding licencse function
    const [showModal, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [validated, setValidated] = useState(false);
    const [licencenumber, setLicencenumbr] = useState("");
    // const [licencecountry, setLicencecountry] = useState('');
    const [lincensedefaulCountry, setLicensedefaultCountry] = useState("");
    const options = useMemo(() => countryList().getData(), []);

    const changeHandler = (value) => {
        setLicensedefaultCountry(value);
    };

    const handleAddMedicalSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            let data = {
                doctor_id: doctorid,
                medical_license_number: licencenumber,
                medical_license_country: String(lincensedefaulCountry.label),
            };
            console.log("Add licence", data);
            fetch(
                API_BASE_URL +
                    `/admin/doctors/add_medical_license?token=${token}`,
                {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify(data),
                }
            )
                .then((response) => response.json())
                .then((result) => {
                    console.log("License Data Updated", result);
                    if (result.status == 1) {
                        toast.success("License Added Succesfully");
                        setTimeout(() => {
                            window.location.reload();
                        }, 3000);
                    } else {
                        toast.error(result.message);
                    }
                })
                .catch((error) => console.log(error));
        }
        setValidated(true);
    };

    //Edit license information
    const [editshow, setEditshow] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [editCountry, setEditCountry] = useState("");

    const handleEditClose = () => setEditshow(false);

    const handleEditShow = () => setEditshow(true);

    const handleInputChange = (key) => (event) => {
        setModalData({
            ...modalData,
            [key]: event.target.value,
        });
    };
    const changeEditHandler = (editCountry) => {
        setLicensedefaultCountry(editCountry);
    };

    const handleEditSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            let data = {
                id: modalData.id,
                medical_license_number: modalData.medical_license_number,
                medical_license_country: String(editCountry.label),
            };
            // modalData.medical_License_country
            console.log("Edit license", data);
            fetch(
                API_BASE_URL +
                    `/admin/doctors/update_medical_license?token=${token}`,
                {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify(data),
                }
            )
                .then((response) => response.json())
                .then((result) => {
                    console.log("Edit license Updated", result);
                    if (result.status == 1) {
                        toast.success("License  Updated Succesfully");
                        setTimeout(() => {
                            window.location.reload();
                        }, 3000);
                    } else {
                        toast.error(result.message);
                    }
                })
                .catch((error) => console.log(error));
        }
        setValidated(true);
    };

    return (
        <div>
            {professionalInfo &&
                professionalInfo.map((item, index) => {
                    // console.log('item', item);
                    return (
                        <div key={item.id}>
                            <Card className="mb-0">
                                {/* {console.log('professionalInfo', professionalInfo)} */}
                                <Card.Header>
                                    <h5 className="m-0">
                                        <Link
                                            to="#"
                                            className={classNames(
                                                "custom-accordion-title d-block py-1",
                                                { collapsed: open !== true }
                                            )}
                                            onClick={toggle}
                                            // activeKey={item.id}
                                            data-bs-target={index}
                                            aria-controls={"collapse" + index}
                                            aria-expanded={open}
                                        >
                                            Medical License Information #
                                            {index + 1}{" "}
                                            <i className="mdi mdi-chevron-down accordion-arrow"></i>
                                        </Link>
                                    </h5>
                                </Card.Header>
                                <i
                                    class="mdi mdi-pencil accordion-arrow"
                                    style={{
                                        marginRight: "10px",
                                        marginTop: "10px",
                                    }}
                                    onClick={() => {
                                        setModalData(item);
                                        handleEditShow();
                                    }}
                                ></i>
                                {/* aria-controls={index} */}
                                {/* <Collapse in={open} appear> */}
                                <div>
                                    <Card.Body>
                                        <Form.Group as={Row} className="mb-3">
                                            <Form.Label
                                                htmlFor="license number"
                                                column
                                                sm={3}
                                                className="d-flex flex-row-reverse"
                                            >
                                                License Number
                                            </Form.Label>

                                            <Col sm={9}>
                                                <Form.Control
                                                    type="text"
                                                    name="lnumber"
                                                    id="exampleNumber3"
                                                    placeholder="Enter Your License Number"
                                                    required
                                                    type="text"
                                                    //  onChange={(e) => setPnumber(e.target.value)}
                                                    value={
                                                        item
                                                            ? item.medical_license_number
                                                            : ""
                                                    }
                                                    // onChange={handleInputChange('medical_license_number')}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    Please choose a License
                                                    Number.
                                                </Form.Control.Feedback>
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} className="mb-3">
                                            <Form.Label
                                                htmlFor="exampleCategory3"
                                                column
                                                sm={3}
                                                className="d-flex flex-row-reverse"
                                            >
                                                License Country
                                            </Form.Label>

                                            <Col sm={9}>
                                                <Form.Control
                                                    type="text"
                                                    name="lcountry"
                                                    id="exampleNumber3"
                                                    placeholder="Enter Your License Country"
                                                    required
                                                    type="text"
                                                    //  onChange={(e) => setPnumber(e.target.value)}
                                                    value={
                                                        item
                                                            ? item.medical_License_country
                                                            : ""
                                                    }
                                                    // onChange={handleInputChange('medical_license_country')}
                                                />

                                                <Form.Control.Feedback type="invalid">
                                                    Please choose a License
                                                    Country.
                                                </Form.Control.Feedback>
                                            </Col>
                                            <Form.Control.Feedback type="invalid">
                                                Please choose a Country.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Card.Body>
                                </div>
                                {/* </Collapse> */}
                            </Card>
                        </div>
                    );
                })}

            {/* Add Medical licence */}
            <Modal size="lg" show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Medical License</Modal.Title>
                </Modal.Header>
                <Form
                    noValidate
                    validated={validated}
                    onSubmit={handleAddMedicalSubmit}
                    id="medicaladdform"
                    name="medicaladdform"
                >
                    <Modal.Body>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label
                                htmlFor="license number"
                                column
                                sm={3}
                                className="d-flex flex-row-reverse"
                            >
                                License Number
                            </Form.Label>

                            <Col sm={9}>
                                <Form.Control
                                    type="text"
                                    name="lnumber"
                                    id="exampleNumber3"
                                    placeholder="Enter Your License Number"
                                    required
                                    type="text"
                                    value={licencenumber}
                                    onChange={(e) =>
                                        setLicencenumbr(e.target.value)
                                    }
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please choose a License Number.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label
                                htmlFor="exampleCategory3"
                                column
                                sm={3}
                                className="d-flex flex-row-reverse"
                            >
                                License Country
                            </Form.Label>

                            <Col sm={9}>
                                {/* <Form.Control type="text" name="lcountry" id="exampleNumber3" placeholder="Enter Your License Country" required type="text"
                                    value={licencecountry}
                                    onChange={(e) => setLicencecountry(e.target.value)}
                                // onChange={handleInputChange('medical_license_country')}
                                /> */}
                                <Select
                                    options={options}
                                    value={lincensedefaulCountry}
                                    onChange={changeHandler}
                                    isSearchable
                                />

                                <Form.Control.Feedback type="invalid">
                                    Please choose a License Country.
                                </Form.Control.Feedback>
                            </Col>
                            <Form.Control.Feedback type="invalid">
                                Please choose a Country.
                            </Form.Control.Feedback>
                        </Form.Group>
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
                    <Button onClick={handleShow} variant="outline-primary">
                        <i
                            class="mdi mdi-plus"
                            style={{ marginRight: "10px" }}
                        ></i>
                        Add Medical License
                    </Button>
                </div>
            </Form.Group>

            {/* Edit modal licences */}
            <Modal size="lg" show={editshow} onHide={handleEditClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Medical License</Modal.Title>
                </Modal.Header>
                <Form
                    noValidate
                    validated={validated}
                    onSubmit={handleEditSubmit}
                >
                    <Modal.Body>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label
                                htmlFor="license number"
                                column
                                sm={3}
                                className="d-flex flex-row-reverse"
                            >
                                License Number
                            </Form.Label>

                            <Col sm={9}>
                                <Form.Control
                                    type="text"
                                    name="number"
                                    placeholder="Enter Your License Number"
                                    required
                                    type="text"
                                    value={
                                        modalData
                                            ? modalData.medical_license_number
                                            : ""
                                    }
                                    onChange={handleInputChange(
                                        "medical_license_number"
                                    )}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please choose a License Number.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label
                                htmlFor="exampleCategory3"
                                column
                                sm={3}
                                className="d-flex flex-row-reverse"
                            >
                                License Country
                            </Form.Label>

                            <Col sm={9}>
                                {/* <Form.Control type="text" name="country" placeholder="Enter Your License Country" required type="text"
                                    value={modalData ? modalData.medical_License_country : ''}
                                    onChange={handleInputChange('medical_License_country')}

                                /> */}
                                <Select
                                    options={options}
                                    // defaultInputValue={modalData ? modalData.medical_License_country : ''}
                                    value={editCountry}
                                    onChange={changeEditHandler}
                                    isSearchable
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please choose a License Country.
                                </Form.Control.Feedback>
                            </Col>
                            <Form.Control.Feedback type="invalid">
                                Please choose a Country.
                            </Form.Control.Feedback>
                        </Form.Group>
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
        </div>
    );
};

export default CustomAccordions;
