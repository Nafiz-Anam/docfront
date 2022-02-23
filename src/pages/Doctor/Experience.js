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
import { modalGlobalConfig } from "antd/lib/modal/confirm";
import HyperDatepicker from "../../components/Datepicker";

//professional Information

const Experience = () => {
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const loggedInUser = JSON.parse(window.localStorage.getItem("token"));
    const token = loggedInUser.token;
    const doctorid = location.pathname.split("/")[3];
    const [experience, setExperience] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [validated, setValidated] = useState(false);

    const toggle = () => {
        setOpen((prevState) => !prevState);
    };
    useEffect(() => {
        fetch(
            API_BASE_URL +
                `/admin/doctor_experiences/get_by_doctor_id?token=${token}&doctor_id=${doctorid}`,
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
                setExperience(result.data);
            })
            .catch((error) => console.log(error));
    }, [doctorid, token]);

    // open and close Add Modal
    const [showModal, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //Add Expirence function
    const [designation, setDesignation] = useState("");
    const [institude, setInstitude] = useState("");
    const [startyear, setStartyear] = useState(new Date());
    const [endyear, setEndyear] = useState(new Date());
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");

    const handleAddExpirenceSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            let data = {
                doctor_id: doctorid,
                institude: institude,
                designation: designation,
                start_date: startyear.toISOString().split("-", 1),
                end_date: endyear.toISOString().split("-", 1),
                country: country,
                city: city,
            };
            console.log("Add Acadminc", data);
            fetch(
                API_BASE_URL + `/admin/doctors/add_experience?token=${token}`,
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
                    console.log("Expirence Data Updated", result);
                    if (result.status == 1) {
                        toast.success("Expirence Added Succesfully");
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

    // Edit function for Expirence
    const [editshow, setEditshow] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [startedityear, setStartedityear] = useState(new Date());
    // console.log("startedityear", startedityear)
    const [endedityear, setEndedityear] = useState(new Date());
    const handleEditClose = () => setEditshow(false);

    const handleEditShow = () => setEditshow(true);

    const handleInputChange = (key) => (event) => {
        setModalData({
            ...modalData,
            [key]: event.target.value,
        });
    };

    const handleEditExpirenceSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            let data = {
                id: modalData.id,
                institude: modalData.institude,
                designation: modalData.designation,
                start_date: startedityear.toISOString().split("-", 1),
                end_date: endedityear.toISOString().split("-", 1),
                country: modalData.country,
                city: modalData.city,
            };
            console.log("Edit Acadminc", data);
            fetch(
                API_BASE_URL +
                    `/admin/doctors/update_experience?token=${token}`,
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
                        toast.success("Expirenece Data Updated Succesfully");
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
            {experience.length == 0
                ? "Data Is Not Available In Expert Information"
                : experience.map((item, index) => {
                      return (
                          <div key={index}>
                              <Card className="mb-0">
                                  <Card.Header>
                                      <h5 className="m-0">
                                          <Link
                                              to="#"
                                              className={classNames(
                                                  "custom-accordion-title d-block py-1",
                                                  { collapsed: open !== true }
                                              )}
                                              onClick={toggle}
                                              aria-controls={"collapse" + index}
                                              aria-expanded={open}
                                          >
                                              Expeirence Infromation #
                                              {index + 1}
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
                                          console.log("item", item);

                                          setModalData(item);
                                          // setStartedityear(item ? item.start_date : '')
                                          handleEditShow();
                                      }}
                                  ></i>
                                  {/* {console.log('modaldat', modalData)} */}
                                  {/* <Collapse in={open} appear> */}
                                  <div>
                                      <Card.Body>
                                          <Form.Group as={Row} className="mb-3">
                                              <Form.Label
                                                  htmlFor="designation"
                                                  column
                                                  sm={3}
                                                  className="d-flex flex-row-reverse"
                                              >
                                                  Designation
                                              </Form.Label>

                                              <Col sm={9}>
                                                  <Form.Control
                                                      type="text"
                                                      name="desgination"
                                                      id="exampleNumber3"
                                                      placeholder="Enter Your Designation"
                                                      required
                                                      value={
                                                          item
                                                              ? item.designation
                                                              : ""
                                                      }
                                                      // onChange={handleInputChange('designation')}

                                                      //  onChange={(e) => setPnumber(e.target.value)}
                                                  />
                                                  <Form.Control.Feedback type="invalid">
                                                      Please choose a
                                                      Designation.
                                                  </Form.Control.Feedback>
                                              </Col>
                                          </Form.Group>
                                          <Form.Group as={Row} className="mb-3">
                                              <Form.Label
                                                  htmlFor="Institute"
                                                  column
                                                  sm={3}
                                                  className="d-flex flex-row-reverse"
                                              >
                                                  Institute
                                              </Form.Label>

                                              <Col sm={9}>
                                                  <Form.Control
                                                      type="text"
                                                      name="Institute"
                                                      id="Institute"
                                                      placeholder="Enter Your Institute"
                                                      required
                                                      //  onChange={(e) => setPnumber(e.target.value)}
                                                      value={
                                                          item
                                                              ? item.institude
                                                              : ""
                                                      }
                                                      // onChange={handleInputChange('institude')}
                                                  />
                                                  <Form.Control.Feedback type="invalid">
                                                      Please choose a Institute.
                                                  </Form.Control.Feedback>
                                              </Col>
                                          </Form.Group>

                                          <Form.Group as={Row} className="mb-3">
                                              <Form.Label
                                                  htmlFor="city"
                                                  column
                                                  sm={3}
                                                  className="d-flex flex-row-reverse"
                                              >
                                                  Experience Year
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
                                                          hideAddon={true}
                                                          value={
                                                              item
                                                                  ? item.start_date
                                                                  : ""
                                                          }
                                                          selected={
                                                              selectedDate
                                                          }
                                                          // startDate={selectedDate}
                                                          // endDate={toDate}
                                                          // dateFormat="yyyy/MM/dd"
                                                          // defaultValue='2020/2/1'
                                                          // showYearPicker

                                                          onChange={(date) => {
                                                              setSelectedDate(
                                                                  date
                                                              );
                                                          }}
                                                      />
                                                  </div>
                                                  {/* <div>{item.start_date}</div> */}
                                                  <Form.Control.Feedback type="invalid">
                                                      Please choose a Experience
                                                      From.
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
                                                              ? item.end_date
                                                              : ""
                                                      }
                                                      // selected={toDate}
                                                      // startDate={selectedDate}
                                                      // endDate={toDate}
                                                      // dateFormat="yyyy-mm-dd"
                                                      // showYearPicker
                                                      // onChange={(date) => {
                                                      //     setToDate(date);
                                                      // }}
                                                  />
                                                  {/* <Form.Control type="year" name="toyear" id="toyear" required type="date"
                            //  onChange={(e) => setPnumber(e.target.value)} 
                            /> */}
                                                  {/* <input type="/> */}
                                                  <Form.Control.Feedback type="invalid">
                                                      Please choose a Experience
                                                      to.
                                                  </Form.Control.Feedback>
                                              </Col>
                                          </Form.Group>
                                          <Form.Group as={Row} className="mb-3">
                                              <Form.Label
                                                  htmlFor="city"
                                                  column
                                                  sm={3}
                                                  className="d-flex flex-row-reverse"
                                              >
                                                  City
                                              </Form.Label>

                                              <Col sm={9}>
                                                  <Form.Control
                                                      type="text"
                                                      name="city"
                                                      id="city"
                                                      placeholder="Enter Your City"
                                                      required
                                                      //  onChange={(e) => setPnumber(e.target.value)}
                                                      value={
                                                          item ? item.city : ""
                                                      }
                                                      // onChange={handleInputChange('city')}
                                                  />
                                                  <Form.Control.Feedback type="invalid">
                                                      Please choose a City.
                                                  </Form.Control.Feedback>
                                              </Col>
                                          </Form.Group>

                                          <Form.Group as={Row} className="mb-3">
                                              <Form.Label
                                                  htmlFor="degreecoutntry"
                                                  column
                                                  sm={3}
                                                  className="d-flex flex-row-reverse"
                                              >
                                                  Country
                                              </Form.Label>

                                              <Col sm={9}>
                                                  <Form.Control
                                                      type="text"
                                                      name="degrrecoutnry"
                                                      id="degreecountry"
                                                      placeholder="Enter Your Country"
                                                      required
                                                      //  onChange={(e) => setPnumber(e.target.value)}
                                                      value={
                                                          item
                                                              ? item.country
                                                              : ""
                                                      }
                                                      // onChange={handleInputChange('country')}
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

            {/* Add Modal for Expirence */}

            <Modal size="lg" show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Expeirence</Modal.Title>
                </Modal.Header>
                <Form
                    noValidate
                    validated={validated}
                    onSubmit={handleAddExpirenceSubmit}
                >
                    <Modal.Body>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label
                                htmlFor="designation"
                                column
                                sm={3}
                                className="d-flex flex-row-reverse"
                            >
                                Designation
                            </Form.Label>

                            <Col sm={9}>
                                <Form.Control
                                    type="text"
                                    name="desgination"
                                    id="exampleNumber3"
                                    placeholder="Enter Your Designation"
                                    required
                                    value={designation}
                                    onChange={(e) =>
                                        setDesignation(e.target.value)
                                    }
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please choose a Designation.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label
                                htmlFor="Institute"
                                column
                                sm={3}
                                className="d-flex flex-row-reverse"
                            >
                                Institute
                            </Form.Label>

                            <Col sm={9}>
                                <Form.Control
                                    type="text"
                                    name="Institute"
                                    id="Institute"
                                    placeholder="Enter Your Institute"
                                    required
                                    value={institude}
                                    onChange={(e) =>
                                        setInstitude(e.target.value)
                                    }
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please choose a Institute.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label
                                htmlFor="city"
                                column
                                sm={3}
                                className="d-flex flex-row-reverse"
                            >
                                Experience Year
                            </Form.Label>

                            <Col className="d-flex flex-row ">
                                <Form.Label className="pt-2" column sm={2}>
                                    From
                                </Form.Label>

                                <div className="input-group">
                                    <DatePicker
                                        className="form-control"
                                        hideAddon={true}
                                        value={startyear}
                                        selected={startyear}
                                        selectsStart
                                        startDate={startyear}
                                        endDate={endyear}
                                        dateFormat="yyyy"
                                        showYearPicker
                                        onChange={(date) => {
                                            setStartyear(date);
                                        }}
                                    />
                                </div>

                                <Form.Control.Feedback type="invalid">
                                    Please choose a Experience From.
                                </Form.Control.Feedback>
                            </Col>
                            <Col className="d-flex flex-row">
                                <Form.Label className="pt-2 mr-3" column sm={2}>
                                    To
                                </Form.Label>
                                <DatePicker
                                    className="form-control"
                                    hideAddon={true}
                                    value={endyear}
                                    selected={endyear}
                                    selectsEnd
                                    startDate={startyear}
                                    endDate={endyear}
                                    minDate={startyear}
                                    dateFormat="yyyy"
                                    showYearPicker
                                    onChange={(date) => {
                                        setEndyear(date);
                                    }}
                                />

                                <Form.Control.Feedback type="invalid">
                                    Please choose a Experience to.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label
                                htmlFor="city"
                                column
                                sm={3}
                                className="d-flex flex-row-reverse"
                            >
                                City
                            </Form.Label>

                            <Col sm={9}>
                                <Form.Control
                                    type="text"
                                    name="city"
                                    id="city"
                                    placeholder="Enter Your City"
                                    required
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    // onChange={handleInputChange('city')}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please choose a City.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label
                                htmlFor="degreecoutntry"
                                column
                                sm={3}
                                className="d-flex flex-row-reverse"
                            >
                                Country
                            </Form.Label>

                            <Col sm={9}>
                                <Form.Control
                                    type="text"
                                    name="degrrecoutnry"
                                    id="degreecountry"
                                    placeholder="Enter Your Country"
                                    required
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    // onChange={handleInputChange('country')}
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
            <Form.Group as={Row} className="mb-3 mt-3">
                <div className="d-grid">
                    <Button onClick={handleShow} variant="outline-primary">
                        <i
                            class="mdi mdi-plus"
                            style={{ marginRight: "10px" }}
                        ></i>
                        Add Experience
                    </Button>
                </div>
            </Form.Group>

            {/* Edit Modal For Expirence */}

            <Modal size="lg" show={editshow} onHide={handleEditClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Experience</Modal.Title>
                </Modal.Header>
                <Form
                    noValidate
                    validated={validated}
                    onSubmit={handleEditExpirenceSubmit}
                >
                    <Modal.Body>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label
                                htmlFor="designation"
                                column
                                sm={3}
                                className="d-flex flex-row-reverse"
                            >
                                Designation
                            </Form.Label>

                            <Col sm={9}>
                                <Form.Control
                                    type="text"
                                    name="desgination"
                                    id="exampleNumber3"
                                    placeholder="Enter Your Designation"
                                    required
                                    value={
                                        modalData ? modalData.designation : ""
                                    }
                                    onChange={handleInputChange("designation")}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please choose a Designation.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label
                                htmlFor="Institute"
                                column
                                sm={3}
                                className="d-flex flex-row-reverse"
                            >
                                Institute
                            </Form.Label>

                            <Col sm={9}>
                                <Form.Control
                                    type="text"
                                    name="Institute"
                                    id="Institute"
                                    placeholder="Enter Your Institute"
                                    required
                                    value={modalData ? modalData.institude : ""}
                                    onChange={handleInputChange("institude")}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please choose a Institute.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label
                                htmlFor="city"
                                column
                                sm={3}
                                className="d-flex flex-row-reverse"
                            >
                                Experience Year
                            </Form.Label>

                            <Col className="d-flex flex-row ">
                                <Form.Label className="pt-2" column sm={2}>
                                    From
                                </Form.Label>

                                <div className="input-group">
                                    <DatePicker
                                        className="form-control"
                                        hideAddon={true}
                                        name="editstart"
                                        // date={date}
                                        // isClearable
                                        value={
                                            modalData
                                                ? modalData.start_date
                                                : ""
                                        }
                                        selected={startedityear}
                                        selectsStart
                                        startDate={startedityear}
                                        endDate={endedityear}
                                        dateFormat="yyyy"
                                        showYearPicker
                                        onChange={(date) =>
                                            setStartedityear(date)
                                        }
                                    />
                                </div>

                                <Form.Control.Feedback type="invalid">
                                    Please choose a Experience From.
                                </Form.Control.Feedback>
                            </Col>
                            <Col className="d-flex flex-row">
                                <Form.Label className="pt-2 mr-3" column sm={2}>
                                    To
                                </Form.Label>
                                <DatePicker
                                    className="form-control"
                                    hideAddon={true}
                                    name="editend"
                                    // isClearable
                                    value={modalData ? modalData.end_date : ""}
                                    selected={endedityear}
                                    selectsEnd
                                    startDate={startedityear}
                                    endDate={endedityear}
                                    minDate={startedityear}
                                    dateFormat="yyyy"
                                    showYearPicker
                                    onChange={(date) => {
                                        setEndedityear(date);
                                    }}
                                />

                                <Form.Control.Feedback type="invalid">
                                    Please choose a Experience to.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label
                                htmlFor="city"
                                column
                                sm={3}
                                className="d-flex flex-row-reverse"
                            >
                                City
                            </Form.Label>

                            <Col sm={9}>
                                <Form.Control
                                    type="text"
                                    name="city"
                                    id="city"
                                    placeholder="Enter Your City"
                                    required
                                    value={modalData ? modalData.city : ""}
                                    onChange={handleInputChange("city")}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please choose a City.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label
                                htmlFor="degreecoutntry"
                                column
                                sm={3}
                                className="d-flex flex-row-reverse"
                            >
                                Country
                            </Form.Label>

                            <Col sm={9}>
                                <Form.Control
                                    type="text"
                                    name="degrrecoutnry"
                                    id="degreecountry"
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
                        <Button variant="primary">Save Changes</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
};
export default Experience;
