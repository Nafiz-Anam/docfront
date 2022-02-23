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
} from "react-bootstrap";
import Select from "react-select";
import PageTitle from "../../components/PageTitle";
import { useHistory, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { API_BASE_URL } from "../../apiconstant";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import defaultimage from "./defaultimage.jpg";
import "./doctor.css";
import { Radio } from "antd";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import CustomAccordions from "./CustomAccordions";
import Acadminc from "./Acadminc";
import Experience from "./Experience";
import Membership from "./Membership";

//professional Information

const EditDoctor = (props) => {
    const history = useHistory();
    const [validated, setValidated] = useState(false);
    const location = useLocation();
    const doctorid = location.pathname.split("/")[3];

    const loggedInUser = JSON.parse(window.localStorage.getItem("token"));
    const token = loggedInUser.token;
    const [doctor, setDoctor] = useState();
    // console.log('doctordata', doctor && doctor.doctor_expertises)
    const [category, setCategory] = useState(
        []
        // { value: props.location.state && props.location.state.category_name }
    );
    // console.log('category', category);

    const [categorydrop, setCategorydrop] = useState("");
    // console.log('categorydrop', categorydrop);
    const [expertise, setExpertise] = useState({
        value:
            props.location.state &&
            props.location.state.doctor_expertises?.split(","),
    });
    console.log("expertise", expertise);
    const [expertisedrop, setExpertisedrop] = useState("");
    // console.log('expertiseprop', props.location.state.doctor_expertises);
    // console.log("expertisedrop", expertisedrop);
    const [pdefaultImage, setPdefaultImage] = useState("");
    const [categoryId, setcategoryId] = useState("");
    // console.log('categoryId', categoryId);
    const [pimage, setPimage] = useState("");
    const [spin, setSpin] = useState(false);
    const [availability, setAvailibility] = useState("");
    const [clinic, setClinic] = useState([]);
    // console.log('clinicdata', clinic)
    const [clinicimage, setClinicimage] = useState("");
    const [clinictime, setClinictime] = useState("");

    const [phonenumber, setPhonenumber] = useState({
        phone: props.location.state ? props.location.state.mobile_no : "",
    });
    // console.log('phonenumber', phonenumber);
    const [clinicnumber, setClinicnumber] = useState("");
    // console.log('clinicnumber', clinicnumber);
    const [clinicimg, setClinicimg] = useState("");

    // const cliniclocation = clinic && clinic.clinic_map_location;
    // console.log('location', cliniclocation)

    // const googleMapsApiKey = "AIzaSyCjrlrZWWNd4LPaTBTbAYeYsZd83gi-gt4";
    //clinic image handel

    // drop down default functionality

    let defaultcategory =
        props.location.state && props.location.state.category_name;
    console.log("defaultcategory", defaultcategory);

    let defaultcategoryselected = category.filter((category) => {
        return category.label === defaultcategory;
    });
    console.log("defaultcategoryselected", defaultcategoryselected);
    // let abc = JSON.stringify(defaultcategoryselected)
    // console.log('abc', abc);

    // nafiz
    // let defaultexpertise =
    //     props.location.state &&
    //     props.location.state.doctor_expertises?.split(",");
    // console.log("defaultexpertise", defaultexpertise);

    // const defaultid = (defid) =>{
    //     defid !=
    // }
    // let defaultexpertiseselected = expertise.filter(expertise => { return expertise.label });
    // console.log('defaultexpertiseselected', defaultexpertiseselected);

    const _handleImgClinic = (e, i) => {
        e.preventDefault();

        if (!(e.target.files && e.target.files[0])) {
            setSpin(false);
        } else {
            setClinicimage(URL.createObjectURL(e.target.files[0]));
            setClinicimg(clinicimage);
            setClinicimg(e.target.files[0]);
        }
        setSpin(true);
    };

    //personal data info

    const doctorCategory = () => {
        fetch(API_BASE_URL + `/admin/doctor_category/get?token=${token}`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        })
            .then((response) => response.json())
            .then((result) => {
                // console.log(result);
                let one = result.data;
                let categoryname = one.map((element) => ({
                    label: element.category_name,
                    value: element.id,
                }));
                setCategory(categoryname);
            });
    };

    const handleCategorydrop = (catname) => {
        catname !== null && setCategorydrop(catname.value);
        catname !== null &&
            setcategoryId(catname && JSON.stringify(catname.value));
        // console.log('catname', catname);
    };
    // console.log('categoryId', categoryId)

    //nafiz
    

    const Experty = () => {
        fetch(
            API_BASE_URL +
                `/admin/expertises/get?token=${token}&category_id=${categoryId}`,
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
                console.log(result);
                // nafiz
                // let one = result.data;
                // let expertname = one.map((element) => ({
                //     label: element.expertise_name,
                //     value: element.id,
                // }));
                // setExpertise(expertname);
            });
        // // setExpertisedrop(expertise);
        // let expertidropsend = expertisedrop.map(element => ({ label: element.expertise_name, value: element.id }))
        // setExpertisedrop(expertidropsend)
        // let dropdowndefaultvalue = (expertisedrop).map(element => ({ label: element.expertise_name, value: element.id }))
        // setExpertise(expertisedrop)
        // console.log('expertiseformdropdowndefaultvalue', expertise)
        // let dropdowndefaultvalue = expertise.map((eve) => ({

        //     label: eve.expertise_name, value: eve.id

        // }))
        // setExpertisedrop(dropdowndefaultvalue)
        // console.log('dropdowndefaultvalue', dropdowndefaultvalue);
    };

    useEffect(() => {
        Experty();
    }, []);
    //nafiz
    // }, [categoryId]);

    const handleExpertydrop = (expname) => {
        expname !== null && setExpertisedrop(expname.value);
        // setExpertisedrop({ value: expname && expname.value });
    };

    // nafiz
    // useEffect(() => {
    //     console.log("catgoryid", categoryId);
    //     // Experty();
    //     // setcategoryId(defaultcategoryselected)
    //     // console.log('categoryId', categoryId)
    //     // setExpertisedrop(defaultexpertise)
    //     // console.log('defaultexpertidrop', expertisedrop)
    //     // defaultdrop();
    //     // setcategoryId(JSON.stringify(defaultcategoryselected.value));
    //     // console.log('categorydrop by id', categoryId);
    //     // let expertisedefualt = props.location.state && (props.location.state.doctor_expertises)?.split('');
    //     // console.log('expertisedefualt', expertisedefualt ? expertisedefualt : "")

    //     // console.log('expertisebyexpertisedefualt', expertise ? expertise : '');
    //     // expertise.map((item) => {

    //     //     setExpertisedrop(item.label);
    //     //     console.log('lable', item.label);

    //     // })

    //     // console.log('expertisedropdefaultmap', expertisedrop);
    //     // setExpertisedrop('fkadjflakd');

    //     // console.log('jgjkjjkl');
    //     // setExpertise(expertisedrop);
    // }, []);

    useEffect(() => {
        doctorCategory();
        fetch(
            API_BASE_URL +
                `/admin/doctors/get_by_id?token=${token}&id=${doctorid}`,
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
                // console.log("doctorgetbyid", result);
                setDoctor(result.data[0]);
                setPdefaultImage(result.data[0].profile_img);
            })
            .catch((error) => console.log(error));

        // console.log(doctor);
        // console.log(category)
        //availability data

        fetch(
            API_BASE_URL +
                `/admin/doctor_availability/get_by_doctor_id?token=${token}&doctor_id=${doctorid}`,
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
                // console.log('avalibilityresult', result);
                setAvailibility(result.data);
            })
            .catch((error) => console.log(error));

        //clinic information
        fetch(
            API_BASE_URL +
                `/admin/doctor_clinics/get_by_doctor_id?token=${token}&doctor_id=${doctorid}`,
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
                // console.log('result clinic', result.data);
                setClinic(result.data[0]);
                setClinicimage(result.data[0].clinic_img);
            })
            .catch((error) => console.log(error));
    }, [doctorid, token]);

    // console.log("availibility :", availability);
    let clinicid = clinic && clinic.id;
    // console.log('clinicid', clinicid);

    useEffect(() => {
        //clinic Time
        fetch(
            API_BASE_URL +
                `/admin/clinic_times/get_by_clinic_id?token=${token}&clinic_id=${clinicid}`,
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
                // console.log('result clinictime', result.data);
                setClinictime(result.data);
            })
            .catch((error) => console.log(error));
    }, [token, clinicid]);

    const handleInputChange = (key) => (event) => {
        setDoctor({
            ...doctor,
            [key]: event.target.value,
        });
    };

    const _handleImgChange2 = (e, i) => {
        e.preventDefault();

        // if (e.target.files && e.target.files[0]) {
        //     let reader = new FileReader();
        //     reader.onload = (ev) => {
        //         setFile2(ev.target.result);
        //     };
        //     reader.readAsDataURL(e.target.files[0]);
        // };

        if (!(e.target.files && e.target.files[0])) {
            setSpin(false);
        } else {
            setPdefaultImage(URL.createObjectURL(e.target.files[0]));
            setPimage(defaultimage);
            setPimage(e.target.files[0]);
        }
        setSpin(true);
    };

    //handle clicnic input change
    const handleClinicInputChange = (key) => (event) => {
        setClinic({
            ...clinic,
            [key]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            let data = new FormData();
            data.append("id", doctorid);
            data.append("category_id", categorydrop);
            data.append("first_name", doctor.first_name);
            data.append("middle_name", doctor.middle_name);
            data.append("last_name", doctor.last_name);
            data.append("email_id", doctor.email_id);
            data.append("mobile_no", String(phonenumber.phone));
            data.append("profile_img", pimage);
            // data.append("certificate_img", certificate);
            data.append("degree", doctor.degree);
            data.append("gender", doctor.gender);
            data.append("doctor_expertises", expertisedrop);
            console.log(
                doctor.category_id,
                doctor.first_name,
                doctor.middle_name,
                doctor.last_name,
                doctor.email_id,
                doctor.mobile_no,
                pimage,
                doctor.degree
            );
            // console.log(data);
            fetch(API_BASE_URL + `/admin/doctors/update?token=${token}`, {
                method: "post",
                // headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: data,
            })
                .then((response) => response.json())
                .then((result) => {
                    // console.log(result);
                    if (result.status !== 0) {
                        toast.success("Doctor Updated Successfully");
                        // console.log('succesfully updated');
                        setTimeout(() => {
                            history.push("/");
                        }, 3000);
                    } else {
                        toast.error(result.message);
                    }
                });

            //Clinic data update function
            let clinicdata = new FormData();
            clinicdata.append("id", clinicid);
            clinicdata.append("clinic_name", clinic.clinic_name);
            clinicdata.append("clinic_contact", clinic.clinic_contact);
            clinicdata.append("clinic_address", clinic.clinic_address);
            clinicdata.append("clinic_city", clinic.clinic_city);
            clinicdata.append("clinic_country", clinic.clinic_country);
            clinicdata.append(
                "clinic_map_location",
                clinic.clinic_map_location
            );
            clinicdata.append("clinic_img", clinicimg);

            // console.log(data);
            fetch(
                API_BASE_URL + `/admin/doctors/update_clinic?token=${token}`,
                {
                    method: "post",
                    // headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    body: clinicdata,
                }
            )
                .then((response) => response.json())
                .then((result) => {
                    // console.log(result);
                    if (result.status == 1) {
                        // toast.success('C Updated Successfully')
                        console.log("succesfully updated");
                        // setTimeout(() => {
                        //     history.push('/')
                        // }, 3000);
                    } else {
                        toast.error(result.message);
                    }
                });
        }
        setValidated(true);
    };

    const approveData = () => {
        fetch(API_BASE_URL + `/admin/doctors/changestatus?token=${token}`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                id: doctorid,
                application_status: "Approved",
            }),
        })
            .then((response) => response.json())
            .then((result) => {
                // console.log(result);
                if (result.status == 1) {
                    toast.success("Doctor Approved");
                    setTimeout(() => {
                        history.push("/");
                    }, 3000);
                } else {
                    toast.error(result.message);
                }
            });
    };

    const style = spin ? {} : { visibility: "hidden" };

    //spliting latitude and longitude
    const latlang = clinic && clinic.clinic_map_location;
    console.log("location", latlang);

    const latlong = latlang?.split(",");
    console.log("latlong", latlong);
    const latitude = parseFloat(latlang && latlong[0]);
    const longitude = parseFloat(latlang && latlong[1]);
    console.log("latitude", latitude);
    console.log("longitude", longitude);

    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: "Doctor", path: "/pages/doctor" },
                    {
                        label: "Doctor",
                        path: "/pages/editdoctor",
                        active: true,
                    },
                ]}
                title={"Doctor"}
            />

            <Card>
                <Card.Body>
                    <h4 className="header-title  mt-3 mb-3">Doctor</h4>

                    <Form
                        noValidate
                        validated={validated}
                        onSubmit={handleSubmit}
                    >
                        <h4>Personal Information</h4>
                        <hr />
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label
                                column
                                sm={3}
                                className="d-flex flex-row-reverse"
                            >
                                Profile Image
                            </Form.Label>

                            <Col sm={9}>
                                <Form.Control
                                    type="file"
                                    name="profile"
                                    id="profile"
                                    onChange={(e) => _handleImgChange2(e)}
                                />
                                <div className="col-xl-8 col-sm-7">
                                    {!spin && (
                                        <div className="col-xl-8 col-sm-7">
                                            <Spinner
                                                animation="border"
                                                variant="primary"
                                            />
                                        </div>
                                    )}
                                    {pdefaultImage != null ? (
                                        <img
                                            src={pdefaultImage}
                                            height="90px"
                                            width="90px"
                                            onLoad={_handleImgChange2}
                                            style={style}
                                            alt=""
                                        />
                                    ) : (
                                        <img
                                            src={defaultimage}
                                            height="90px"
                                            width="90px"
                                            onLoad={_handleImgChange2}
                                            style={style}
                                            alt=""
                                        />
                                    )}
                                </div>
                                <Form.Control.Feedback type="invalid">
                                    Please choose a profile image.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label
                                column
                                sm={3}
                                className="d-flex flex-row-reverse"
                            >
                                First Name
                            </Form.Label>

                            <Col sm={9}>
                                <Form.Control
                                    type="text"
                                    name="firstname"
                                    id="firstname"
                                    placeholder="Enter Your First Name"
                                    required
                                    value={doctor ? doctor.first_name : ""}
                                    onChange={handleInputChange("first_name")}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please choose a first name.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        {/* 
                    <Form.Group as={Row} className="mb-3" controlId="middle">
                        <Form.Label column sm={3} className='d-flex flex-row-reverse'>
                            Middle Name
                        </Form.Label>

                        <Col sm={9}>
                            <Form.Control type="text" name="middle" id="middle" placeholder="Enter Your Middle Name" required type="text"
                                value={doctor ? doctor.middle_name : ''}
                                onChange={handleInputChange('middle_name')} />
                            <Form.Control.Feedback type="invalid">
                                Please choose a middle name.
                            </Form.Control.Feedback>
                        </Col>

                    </Form.Group> */}

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label
                                column
                                sm={3}
                                className="d-flex flex-row-reverse"
                            >
                                Last Name
                            </Form.Label>

                            <Col sm={9}>
                                <Form.Control
                                    type="text"
                                    name="lastname"
                                    id="lastname"
                                    placeholder="Enter Your Last Name"
                                    required
                                    value={doctor ? doctor.last_name : ""}
                                    onChange={handleInputChange("last_name")}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please choose a last name.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label
                                column
                                sm={3}
                                className="d-flex flex-row-reverse"
                            >
                                Email
                            </Form.Label>

                            <Col sm={9}>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Enter Your Email"
                                    required
                                    value={doctor ? doctor.email_id : ""}
                                    onChange={handleInputChange("email_id")}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please choose a email.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label
                                column
                                sm={3}
                                className="d-flex flex-row-reverse"
                            >
                                Mobile Number
                            </Form.Label>

                            <Col sm={9}>
                                {/* <Form.Control type="text" name="mnumber" Id="mnumber" placeholder="Enter Your Phone Number" required type="text"

                                value={doctor ? doctor.mobile_no : ''}
                                onChange={handleInputChange('mobile_no')} /> */}

                                <PhoneInput
                                    // country={'us'}
                                    // inputProps={doctor ? doctor.mobile_no : ""}
                                    value={phonenumber.phone}
                                    onChange={(phone) =>
                                        setPhonenumber({ phone })
                                    }
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please choose a Phone Number.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label
                                htmlFor="gender"
                                column
                                sm={3}
                                className="d-flex flex-row-reverse"
                            >
                                Gender
                            </Form.Label>
                            <Col sm={9}>
                                <div className="d-flex pd-1 mt-1 form-check">
                                    <Radio.Group
                                        value={doctor ? doctor.gender : ""}
                                        onChange={handleInputChange("gender")}
                                        color="primary"
                                    >
                                        <Radio
                                            value="Male"
                                            style={{ marginRight: "10px" }}
                                        >
                                            Male
                                        </Radio>
                                        <Radio
                                            value="Female"
                                            style={{ marginRight: "10px" }}
                                        >
                                            Female
                                        </Radio>
                                        <Radio value="Other">Other</Radio>
                                    </Radio.Group>
                                </div>
                            </Col>
                        </Form.Group>

                        <h4>Professional Information</h4>
                        <hr />
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label
                                column
                                sm={3}
                                className="d-flex flex-row-reverse"
                            >
                                Category
                            </Form.Label>
                            {/* {console.log('defaultvalue', defaultcategoryselected[0])} */}
                            <Col sm={9}>
                                <Select
                                    // className="react-select"
                                    classNamePrefix="select"
                                    placeholder="Select Category"
                                    defaultInputValue={defaultcategory}
                                    options={category}
                                    onChange={handleCategorydrop}
                                    // defaultValue={category[0]}
                                    defaultValue={category[0]}
                                    // selected={category}
                                    // value={category}
                                    isClearable={true}
                                    isSearchable={true}
                                />

                                <Form.Control.Feedback type="invalid">
                                    Please choose a category.
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
                                Expertise
                            </Form.Label>

                            <Col sm={9}>
                                <Select
                                    className="react-select"
                                    classNamePrefix="select"
                                    placeholder="Select Category"
                                    // defaultInputValue={defaultexpertise}
                                    options={expertise}
                                    onChange={handleExpertydrop}
                                    defaultValue={expertise}
                                    // defaultValue={expertise[0]}
                                    // value={expertise.value}
                                    // value={props.location.state && props.location.state.doctor_expertises}
                                    isClearable={true}
                                    isSearchable={true}
                                    isMulti
                                />

                                <Form.Control.Feedback type="invalid">
                                    Please choose a expertise.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <h4>Medical License Information</h4>
                        <hr />
                        <Card>
                            <Card.Body>
                                <div className="accordion custom-accordion">
                                    <CustomAccordions />
                                </div>
                            </Card.Body>
                        </Card>

                        <h4> Availability</h4>
                        <hr />
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label
                                htmlFor="exampleCategory3"
                                column
                                sm={3}
                                className="d-flex flex-row-reverse"
                            >
                                Availability Time
                            </Form.Label>

                            <Col sm={9}>
                                <Form.Control
                                    type="text"
                                    name="availability"
                                    id="availability"
                                    placeholder="Enter Your availability"
                                    //  onChange={(e) => setPnumber(e.target.value)}
                                    // value={availability}
                                    // onChange={handleInputChange('slot')}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please choose a Country.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <h4>Academic</h4>
                        <hr />
                        <Card>
                            <Card.Body>
                                <div className="accordion custom-accordion">
                                    <Acadminc />
                                </div>
                            </Card.Body>
                        </Card>
                        <h4>Expeirence</h4>
                        <hr />
                        <Card>
                            <Card.Body>
                                <div className="accordion custom-accordion">
                                    <Experience />
                                </div>
                            </Card.Body>
                        </Card>

                        <h4>Membarships</h4>
                        <hr />
                        <Card>
                            <Card.Body>
                                <div className="accordion custom-accordion">
                                    <Membership />
                                </div>
                            </Card.Body>
                        </Card>
                        <h4>Clinic Information</h4>
                        <hr />
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label
                                htmlFor="clinicname"
                                column
                                sm={3}
                                className="d-flex flex-row-reverse"
                            >
                                Name
                            </Form.Label>

                            <Col sm={9}>
                                <Form.Control
                                    type="text"
                                    name="clinicname"
                                    id="clinicname"
                                    placeholder="Enter Your Clinic Name"
                                    required
                                    value={clinic ? clinic.clinic_name : ""}
                                    onChange={handleClinicInputChange(
                                        "clinic_name"
                                    )}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please choose a Clinic Name.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label
                                htmlFor="clinicadd"
                                column
                                sm={3}
                                className="d-flex flex-row-reverse"
                            >
                                Address
                            </Form.Label>

                            <Col sm={9}>
                                <Form.Control
                                    type="text"
                                    name="clinicadd"
                                    id="clinicadd"
                                    placeholder="Enter Your Clinic Address"
                                    required
                                    value={clinic ? clinic.clinic_address : ""}
                                    onChange={handleClinicInputChange(
                                        "clinic_address"
                                    )}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please choose a Clinic Address.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label
                                htmlFor="clinicname"
                                column
                                sm={3}
                                className="d-flex flex-row-reverse"
                            >
                                City
                            </Form.Label>

                            <Col sm={9}>
                                <Form.Control
                                    type="text"
                                    name="cliniccity"
                                    id="cliniccity"
                                    placeholder="Enter Your Clinic City"
                                    required
                                    value={clinic ? clinic.clinic_city : ""}
                                    onChange={handleClinicInputChange(
                                        "clinic_city"
                                    )}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please choose a Clinic City.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label
                                htmlFor="clinicname"
                                column
                                sm={3}
                                className="d-flex flex-row-reverse"
                            >
                                Country
                            </Form.Label>

                            <Col sm={9}>
                                <Form.Control
                                    type="text"
                                    name="cliniccountry"
                                    id="cliniccountry"
                                    placeholder="Enter Your Clinic Country"
                                    required
                                    value={clinic ? clinic.clinic_country : ""}
                                    onChange={handleClinicInputChange(
                                        "clinic_country"
                                    )}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please choose a Clinic Country.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label
                                htmlFor="clinicmap"
                                column
                                sm={3}
                                className="d-flex flex-row-reverse"
                            >
                                Location
                            </Form.Label>

                            <Col sm={9}>
                                {/* <Form.Control type="url" name="clinicmap" id="clinicmap" placeholder="Enter Your Clinic Location" required type="url"
                                value={clinic ? clinic.clinic_map_location : ''}
                            // onChange={(e) => setClinicmap(e.target.value)}
                            /> */}
                                {/* <iframe src="https://maps.googleapis.com/maps/api/geocode/json?latlang=${clinic ? clinic.clinic_map_location : ''}&key=AIzaSyCjrlrZWWNd4LPaTBTbAYeYsZd83gi-gt4" /> */}
                                {/* <iframe src={clinic && clinic.clinic_map_location} /> */}

                                <div
                                    className="gmaps"
                                    style={{
                                        position: "relative",
                                        overflow: "hidden",
                                    }}
                                >
                                    <Map
                                        google={window.google}
                                        resetBoundsOnResize
                                        zoom={18}
                                        center={{
                                            lat: latitude,
                                            lng: longitude,
                                        }}
                                        initialCenter={{
                                            lat: latitude,
                                            lng: longitude,
                                        }}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            position: "relative",
                                        }}
                                        zoomControlOptions={{
                                            position:
                                                props.google.maps
                                                    .ControlPosition.LEFT_TOP,
                                        }}
                                    >
                                        <Marker
                                            position={{
                                                lat: latitude,
                                                lng: longitude,
                                            }}
                                        ></Marker>
                                    </Map>
                                    {/* {console.log('initialcenter', Map)} */}
                                </div>
                                <Form.Control.Feedback type="invalid">
                                    Please choose a Clinic Location.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label
                                htmlFor="clinicnumber"
                                column
                                sm={3}
                                className="d-flex flex-row-reverse"
                            >
                                Phone Number
                            </Form.Label>

                            <Col sm={9}>
                                <PhoneInput
                                    defaultvalue={
                                        clinic ? clinic.clinic_contact : ""
                                    }
                                    onChange={(clinicnumber) =>
                                        setClinicnumber(clinicnumber)
                                    }
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please choose a Clinic Phone Number.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3 ">
                            <Form.Label
                                htmlFor="clinictime"
                                column
                                sm={3}
                                className="d-flex flex-row-reverse"
                            >
                                Time Slot
                            </Form.Label>
                            <Col className="d-flex flex-row ">
                                <Form.Label className="pt-2">
                                    Working Day
                                </Form.Label>
                            </Col>
                            <Col className="d-flex flex-row ">
                                <Form.Label className="pt-2">
                                    Start Time
                                </Form.Label>
                            </Col>
                            <Col className="d-flex flex-row ">
                                <Form.Label className="pt-2">
                                    End Time
                                </Form.Label>
                            </Col>
                        </Form.Group>

                        {/* <Form.Control type="time" name="clinictime" id="clinictime" placeholder="Enter Your Clinic Time" required type="time"
                            // value={clinic ? clinic.time:''}
                            // onChange={(e) => setClinictime(e.target.value)}
                            /> */}
                        {clinictime &&
                            clinictime.map((item, index) => {
                                // console.log('item', item);

                                return (
                                    <div key={index}>
                                        <Form.Group as={Row} className="mb-3">
                                            <Form.Label
                                                htmlFor="clinictime"
                                                column
                                                sm={3}
                                                className="d-flex flex-row-reverse"
                                            ></Form.Label>
                                            <Col className="d-flex flex-row ">
                                                <Form.Control
                                                    type="text"
                                                    name="clinicday"
                                                    id="clinicday"
                                                    placeholder="Enter Your Clinic Working Day"
                                                    required
                                                    value={
                                                        item
                                                            ? item.working_day
                                                            : ""
                                                    }
                                                    // onChange={handleClinicInputChange('working_day')}
                                                />
                                            </Col>
                                            <Col className="d-flex flex-row ">
                                                {/* <Form.Label className='pt-2' column sm={2}  >Start</Form.Label> */}

                                                <DatePicker
                                                    className="form-control"
                                                    hideAddon={true}
                                                    showTimeSelect
                                                    showTimeSelectOnly
                                                    tI={60}
                                                    dateFormat="h:mm aa"
                                                    timeCaption="Time"
                                                    value={
                                                        item
                                                            ? item.start_time
                                                            : ""
                                                    }
                                                    // onChange={(date) => {
                                                    // onDateChange(date);
                                                    // }}
                                                    // defaultInputValue={clinictime ? clinictime.start_time : ''}
                                                />

                                                <Form.Control.Feedback type="invalid">
                                                    Please choose a Clinic Start
                                                    Time.
                                                </Form.Control.Feedback>
                                            </Col>
                                            <Col className="d-flex flex-row ">
                                                {/* <Form.Label className='pt-2' column sm={2}  >End</Form.Label> */}

                                                <DatePicker
                                                    className="form-control"
                                                    hideAddon={true}
                                                    showTimeSelect
                                                    showTimeSelectOnly
                                                    tI={60}
                                                    dateFormat="h:mm aa"
                                                    timeCaption="Time"
                                                    value={
                                                        item
                                                            ? item.end_time
                                                            : ""
                                                    }
                                                    // onChange={(date) => {
                                                    //     onDateChange(date);
                                                    // }}
                                                    // defaultInputValue={clinictime ? clinictime.start_time : ''}
                                                />

                                                <Form.Control.Feedback type="invalid">
                                                    Please choose a Clinic End
                                                    Time.
                                                </Form.Control.Feedback>
                                            </Col>
                                        </Form.Group>
                                    </div>
                                );
                            })}

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label
                                htmlFor="clinic_img"
                                column
                                sm={3}
                                className="d-flex flex-row-reverse"
                            >
                                Photo
                            </Form.Label>

                            <Col sm={9}>
                                <Form.Control
                                    type="file"
                                    name="clinicphoto"
                                    id="clinicphoto"
                                    onChange={(e) => _handleImgClinic(e)}
                                />
                                {!spin && (
                                    <div className="col-xl-8 col-sm-7">
                                        <Spinner
                                            animation="border"
                                            variant="primary"
                                        />
                                    </div>
                                )}
                                {clinicimage != null ? (
                                    <img
                                        src={clinicimage}
                                        height="90px"
                                        width="90px"
                                        onLoad={_handleImgClinic}
                                        style={style}
                                    />
                                ) : (
                                    <img
                                        src={defaultimage}
                                        height="90px"
                                        width="90px"
                                        onLoad={_handleImgClinic}
                                        style={style}
                                    />
                                )}
                                <Form.Control.Feedback type="invalid">
                                    Please choose a Clinic Photo.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-0 d-felx">
                            <Col
                                className="d-flex flex-row "
                                sm={{ offset: 3, span: 4 }}
                            >
                                <Button
                                    variant="primary"
                                    type="submit"
                                    style={{ marginRight: "10px" }}
                                >
                                    Update Doctor
                                </Button>

                                <Button variant="primary" onClick={approveData}>
                                    Approve Doctor
                                </Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        </>
    );
};
export default GoogleApiWrapper({
    apiKey: "AIzaSyCIYTUpTkiplEvJT_GbMEwGDhSrPh2AHrE",
})(EditDoctor);
// export default EditDoctor;
