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
import { useEffect } from "react";
import { API_BASE_URL } from "../../apiconstant";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import classNames from "classnames";
import "./doctor.css";

//professional Information

const Acadminc = () => {
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const loggedInUser = JSON.parse(window.localStorage.getItem("token"));
    const token = loggedInUser.token;
    const doctorid = location.pathname.split("/")[3];
    const [acadmin, setAcadmin] = useState([]);
    const [validated, setValidated] = useState(false);

    const toggle = () => {
        setOpen((prevState) => !prevState);
    };
    useEffect(() => {
        fetch(
            API_BASE_URL +
                `/admin/doctor_academics/get_by_doctor_id?token=${token}&doctor_id=${doctorid}`,
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
                // console.log('result professional', result.data);
                setAcadmin(result.data);
            })
            .catch((error) => console.log(error));
    }, [doctorid, token]);

    // const defaultValue = new Date();
    // open and close Add Modal
    const [showModal, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //Add Acadamic data State
    const [degree, setDegree] = useState("");
    const [college, setCollege] = useState("");
    const [acadmicyearstart, setAcadmicyearstart] = useState(new Date());
    const [acadmicyearend, setAcadmicyearend] = useState(new Date());
    const [country, setCountry] = useState("");

    //Add Acadmic Data function
    const handleAddAcadmicSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            let data = {
                doctor_id: doctorid,
                degree: degree,
                college: college,
                start_year: acadmicyearstart.toISOString().split("-", 1),
                end_year: acadmicyearend.toISOString().split("-", 1),
                country: country,
            };
            console.log("Add Acadminc", data);
            fetch(API_BASE_URL + `/admin/doctors/add_academic?token=${token}`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(data),
            })
                .then((response) => response.json())
                .then((result) => {
                    console.log("Acadmic Data Updated", result);
                    if (result.status == 1) {
                        toast.success("Acadmic Added Succesfully");
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

    //edit Membership
    const [editshow, setEditshow] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [editstartdate, setEditstartdate] = useState(new Date());
    const [editendate, setEditendate] = useState(new Date());
    const handleEditClose = () => setEditshow(false);

    const handleEditShow = () => setEditshow(true);

    const handleInputChange = (key) => (event) => {
        setModalData({
            ...modalData,
            [key]: event.target.value,
        });
    };

    const handleEditAcadmicSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            let data = {
                id: modalData.id,
                degree: modalData.degree,
                college: modalData.college,
                start_year: editstartdate.toISOString().split("-", 1),
                end_year: editendate.toISOString().split("-", 1),
                country: modalData.country,
            };
            console.log("Edit Acadminc", data);
            fetch(
                API_BASE_URL + `/admin/doctors/update_academic?token=${token}`,
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
                    console.log("Edit Data Updated", result);
                    if (result.status == 1) {
                        toast.success("Acadmic Data Updated Succesfully");
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
            {acadmin.length == 0
                ? "Data Is Not Available In Academic Information"
                : acadmin.map((item, index) => {
                      // console.log('item', item);
                      return (
                          <div key={item}>
                              <Card className="mb-0">
                                  {/* {console.log('professionalInfo', professionalInfo)} */}
                                  <Card.Header>
                                      <h5 className="m-0">
                                          <Link
                                              to="#"
                                              className={classNames(
                                                  "custom-accordion-title d-block py-1",
                                                  { collapsed: open == true }
                                              )}
                                              onClick={toggle}
                                              aria-controls={"collapse" + index}
                                              aria-expanded={open}
                                          >
                                              Academic Information #{index + 1}
                                              {/* <i className="mdi mdi-chevron-down accordion-arrow"></i> */}
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
                                  {/* <Collapse in={open} appear> */}
                                  <div>
                                      <Card.Body>
                                          <Form.Group
                                              as={Row}
                                              className="mb-3"
                                              controlId="degree"
                                          >
                                              <Form.Label
                                                  column
                                                  sm={3}
                                                  className="d-flex flex-row-reverse"
                                              >
                                                  Degree
                                              </Form.Label>

                                              <Col sm={9}>
                                                  <Form.Control
                                                      type="text"
                                                      name="degree"
                                                      id="degree"
                                                      placeholder="Enter Your Degree"
                                                      required
                                                      
                                                      value={
                                                          item
                                                              ? item.degree
                                                              : ""
                                                      }
                                                      // onChange={handleInputChange('aDegree')}
                                                  />
                                                  <Form.Control.Feedback type="invalid">
                                                      Please choose a Degree.
                                                  </Form.Control.Feedback>
                                              </Col>
                                          </Form.Group>

                                          <Form.Group as={Row} className="mb-3">
                                              <Form.Label
                                                  htmlFor="colleagename"
                                                  column
                                                  sm={3}
                                                  className="d-flex flex-row-reverse"
                                              >
                                                  College Name
                                              </Form.Label>

                                              <Col sm={9}>
                                                  <Form.Control
                                                      type="text"
                                                      name="collegename"
                                                      id="exampleDegree3"
                                                      placeholder="Enter Your College Name"
                                                      required
                                                      type="text"
                                                      // onChange={(e) => setDegree(e.target.value)}
                                                      value={
                                                          item
                                                              ? item.college
                                                              : ""
                                                      }
                                                      // onChange={handleInputChange('college')}
                                                  />
                                                  <Form.Control.Feedback type="invalid">
                                                      Please choose a College
                                                      Name.
                                                  </Form.Control.Feedback>
                                              </Col>
                                          </Form.Group>
                                          <Form.Group as={Row} className="mb-3">
                                              <Form.Label
                                                  htmlFor="Year"
                                                  column
                                                  sm={3}
                                                  className="d-flex flex-row-reverse"
                                              >
                                                  Academic Year
                                              </Form.Label>
                                              <Col className="d-flex flex-row ">
                                                  <Form.Label
                                                      className="pt-2"
                                                      column
                                                      sm={2}
                                                  >
                                                      From
                                                  </Form.Label>
                                                  {/* <Form.Control type="date" name="fromyear" id="fromyear" required type="date"
                            //  onChange={(e) => setPnumber(e.target.value)} 
                            /> */}
                                                  <div className="input-group">
                                                      <DatePicker
                                                          className="form-control"
                                                          value={
                                                              item
                                                                  ? item.start_year
                                                                  : ""
                                                          }
                                                          // selected={item.}
                                                          // startDate={acadmiStart}
                                                          // endDate={acadmiEnd}
                                                          // dateFormat="yyyy"
                                                          // showYearPicker
                                                          // defaultShow={doctor ? doctor.start_year : ''}
                                                          // onChange={(date) => {
                                                          //     setAcadmiStart(date);
                                                          // }}
                                                          // defaultValue={defaultValue}
                                                      />
                                                  </div>
                                                  <Form.Control.Feedback type="invalid">
                                                      Please choose a Academic
                                                      Year From.
                                                  </Form.Control.Feedback>
                                              </Col>
                                              <Col className="d-flex flex-row">
                                                  <Form.Label
                                                      className="pt-2 mr-3"
                                                      column
                                                      sm={2}
                                                  >
                                                      To
                                                  </Form.Label>
                                                  <DatePicker
                                                      className="form-control"
                                                      hideAddon={true}
                                                      value={
                                                          item
                                                              ? item.end_year
                                                              : ""
                                                      }
                                                      // selected={}
                                                      // startDate={acadmiStart}
                                                      // endDate={acadmiEnd}
                                                      // dateFormat="yyyy"
                                                      // showYearPicker
                                                      // onChange={(date) => {
                                                      //     setAcadmiEnd(date);
                                                      // }}
                                                  />
                                                  {/* <Form.Control type="year" name="toyear" id="toyear" required type="date"
                            //  onChange={(e) => setPnumber(e.target.value)} 
                            /> */}
                                                  {/* <input type="/> */}
                                                  <Form.Control.Feedback type="invalid">
                                                      Please choose a Academic
                                                      Year to.
                                                  </Form.Control.Feedback>
                                              </Col>
                                          </Form.Group>
                                          <Form.Group as={Row} className="mb-3">
                                              <Form.Label
                                                  htmlFor="coutntry"
                                                  column
                                                  sm={3}
                                                  className="d-flex flex-row-reverse"
                                              >
                                                  Country
                                              </Form.Label>

                                              <Col sm={9}>
                                                  <Form.Control
                                                      type="text"
                                                      name="coutnry"
                                                      id="country"
                                                      placeholder="Enter Your Country"
                                                      required
                                                      
                                                      //  onChange={(e) => setPnumber(e.target.value)}
                                                      value={
                                                          item
                                                              ? item.country
                                                              : ""
                                                      }
                                                      // onChange={handleInputChange('aCountry')}
                                                  />
                                                  <Form.Control.Feedback type="invalid">
                                                      Please choose a Country.
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
            <Modal size="lg" show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Academic Information</Modal.Title>
                </Modal.Header>
                <Form
                    noValidate
                    validated={validated}
                    onSubmit={handleAddAcadmicSubmit}
                >
                    <Modal.Body>
                        <Form.Group
                            as={Row}
                            className="mb-3"
                            controlId="degree"
                        >
                            <Form.Label
                                column
                                sm={3}
                                className="d-flex flex-row-reverse"
                            >
                                Degree
                            </Form.Label>

                            <Col sm={9}>
                                <Form.Control
                                    type="text"
                                    name="adddegree"
                                    id="adddegree"
                                    placeholder="Enter Your Degree"
                                    required
                                    value={degree}
                                    onChange={(e) => setDegree(e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please choose a Degree.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label
                                htmlFor="colleagename"
                                column
                                sm={3}
                                className="d-flex flex-row-reverse"
                            >
                                College Name
                            </Form.Label>

                            <Col sm={9}>
                                <Form.Control
                                    type="text"
                                    name="collegename"
                                    id="exampleDegree3"
                                    placeholder="Enter Your College Name"
                                    required
                                    value={college}
                                    onChange={(e) => setCollege(e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please choose a College Name.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label
                                htmlFor="Year"
                                column
                                sm={3}
                                className="d-flex flex-row-reverse"
                            >
                                Academic Year
                            </Form.Label>
                            <Col className="d-flex flex-row ">
                                <Form.Label className="pt-2" column sm={2}>
                                    From
                                </Form.Label>
                                {/* <Form.Control type="date" name="fromyear" id="fromyear" required type="date"
                            //  onChange={(e) => setPnumber(e.target.value)} 
                            /> */}
                                <div className="input-group">
                                    <DatePicker
                                        className="form-control"
                                        name="startdate"
                                        selected={acadmicyearstart}
                                        selectsStart
                                        startDate={acadmicyearstart}
                                        endDate={acadmicyearend}
                                        dateFormat="yyyy"
                                        showYearPicker
                                        onChange={(date) => {
                                            setAcadmicyearstart(date);
                                        }}
                                    />
                                </div>
                                <Form.Control.Feedback type="invalid">
                                    Please choose a Academic Year From.
                                </Form.Control.Feedback>
                            </Col>
                            <Col className="d-flex flex-row">
                                <Form.Label className="pt-2 mr-3" column sm={2}>
                                    To
                                </Form.Label>
                                <DatePicker
                                    className="form-control"
                                    hideAddon={true}
                                    name="enddate"
                                    selected={acadmicyearend}
                                    selectsEnd
                                    startDate={acadmicyearstart}
                                    endDate={acadmicyearend}
                                    minDate={acadmicyearstart}
                                    dateFormat="yyyy"
                                    showYearPicker
                                    onChange={(date) => {
                                        setAcadmicyearend(date);
                                    }}
                                />

                                <Form.Control.Feedback type="invalid">
                                    Please choose a Academic Year
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label
                                htmlFor="coutntry"
                                column
                                sm={3}
                                className="d-flex flex-row-reverse"
                            >
                                Country
                            </Form.Label>

                            <Col sm={9}>
                                <Form.Control
                                    type="text"
                                    name="coutnry"
                                    id="country"
                                    placeholder="Enter Your Country"
                                    required
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please choose a Country.
                                </Form.Control.Feedback>
                            </Col>
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

            {/* Edit Acadmic Data */}
            <Modal size="lg" show={editshow} onHide={handleEditClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Academic Information</Modal.Title>
                </Modal.Header>
                <Form
                    noValidate
                    validated={validated}
                    onSubmit={handleEditAcadmicSubmit}
                >
                    <Modal.Body>
                        <Form.Group
                            as={Row}
                            className="mb-3"
                            controlId="degree"
                        >
                            <Form.Label
                                column
                                sm={3}
                                className="d-flex flex-row-reverse"
                            >
                                Degree
                            </Form.Label>

                            <Col sm={9}>
                                <Form.Control
                                    type="text"
                                    name="adddegree"
                                    id="adddegree"
                                    placeholder="Enter Your Degree"
                                    required
                                    value={modalData ? modalData.degree : ""}
                                    onChange={handleInputChange("degree")}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please choose a Degree.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label
                                htmlFor="colleagename"
                                column
                                sm={3}
                                className="d-flex flex-row-reverse"
                            >
                                College Name
                            </Form.Label>

                            <Col sm={9}>
                                <Form.Control
                                    type="text"
                                    name="collegename"
                                    id="exampleDegree3"
                                    placeholder="Enter Your College Name"
                                    required
                                    value={modalData ? modalData.college : ""}
                                    onChange={handleInputChange("college")}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please choose a College Name.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label
                                htmlFor="Year"
                                column
                                sm={3}
                                className="d-flex flex-row-reverse"
                            >
                                Acadmic Year
                            </Form.Label>
                            <Col className="d-flex flex-row ">
                                <Form.Label className="pt-2" column sm={2}>
                                    From
                                </Form.Label>
                                {/* <Form.Control type="date" name="fromyear" id="fromyear" required type="date"
                            //  onChange={(e) => setPnumber(e.target.value)} 
                            /> */}
                                <div className="input-group">
                                    {console.log(
                                        "editstartdate",
                                        editstartdate
                                    )}
                                    <DatePicker
                                        className="form-control"
                                        name="startdate"
                                        value={
                                            modalData
                                                ? modalData.start_year
                                                : ""
                                        }
                                        selected={editstartdate}
                                        selectsStart
                                        startDate={editstartdate}
                                        endDate={editendate}
                                        onChange={(date) => {
                                            setEditstartdate(date);
                                        }}
                                        showYearPicker
                                        dateFormat="yyyy"
                                    />
                                </div>
                                <Form.Control.Feedback type="invalid">
                                    Please choose a Acadmic Year From.
                                </Form.Control.Feedback>
                            </Col>
                            <Col className="d-flex flex-row">
                                <Form.Label className="pt-2 mr-3" column sm={2}>
                                    To
                                </Form.Label>
                                <DatePicker
                                    className="form-control"
                                    hideAddon={true}
                                    value={modalData ? modalData.end_year : ""}
                                    selected={editendate}
                                    selectsEnd
                                    startDate={editstartdate}
                                    endDate={editendate}
                                    minDate={editstartdate}
                                    onChange={(date) => {
                                        setEditendate(date);
                                    }}
                                    showYearPicker
                                    dateFormat="yyyy"
                                />

                                <Form.Control.Feedback type="invalid">
                                    Please choose a Acadmic Year
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label
                                htmlFor="coutntry"
                                column
                                sm={3}
                                className="d-flex flex-row-reverse"
                            >
                                Country
                            </Form.Label>

                            <Col sm={9}>
                                <Form.Control
                                    type="text"
                                    name="coutnry"
                                    id="country"
                                    placeholder="Enter Your Country"
                                    required
                                    value={modalData ? modalData.country : ""}
                                    onChange={handleInputChange("country")}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please choose a Country.
                                </Form.Control.Feedback>
                            </Col>
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
            <Form.Group as={Row} className="mb-3 mt-3">
                <div className="d-grid">
                    <Button onClick={handleShow} variant="outline-primary">
                        <i
                            class="mdi mdi-plus"
                            style={{ marginRight: "10px" }}
                        ></i>
                        Add Academic Information
                    </Button>
                </div>
            </Form.Group>
        </div>
    );
};
export default Acadminc;
