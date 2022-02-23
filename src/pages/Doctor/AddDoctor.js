import React, { useState } from 'react';
import { Row, Col, Card, Button, Form, ButtonGroup, ToggleButton, InputGroup } from 'react-bootstrap';
import Select from 'react-select';
import PageTitle from '../../components/PageTitle';
import { useHistory } from 'react-router-dom';
import { API_BASE_URL } from '../../apiconstant';
import { useEffect } from 'react';
import { forgotPassword, loginUser } from '../../redux/actions';
import { useRowSelect } from 'react-table';
import { toast } from 'react-toastify';
import axios from 'axios';
import FormData from 'form-data';
// import HyperDatepicker from '../../components/Datepicker';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import HyperDatepicker from '../../components/Datepicker';

const AddDoctor = () => {

    const history = useHistory();
    const [validated, setValidated] = useState(false);
    const loggedInUser = JSON.parse(window.localStorage.getItem('token'));
    const token = loggedInUser ? loggedInUser.token : '';
    //personal info
    const [fname, setFname] = useState('');
    const [mname, setMname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [pnumber, setPnumber] = useState('');
    const [pimage, setPimage] = useState('');
    const [gender, setGender] = useState({ male: 'male', female: 'female' });
    const [pass, setPass] = useState('');
    //professional info
    const [category, setCategory] = useState([]);
    const [categorydrop, setCategorydrop] = useState(null);
    const [experties, setExperties] = useState([]);
    const [expertiesdrop, setExpertiesdrop] = useState(null);
    const [license, setLicense] = useState('');
    const [licenseCountry, setLicenseCountry] = useState('');
    const [categoryid, setCategoryid] = useState('');

    //Acadmic info
    const [degree, setDegree] = useState('');
    const [college, setCollege] = useState('')
    const [acadmiStart, setAcadmiStart] = useState(new Date());
    const [acadmiEnd, setAcadmiEnd] = useState(new Date());
    const [acadmicCountry, setAcadmicCountry] = useState('');

    //clinic info
    const [clinicname, setClinicname] = useState('');
    const [clinicadd, setClinicadd] = useState('');
    const [clinicmap, setClinicmap] = useState('');
    const [clinicphone, setClinicphone] = useState('');
    const [clinictime, setClinictime] = useState('');
    const [clinicphoto, setClinicphoto] = useState('');

    //Experience info
    const [designation, setDesignation] = useState('');
    const [institude, setInstitude] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [expeirenceCity, setExpirencCity] = useState('');
    const [expeirenceCountry, setExpirenCountry] = useState('');


    const [certificate, setCertificate] = useState('');
    // const [isactive, setIsactive] = useState('');
    const [licencseInputField, setLicencseInputField] = useState([{ lnumber: '', lcountry: '' }])
    /*
     * handle form submission
     */
    const doctorCategory = () => {
        fetch(API_BASE_URL + `/admin/doctor_category/get?token=${token}`, {
            method: 'get',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },

        })
            .then(response => response.json())
            .then(result => {
                console.log(result);
                let one = (result.data)
                let categoryname = (one).map(element => ({ label: element.category_name, value: element.id }));
                setCategory(categoryname);
                // setCategoryid(categoryname);
                // console.log(category);

            })

    }

    const handleCategorydrop = (catname) => {
        catname !== null && setCategorydrop(catname.value);
        console.log(catname);
        // console.log(category);
        // console.log(JSON.stringify(catname.value));
        catname !== null && setCategoryid(JSON.stringify(catname.value));
        // console.log(categoryid);

    }
    // console.log(categoryid);

    const Experty = () => {


        fetch(API_BASE_URL + `/admin/expertises/get?token=${token}&category_id=${categoryid}`, {
            method: 'get',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },

        })
            .then(response => response.json())
            .then(result => {
                console.log(result);
                let one = (result.data)
                let expertname = (one).map(element => ({ label: element.expertise_name, value: element.id }));
                setExperties(expertname);
            })
    }

    const handleExpertydrop = (expname) => {
        expname !== null && setExpertiesdrop(expname.value);
    }
    // const onDateChange = (date) => {
    //     if (date) {
    //         setSelectedDate(date);
    //     }
    // };
    // const onDateToChange = (date) => {
    //     if (date) {
    //         setToDate(date);
    //     }
    // };
    // const onDateYearChange = (date) => {
    //     if (date) {
    //         setYear(date);
    //     }
    // };
    const handleSubmit = (event) => {

        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {

            let data = new FormData();
            //personal
            data.append("first_name", fname);
            data.append('middle_name', mname);
            data.append("last_name", lname);
            data.append("email_id", email);
            data.append("mobile_no", pnumber);
            data.append("profile_img", pimage);
            data.append("certificate_img", certificate);
            data.append("password", pass);
            data.append("gender", gender);
            //professinol
            data.append("category_id", categorydrop);
            data.append("doctor_expertises", expertiesdrop);
            data.append("doctor_medical_licenses[0][medical_license_number]", license);
            data.append("doctor_medical_licenses[0][medical_license_country]", licenseCountry);

            //experince
            data.append("doctor_experiences[0][designation]", designation);
            data.append("doctor_experiences[0][institude]", institude);
            data.append("doctor_experiences[0][start_date]", selectedDate);
            data.append("doctor_experiences[0][end_date]", toDate);
            data.append("doctor_experiences[0][country]", expeirenceCountry);
            data.append("doctor_experiences[0][city]", expeirenceCity);

            //clinic
            // data.append("degree", degree);
            // data.append("clinic_name", clinicname);
            // data.append("clinic_address", clinicadd);
            // data.append("clinic_map_location", clinicmap);
            // data.append("clinic_phone_no", clinicphone);
            // data.append("clinic_times", clinictime);
            // data.append("clinic_photo", clinicphoto);

            //acadmics
            data.append("doctor_academics[0][degree]", degree);
            data.append("doctor_academics[0][college]", college);
            data.append("doctor_academics[0][country]", acadmicCountry);
            data.append("doctor_academics[0][start_year]", acadmiStart);
            data.append("doctor_academics[0][end_year]", acadmiEnd);



            console.log(category, fname, mname, lname, email, pnumber, pimage, certificate, degree, pass, gender, clinicphoto, clinictime, clinicname, clinicphone, clinicadd, clinicmap, expertiesdrop);

            console.log(data);
            fetch(API_BASE_URL + `/admin/doctors/add?token=${token}`, {
                method: 'post',
                // headers: { "Content-Type": "multipart/form-data" },
                body: data
            })
                .then(respo => respo.json())
                .then(res => {
                    console.log(res);
                    if (res.status !== 0) {
                        toast.success('Doctor Added Succesfully');
                        setTimeout(() => {
                            history.push('/')
                        }, 3000);
                    } else {
                        toast.error(res.message);
                    }

                });

        }
        setValidated(true);
    };

    useEffect(() => {
        doctorCategory();


    }, [])
    useEffect(() => {
        Experty();
    }, [categoryid])

    const showPassword = (event, field) => {
        const eyeIcon = event.target.classList.contains('fa-eye');
        const inputField = document.getElementById(field);
        if (eyeIcon) {
            event.target.classList.toggle('fa-eye');
            event.target.classList.toggle('fa-eye-slash');
            inputField.setAttribute('type', 'text');
        } else {
            event.target.classList.remove('fa-eye-slash');
            event.target.classList.add('fa-eye');
            inputField.setAttribute('type', 'password');
        }
    }

    const handleRemoveClick = index => {
        const list = [...licencseInputField];
        list.splice(index, 1);
        setLicencseInputField(list);
    };
    const handleAddClick = () => {
        setLicencseInputField([...licencseInputField, { lnumber: "", lcountry: "" }]);
    }
    return (<>

        <PageTitle
            breadCrumbItems={[
                { label: 'Doctor', path: '/pages/doctor' },
                { label: 'Add Doctor', path: '/pages/adddoctor', active: true },
            ]}
            title={'Add Doctor'}
        />


        <Card>
            <Card.Body>
                <h4 className="header-title  mt-3 mb-3">{history.location.state ? "Update Doctor" : "Add Doctor"}</h4>

                <Form noValidate validated={validated} onSubmit={handleSubmit}>

                    <h4>Personal Information</h4>
                    <hr />



                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label htmlFor="first_name" column sm={3} className='d-flex flex-row-reverse'>
                            First Name
                        </Form.Label>

                        <Col sm={9}>
                            <Form.Control type="text" name="firstname" id="exampleFirstname3" placeholder="Enter Your First Name" required type="text" onChange={(e) => setFname(e.target.value)} />
                            <Form.Control.Feedback type="invalid">
                                Please choose a first name.
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label htmlFor="middle_name" column sm={3} className='d-flex flex-row-reverse'>
                            Middle Name
                        </Form.Label>

                        <Col sm={9}>
                            <Form.Control type="text" name="middle" id="exampleMiddleName3" placeholder="Enter Your Middle Name" required type="text" onChange={(e) => setMname(e.target.value)} />
                            <Form.Control.Feedback type="invalid">
                                Please choose a middle name.
                            </Form.Control.Feedback>
                        </Col>

                    </Form.Group>


                    <Form.Group as={Row} className="mb-3">
                        <Form.Label htmlFor="last_name" column sm={3} className='d-flex flex-row-reverse'>
                            Last Name
                        </Form.Label>

                        <Col sm={9}>
                            <Form.Control type="text" name="lastname" id="exampleLastname3" placeholder="Enter Your Last Name" required type="text" onChange={(e) => setLname(e.target.value)} />
                            <Form.Control.Feedback type="invalid">
                                Please choose a last name.
                            </Form.Control.Feedback>
                        </Col>

                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label htmlFor="email_id" column sm={3} className='d-flex flex-row-reverse'>
                            Email
                        </Form.Label>

                        <Col sm={9}>
                            <Form.Control type="email" name="email" id="exampleEmail3" placeholder="Enter Your Email" required type="text" onChange={(e) => setEmail(e.target.value)} />
                            <Form.Control.Feedback type="invalid">
                                Please choose a email.
                            </Form.Control.Feedback>
                        </Col>

                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label htmlFor="password" column sm={3} className='d-flex flex-row-reverse'>
                            Password
                        </Form.Label>

                        <Col sm={9}>
                            <Form.Control type="password" name="password" id="password" placeholder="Enter Your Password" required type="password" onChange={(e) => setPass(e.target.value)} />
                            <span className="fas fa-eye position-absolute input-shower old-password-icon advansys-text-primary" onClick={(event) => showPassword(event, "new-pass")} style={{ top: '35px', right: '10px', cursor: 'pointer' }} ></span>
                            <Form.Control.Feedback type="invalid">
                                Please choose a Password.
                            </Form.Control.Feedback>
                        </Col>

                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label htmlFor="confirm_password" column sm={3} className='d-flex flex-row-reverse'>
                            Confirm password
                        </Form.Label>

                        <Col sm={9}>
                            <Form.Control type="password" name="cpassword" id="cpassword" placeholder="Enter Your Confirm Password" required type="password"
                            // onChange={(e) => setPass(e.target.value)}
                            />

                            <Form.Control.Feedback type="invalid">
                                Please choose a Confirma Password.
                            </Form.Control.Feedback>
                        </Col>

                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label htmlFor="mobile_no" column sm={3} className='d-flex flex-row-reverse'>
                            Mobile Number
                        </Form.Label>

                        <Col sm={9}>
                            <Form.Control type="text" name="mnumber" id="exampleNumber3" placeholder="Enter Your Phone Number" required type="Number" onChange={(e) => setPnumber(e.target.value)} />
                            <Form.Control.Feedback type="invalid">
                                Please choose a Phone Number.
                            </Form.Control.Feedback>
                        </Col>

                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label htmlFor="profile_img" column sm={3} className='d-flex flex-row-reverse'>
                            Profile Image
                        </Form.Label>

                        <Col sm={9}>
                            <Form.Control type="file" name="profile" id="exampleprofile3" required type="file"

                                onChange={(e) =>
                                    setPimage(e.target.files[0])

                                }
                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a profile image.
                            </Form.Control.Feedback>
                        </Col>

                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label htmlFor="gender" column sm={3} className='d-flex flex-row-reverse'>
                            Gender
                        </Form.Label>
                        <Col sm={9} >
                            {['radio'].map((type) => (
                                <div key={`inline-${type}`} className='d-flex pd-1 mt-1' >
                                    <Form.Check inline type={type}
                                        id={`inline-${type}-1`} label="Male"
                                    // onChange={e => setGender(e.target.value)}
                                    // value={gender.male}
                                    />
                                    <Form.Check inline className='ml-3' type={type}
                                        id={`inline-${type}-2`} label="Female"
                                    // onChange={e => setGender(e.target.value)}
                                    // value={gender.female}
                                    />
                                </div>
                            ))}
                        </Col>

                    </Form.Group>
                    <h4>Professional Information</h4>
                    <hr />
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label htmlFor="exampleCategory3" column sm={3} className='d-flex flex-row-reverse'>
                            Category
                        </Form.Label>

                        <Col sm={9}>
                            <Select
                                className="react-select"
                                classNamePrefix="select"
                                placeholder="Select Category"
                                defaultValue={category}
                                isClearable={true}
                                isSearchable={true}
                                options={category}
                                onChange={handleCategorydrop}
                            />

                            <Form.Control.Feedback type="invalid">
                                Please choose a category.
                            </Form.Control.Feedback>
                        </Col>

                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label htmlFor="exampleCategory3" column sm={3} className='d-flex flex-row-reverse'>
                            Experties
                        </Form.Label>

                        <Col sm={9}>
                            <Select
                                className="react-select"
                                classNamePrefix="select"
                                placeholder="Select Category"
                                defaultValue={experties}
                                isClearable={true}
                                isSearchable={true}
                                options={experties}
                                isMulti
                                onChange={handleExpertydrop}
                            />

                            <Form.Control.Feedback type="invalid">
                                Please choose a Experties.
                            </Form.Control.Feedback>
                        </Col>

                    </Form.Group>
                    {licencseInputField.map((x, i) => {
                        return (<>

                            <Form.Group as={Row} className="mb-3">
                                <Form.Label htmlFor="license number" column sm={3} className='d-flex flex-row-reverse'>
                                    License Number
                                </Form.Label>

                                <Col sm={9}>
                                    <Form.Control type="text" name="lnumber" id="exampleNumber3" placeholder="Enter Your License Number" required type="text"
                                        // vlaue={x.lnumber}
                                        // value={x.lnumber}
                                        onChange={(e) => setLicense(e.target.value)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please choose a License Number.
                                    </Form.Control.Feedback>
                                </Col>

                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label htmlFor="exampleCategory3" column sm={3} className='d-flex flex-row-reverse'>
                                    License Country
                                </Form.Label>

                                <Col sm={9}>
                                    {/* <Select
                                className="react-select"
                                classNamePrefix="select"
                                placeholder="Select Country"
                                options={[
                                    { value: 'chocolate', label: 'option1' },
                                    { value: 'strawberry', label: 'option2' },
                                    { value: 'vanilla', label: 'option3' },
                                    { value: 'option4', label: 'option4' },
                                ]}
                            // defaultValue={category[0]}
                            // isClearable={true}
                            // isSearchable={true}
                            // options={category}
                            // onChange={handleCategorydrop}

                            /> */}
                                    <Form.Control type="text" name="lcoutry" id="acadmiccountry" placeholder="Enter Your Country Name" required type="text"
                                        // value={x.lcountry}
                                        onChange={(e) => setLicenseCountry(e.target.value)}
                                    />

                                    <Form.Control.Feedback type="invalid">
                                        Please choose a Country.
                                    </Form.Control.Feedback>
                                </Col>

                            </Form.Group>
                            {/* <div className="btn">
                                {licencseInputField.length !== 1 && <button className="mr10" onClick={() => handleRemoveClick(i)}>Remove</button>}
                                {licencseInputField.length - 1 === i && <button onClick={handleAddClick}>Add</button>}
                            </div> */}
                        </>)
                    })}
                    <h4> Availability</h4>
                    <hr />
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label htmlFor="exampleCategory3" column sm={3} className='d-flex flex-row-reverse'>
                            Availability Time
                        </Form.Label>

                        <Col sm={9}>
                            <Select
                                className="react-select"
                                classNamePrefix="select"
                                placeholder="Select Timeslot"
                                options={[
                                    { value: 'chocolate', label: 'option1' },
                                    { value: 'strawberry', label: 'option2' },
                                    { value: 'vanilla', label: 'option3' },
                                    { value: 'option4', label: 'option4' },
                                ]}
                                isMulty={true}
                            // defaultValue={category[0]}
                            // isClearable={true}
                            // isSearchable={true}
                            // options={category}
                            // onChange={handleCategorydrop}

                            />

                            <Form.Control.Feedback type="invalid">
                                Please choose a Country.
                            </Form.Control.Feedback>
                        </Col>

                    </Form.Group>
                    <h4>Academic</h4>
                    <hr />

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label htmlFor="degree" column sm={3} className='d-flex flex-row-reverse'>
                            Degree
                        </Form.Label>

                        <Col sm={9}>
                            <Form.Control type="text" name="degree" id="exampleDegree3" placeholder="Enter Your Degree" required type="text" onChange={(e) => setDegree(e.target.value)} />
                            <Form.Control.Feedback type="invalid">
                                Please choose a Degree.
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label htmlFor="colleagename" column sm={3} className='d-flex flex-row-reverse'>
                            College Name
                        </Form.Label>

                        <Col sm={9}>
                            <Form.Control type="text" name="collegename" id="exampleDegree3" placeholder="Enter Your College Name" required type="text"
                                onChange={(e) => setCollege(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a College Name.
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label htmlFor="Year" column sm={3} className='d-flex flex-row-reverse'>
                            Acadmic Year
                        </Form.Label>
                        <Col className='d-flex flex-row '>
                            <Form.Label className='pt-2' column sm={2}  >From</Form.Label>
                            {/* <Form.Control type="date" name="fromyear" id="fromyear" required type="date"
                            //  onChange={(e) => setPnumber(e.target.value)} 
                            /> */}
                            <div className="input-group" >

                                <DatePicker
                                    className="form-control"
                                    // hideAddon={true}
                                    selected={selectedDate}
                                    startDate={selectedDate}
                                    endDate={toDate}
                                    dateFormat="yyyy"
                                    showYearPicker
                                    onChange={(date) => {
                                        setAcadmiStart(date);
                                    }}
                                />

                            </div>
                            <Form.Control.Feedback type="invalid">
                                Please choose a Acadmic Year From.
                            </Form.Control.Feedback>
                        </Col>
                        <Col className='d-flex flex-row' >
                            <Form.Label className='pt-2 mr-3' column sm={2}>To</Form.Label>
                            <DatePicker
                                className="form-control"
                                // hideAddon={true}
                                selected={toDate}
                                startDate={selectedDate}
                                endDate={toDate}
                                dateFormat="yyyy"
                                showYearPicker
                                onChange={(date) => {
                                    setAcadmiEnd(date);
                                }}
                            />
                            {/* <Form.Control type="year" name="toyear" id="toyear" required type="date"
                            //  onChange={(e) => setPnumber(e.target.value)} 
                            /> */}
                            {/* <input type="/> */}
                            <Form.Control.Feedback type="invalid">
                                Please choose a Acadmic Year to.
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label htmlFor="degreecoutntry" column sm={3} className='d-flex flex-row-reverse'>
                            Country
                        </Form.Label>

                        <Col sm={9}>
                            <Form.Control type="text" name="degrrecoutnry" id="degreecountry" placeholder="Enter Your Country" required type="text"
                                onChange={(e) => setAcadmicCountry(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a Country.
                            </Form.Control.Feedback>
                        </Col>

                    </Form.Group>

                    {/* <Form.Group as={Row} className="mb-3">
                        <Form.Label htmlFor="certificate_img" column sm={3} className='d-flex flex-row-reverse'>
                            Certificate Image
                        </Form.Label>

                        <Col sm={9}>
                            <Form.Control type="file" name="certificatefile" id="exampleLastname3" required type="file"
                                onChange={(e) =>
                                    setCertificate(e.target.files[0])
                                }
                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a certificate image.
                            </Form.Control.Feedback>
                        </Col>

                    </Form.Group> */}

                    <h4>Experience</h4>
                    <hr />
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label htmlFor="designation" column sm={3} className='d-flex flex-row-reverse'>
                            Designation
                        </Form.Label>

                        <Col sm={9}>
                            <Form.Control type="text" name="desgination" id="exampleNumber3" placeholder="Enter Your Designation" required type="text"
                                onChange={(e) => setDesignation(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a Designation.
                            </Form.Control.Feedback>
                        </Col>

                    </Form.Group>


                    <Form.Group as={Row} className="mb-3">
                        <Form.Label htmlFor="Institute" column sm={3} className='d-flex flex-row-reverse'>
                            Institute
                        </Form.Label>

                        <Col sm={9}>
                            <Form.Control type="text" name="Institute" id="Institute" placeholder="Enter Your Institute" required type="text"
                                onChange={(e) => setInstitude(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a Institute.
                            </Form.Control.Feedback>
                        </Col>

                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label htmlFor="city" column sm={3} className='d-flex flex-row-reverse'>
                            Experience Year
                        </Form.Label>

                        <Col className='d-flex flex-row '>
                            <Form.Label className='pt-2' column sm={2}  >From</Form.Label>
                            {/* <Form.Control type="date" name="fromyear" id="fromyear" required type="date"
                            //  onChange={(e) => setPnumber(e.target.value)} 
                            /> */}
                            <div className="input-group" >

                                <DatePicker
                                    className="form-control"
                                    // hideAddon={true}
                                    selected={selectedDate}
                                    startDate={selectedDate}
                                    endDate={toDate}
                                    dateFormat="yyyy"
                                    showYearPicker
                                    onChange={(date) => {
                                        setSelectedDate(date);
                                    }}
                                />

                            </div>
                            <Form.Control.Feedback type="invalid">
                                Please choose a Experience From.
                            </Form.Control.Feedback>
                        </Col>
                        <Col className='d-flex flex-row' >
                            <Form.Label className='pt-2 mr-3' column sm={2}>To</Form.Label>
                            <DatePicker
                                className="form-control"
                                // hideAddon={true}
                                selected={toDate}
                                startDate={selectedDate}
                                endDate={toDate}
                                dateFormat="yyyy"
                                showYearPicker
                                onChange={(date) => {
                                    setToDate(date);
                                }}
                            />
                            {/* <Form.Control type="year" name="toyear" id="toyear" required type="date"
                            //  onChange={(e) => setPnumber(e.target.value)} 
                            /> */}
                            {/* <input type="/> */}
                            <Form.Control.Feedback type="invalid">
                                Please choose a Experience to.
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label htmlFor="city" column sm={3} className='d-flex flex-row-reverse'>
                            City
                        </Form.Label>

                        <Col sm={9}>
                            <Form.Control type="text" name="city" id="city" placeholder="Enter Your City" required type="text"
                                onChange={(e) => setExpirencCity(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a City.
                            </Form.Control.Feedback>
                        </Col>

                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label htmlFor="coutntry" column sm={3} className='d-flex flex-row-reverse'>
                            Country
                        </Form.Label>

                        <Col sm={9}>
                            <Form.Control type="text" name="coutnry" id="country" placeholder="Enter Your Country" required type="text"
                                onChange={(e) => setExpirenCountry(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a Country.
                            </Form.Control.Feedback>
                        </Col>

                    </Form.Group>
                    <h4>Clinic Information</h4>
                    <hr />
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label htmlFor="clinicname" column sm={3} className='d-flex flex-row-reverse'>
                            Clinic Name
                        </Form.Label>

                        <Col sm={9}>
                            <Form.Control type="text" name="clinicname" id="clinicname" placeholder="Enter Your Clinic Name" required type="text"
                                onChange={(e) => setClinicname(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a Clinic Name.
                            </Form.Control.Feedback>
                        </Col>

                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label htmlFor="clinicadd" column sm={3} className='d-flex flex-row-reverse'>
                            Clinic Address
                        </Form.Label>

                        <Col sm={9}>
                            <Form.Control type="text" name="clinicadd" id="clinicadd" placeholder="Enter Your Clinic Address" required type="text"
                                onChange={(e) => setClinicadd(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a Clinic Address.
                            </Form.Control.Feedback>
                        </Col>

                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label htmlFor="clinicmap" column sm={3} className='d-flex flex-row-reverse'>
                            Clinic Location
                        </Form.Label>

                        <Col sm={9}>
                            <Form.Control type="url" name="clinicmap" id="clinicmap" placeholder="Enter Your Clinic Location" required type="url"
                                onChange={(e) => setClinicmap(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a Clinic Location.
                            </Form.Control.Feedback>
                        </Col>

                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label htmlFor="clinicnumber" column sm={3} className='d-flex flex-row-reverse'>
                            Clinic Phone Number
                        </Form.Label>

                        <Col sm={9}>
                            <Form.Control type="number" name="clinicnumber" id="clinicnumber" placeholder="Enter Your Clinic Phone Number" required type="number"
                                onChange={(e) => setClinicphone(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a Clinic Phone Number.
                            </Form.Control.Feedback>
                        </Col>

                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label htmlFor="clinictime" column sm={3} className='d-flex flex-row-reverse'>
                            Clinic Time
                        </Form.Label>

                        <Col sm={9}>
                            <Form.Control type="time" name="clinictime" id="clinictime" placeholder="Enter Your Clinic Time" required type="time"
                                onChange={(e) => setClinictime(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a Clinic Time.
                            </Form.Control.Feedback>
                        </Col>

                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label htmlFor="clinic_img" column sm={3} className='d-flex flex-row-reverse'>
                            Clinic Photo
                        </Form.Label>

                        <Col sm={9}>
                            <Form.Control type="file" name="clinicphoto" id="clinicphoto" required type="file"
                                onChange={(e) =>
                                    setClinicphoto(e.target.files[0])
                                }
                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a Clinic Photo.
                            </Form.Control.Feedback>
                        </Col>

                    </Form.Group>
                    {/* <Form.Group as={Row} className="mb-3" >
                        <Form.Label htmlFor="exampleactive3" column sm={3} className='d-flex flex-row-reverse'>
                            IsActive
                        </Form.Label>
                        <Col sm={9} >
                            <div className='d-flex pd-1 mt-1'>
                                <Form.Check type="radio" id="default-checkbox" label="Active" style={{ marginRight: 10 }} value='active' />
                                <Form.Check className='ml-3' type="radio" id="default-checkbox" label="InActive" value='inactive' />
                            </div>
                        </Col>

                    </Form.Group> */}

                    <Form.Group as={Row} className="mb-0" controlId="formHorizontalCheck">
                        <Col sm={{ span: 9, offset: 3 }}>
                            <Button variant="primary" type="submit">
                                Add Doctor
                            </Button>
                        </Col>
                    </Form.Group>

                </Form>

            </Card.Body>
        </Card>

    </>);
}
export default AddDoctor;