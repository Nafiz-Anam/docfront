import React, { useState } from 'react';
import { Row, Col, Card, Button, Form, Toast } from 'react-bootstrap';
import PageTitle from '../../components/PageTitle';
import { API_BASE_URL } from '../../apiconstant';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import axios from 'axios';
import FormData from 'form-data';
const AddPatient = () => {
    const loggedInUser = JSON.parse(window.localStorage.getItem('token'));
    const token = loggedInUser.token;
    const history = useHistory();
    const [validated, setValidated] = useState(false);
    const [fname, setFname] = useState('');
    const [mname, setMname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [pnumber, setPnumber] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [stat, setStat] = useState('');
    const [pin, setPin] = useState('');
    const [pass, setPass] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');
    const [formInfo, setFormInfo] = useState({
    })
    const [pimage, setPimage] = useState('');
    const [gender, setGender] = useState({ male: 'male', female: 'female', other: 'other' });

    const handleInputChange = (key) => (event) => {
        setFormInfo({
            ...formInfo,
            [key]: event.target.value,
        });
    };



    /*
     * handle form submission
     */



    const handleSubmit = (event) => {

        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            // setValidated(true);
        } else {
            if (pass === confirmpassword) {


                let data = new FormData();


                data.append("first_name", fname);
                data.append("middle_name", mname);
                data.append("last_name", lname);
                data.append("email_id", email);
                data.append("mobile_no", pnumber);
                data.append("address", address);
                data.append("city", city);
                data.append("state", stat);
                data.append("pincode", pin);
                data.append("password", pass);
                data.append("profile_img", pimage);
                data.append('gender', gender);


                console.log("Addpataient", data);

                fetch(API_BASE_URL + `/admin/patients/add?token=${token}`, {
                    method: "post",
                    // headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    body: data
                })
                    .then(res => res.json())
                    .then(result => {
                        console.log(result);
                        if (result.status !== 0) {
                            toast.success('Patient Added Successfully')
                            setTimeout(() => {

                                history.push('/pages/patient');
                            }, 1000);

                        } else {
                            toast.error(result.message);
                        }

                    })
                    .catch(error => {
                        console.log(error);
                        toast.error(error.message);
                    })
            }
            else {
                toast.error('Password And Confirm Password Should be Smilar')
            }
        }


        setValidated(true);
    };

    return (<>

        <PageTitle
            breadCrumbItems={[
                { label: 'Patient', path: '/pages/patient' },
                { label: 'Add Patient', path: '/pages/addpatient', active: true },
            ]}
            title={'Add Patient'}
        />


        <Card>
            <Card.Body>
                <h4 className="header-title  mt-3 mb-3">Add Patient</h4>

                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group as={Row} className="mb-3" controlId="first_name">
                        <Form.Label column sm={3} className='d-flex flex-row-reverse'>
                            Profile Image
                        </Form.Label>

                        <Col sm={9}>
                            <Form.Control type="file" name="profile" id="profile" required type="file"
                                onChange={(e) =>
                                    setPimage(e.target.files[0])

                                }
                            />
                            {/* {pimage != null ? (<img src={pimage} height="90px" width="90px" onLoad={_handleImgChange2} />) : ''} */}
                            <Form.Control.Feedback type="invalid">
                                Please choose a first name.
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="first_name">
                        <Form.Label column sm={3} className='d-flex flex-row-reverse'>
                            First Name
                        </Form.Label>

                        <Col sm={9}>
                            <Form.Control type="text" name="firstname" placeholder="Enter Your First Name" required type="text"
                                id="firstname"
                                value={fname}
                                onChange={e => setFname(e.target.value)} />
                            <Form.Control.Feedback type="invalid">
                                Please choose a first name.
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                    {/* 
                    <Form.Group as={Row} className="mb-3" controlId="middle_name">
                        <Form.Label column sm={3} className='d-flex flex-row-reverse'>
                            Middle Name
                        </Form.Label>

                        <Col sm={9}>

                            <Form.Control type="text" name="middle" placeholder="Enter Your Middle name" required type="text" id="middle"
                                // value={formInfo.middle_name}
                                // onChange={handleInputChange('middle_name')}
                                onChange={e => setMname(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a middle name.
                            </Form.Control.Feedback>
                        </Col>

                    </Form.Group> */}


                    <Form.Group as={Row} className="mb-3" controlId="last_name">
                        <Form.Label column sm={3} className='d-flex flex-row-reverse'>
                            Last Name
                        </Form.Label>

                        <Col sm={9}>
                            <Form.Control type="text" name="lastname" id="lastname" placeholder="Enter Your Last Name" required type="text"

                                value={lname}
                                // onChange={handleInputChange('last_name')}
                                onChange={e => setLname(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a last name.
                            </Form.Control.Feedback>
                        </Col>

                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="email_id">
                        <Form.Label column sm={3} className='d-flex flex-row-reverse'>
                            Email
                        </Form.Label>

                        <Col sm={9}>
                            <Form.Control type="email" name="email" id="email" placeholder="Enter Your Email" required type="text"
                                value={email}
                                // onChange={handleInputChange('email_id')} 
                                onChange={e => setEmail(e.target.value)}

                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a email.
                            </Form.Control.Feedback>
                        </Col>

                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="password">
                        <Form.Label column sm={3} className='d-flex flex-row-reverse'>
                            Password
                        </Form.Label>

                        <Col sm={9}>
                            <Form.Control type="password" name="pass" id='pass' placeholder="Enter Your password" required type="password"
                                value={pass}
                                // onChange={handleInputChange('password')} 
                                onChange={e => setPass(e.target.value)}

                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a password.
                            </Form.Control.Feedback>
                        </Col>

                    </Form.Group>


                    <Form.Group as={Row} className="mb-3" controlId="cpassword">
                        <Form.Label column sm={3} className='d-flex flex-row-reverse'>
                            Confirm Password
                        </Form.Label>

                        <Col sm={9}>
                            <Form.Control type="password" name="cpass" id='cpass' placeholder="Enter Your Confirm password" required type="password"
                                value={confirmpassword}
                                // onChange={handleInputChange('password')} 
                                onChange={e => setConfirmpassword(e.target.value)}


                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a Cofirm password.
                            </Form.Control.Feedback>
                        </Col>

                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="mobile_no">
                        <Form.Label column sm={3} className='d-flex flex-row-reverse'>
                            Mobile Number
                        </Form.Label>

                        <Col sm={9}>
                            <Form.Control type="text" name="mnumber" id='mnumber' placeholder="Enter Your Phone Number" required type="Number"

                                value={pnumber}
                                // onChange={handleInputChange('mobile_no')} 
                                onChange={e => setPnumber(e.target.value)}

                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a Phone Number.
                            </Form.Control.Feedback>
                        </Col>

                    </Form.Group>
                    {/* 
                    <Form.Group as={Row} className="mb-3" controlId="address">
                        <Form.Label column sm={3} className='d-flex flex-row-reverse'>
                            Address
                        </Form.Label>

                        <Col sm={9}>
                            <Form.Control type="text" name="address" id='address' placeholder="Enter Your Address" required type="text"
                                // value={formInfo.address}
                                // onChange={handleInputChange('address')}
                                onChange={e => setAddress(e.target.value)}

                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a address.
                            </Form.Control.Feedback>
                        </Col>

                    </Form.Group>


                    <Form.Group as={Row} className="mb-3" controlId="state">
                        <Form.Label column sm={3} className='d-flex flex-row-reverse'>
                            State
                        </Form.Label>

                        <Col sm={9}>
                            <Form.Control type="text" name="state" id='state' placeholder="Enter Your State" required type="text"
                                // value={formInfo.state}
                                // onChange={handleInputChange('state')}
                                onChange={e => setStat(e.target.value)}

                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a State.
                            </Form.Control.Feedback>
                        </Col>

                    </Form.Group>


                    <Form.Group as={Row} className="mb-3" controlId="city">
                        <Form.Label column sm={3} className='d-flex flex-row-reverse'>
                            City
                        </Form.Label>

                        <Col sm={9}>
                            <Form.Control type="text" name="city" id='city' placeholder="Enter Your City" required type="text"
                                // value={formInfo.city}
                                // onChange={handleInputChange('city')} 
                                onChange={e => setCity(e.target.value)}

                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a city.
                            </Form.Control.Feedback>
                        </Col>

                    </Form.Group>


                    <Form.Group as={Row} className="mb-3" controlId="pincode">
                        <Form.Label column sm={3} className='d-flex flex-row-reverse'>
                            Pincode
                        </Form.Label>

                        <Col sm={9}>
                            <Form.Control type="number" name="pin" id='pin' placeholder="Enter Your Pincode" required type="Number"
                                // value={formInfo.pincode}
                                // onChange={handleInputChange('pincode')}
                                onChange={e => setPin(e.target.value)}

                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a pincode.
                            </Form.Control.Feedback>
                        </Col>

                    </Form.Group> */}
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label htmlFor="gender" column sm={3} className='d-flex flex-row-reverse'>
                            Gender
                        </Form.Label>
                        <Col sm={9} >
                            <div className='d-flex pd-1 mt-1 form-check' >

                                <Form.Check type="radio" label="Male" style={{ marginRight: 10 }}
                                    id="radio1"
                                    name="groupOptions"
                                    onChange={e => setGender(e.target.value)}
                                    value={gender.male}

                                />
                                <Form.Check className='ml-3' type="radio" label="Female"
                                    id="radio2"
                                    name="groupOptions"
                                    onChange={e => setGender(e.target.value)}
                                    value={gender.female}


                                    style={{ marginRight: 10 }} />
                                <Form.Check className='ml-3' type="radio" label="Other"
                                    id="radio2"
                                    name="groupOptions"
                                    onChange={e => setGender(e.target.value)}
                                    value={gender.other}

                                />

                            </div>
                        </Col>

                    </Form.Group>
                    <Form.Group as={Row} className="mb-0" controlId="formHorizontalCheck">
                        <Col sm={{ span: 9, offset: 3 }}>
                            <Button variant="primary" type="submit">
                                Add Patient
                            </Button>
                        </Col>
                    </Form.Group>

                </Form>

            </Card.Body>
        </Card>

    </>);
}
export default AddPatient;