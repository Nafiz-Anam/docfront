import React, { useState } from 'react';
import { Row, Col, Card, Button, Form, Spinner } from 'react-bootstrap';
import PageTitle from '../../components/PageTitle';
import { useLocation } from 'react-router-dom';
import { API_BASE_URL } from '../../apiconstant';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import FormData from 'form-data';
import { Radio } from 'antd';
import defaultimage from './defaultimage.jpg';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'



const EditPatient = (props) => {
    const location = useLocation();
    const patientId = ((location.pathname).split('/'))[3];
    // console.log(patientId);
    const loggedInUser = JSON.parse(window.localStorage.getItem('token'));
    const token = loggedInUser.token;
    const history = useHistory();
    const [validated, setValidated] = useState(false);
    const [patient, setPatient] = useState();
    const [fname, setFname] = useState('');
    // console.log(fname);
    const [mname, setMname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [pnumber, setPnumber] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [stat, setStat] = useState('');
    const [pin, setPin] = useState('');
    const [defualtProfile, setDefualtProfile] = useState('');
    const [pimage, setPimage] = useState('');
    const [gender, setGender] = useState('');
    const [spin, setSpin] = useState(false);
    const [phonenumber, setPhonenumber] = useState('');


    /*
     * handle form submission
     */
    useEffect(() => {


        // console.log('patient_id', patientId);


        fetch(API_BASE_URL + `/admin/patients/get_by_id?token=${token}&id=${patientId}`, {
            method: 'get',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        })
            .then(response => response.json())
            .then(result => {
                // console.log(result);
                // console.log(patient_id);
                setPatient(
                    result.data[0]
                );
                setDefualtProfile(result.data[0].profile_img)
                console.log(patient);

            })
            .catch(error => {
                console.log(error);

            })
        // console.log(patient);

    }, [patientId, token])


    //Input Values
    const handleInputChange = (key) => (event) => {
        setPatient({
            ...patient,
            [key]: event.target.value,
        });
    };

    //Image Values
    const _handleImgChange2 = (e, i) => {
        e.preventDefault();

        // if (e.target.files && e.target.files[0]) {
        //     let reader = new FileReader();
        //     reader.onload = (ev) => {
        //         setPimage(ev.target.result);
        //     };
        //     reader.readAsDataURL(e.target.files[0]);
        // }
        if (!(e.target.files && e.target.files[0])) {
            setSpin(false)
        } else {
            let reader = new FileReader();
            reader.onload = (ev) => {
                setDefualtProfile(ev.target.result);
            };
            // reader.readAsDataURL(e.target.files[0]);
            setDefualtProfile(URL.createObjectURL(e.target.files[0]));
            setPimage(defaultimage);
            setPimage(e.target.files[0]);
            // console.log('image', defaultimage)

        }
        setSpin(true)


    };

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            let data = new FormData();

            data.append('id', patientId)
            data.append("first_name", patient.first_name);
            data.append("middle_name", patient.middle_name);
            data.append("last_name", patient.last_name);
            data.append("email_id", patient.email_id);
            data.append("mobile_no", patient.mobile_no);
            data.append("address", patient.address);
            data.append("city", patient.city);
            data.append("state", patient.state);
            data.append("pincode", patient.pincode);
            data.append("profile_img", pimage);
            data.append('gender', patient.gender);
            console.log(patient);
            fetch(API_BASE_URL + `/admin/patients/update?token=${token}`, {
                method: 'post',
                // headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: data
            })
                .then(response => response.json())
                .then(result => {
                    console.log(result);
                    if (result.status !== 0) {
                        toast.success('Patient update Successfully')
                        setTimeout(() => {

                            history.push('/pages/patient');
                        }, 1000);

                    } else {
                        toast.error(result.message);
                    }


                })
        }
        setValidated(true);
        // console.log(patient)

    };
    const style = spin ? {} : { visibility: 'hidden' }

    return (<>

        <PageTitle
            breadCrumbItems={[
                { label: 'Patient', path: '/pages/patient' },
                { label: 'Update Patient', path: '/pages/editpatient', active: true },
            ]}
            title={'Update Patient'}
        />


        <Card>
            <Card.Body>
                <h4 className="header-title  mt-3 mb-3">Update Patient</h4>


                <Form noValidate validated={validated} onSubmit={handleSubmit}>

                    <Form.Group as={Row} className="mb-3" controlId="profile">
                        <Form.Label column sm={3} className='d-flex flex-row-reverse'>
                            Profile Image
                        </Form.Label>

                        <Col sm={9}>
                            <Form.Control type="file" name="profile" id="profile"
                                onChange={(e) => _handleImgChange2(e)}
                            />
                            <div className="col-xl-8 col-sm-7">
                                {!spin &&
                                    <div className="col-xl-8 col-sm-7">
                                        <Spinner animation="border" variant="primary" />
                                    </div>
                                }
                                {defualtProfile && defualtProfile != null ? (<img src={defualtProfile} height="90px" width="90px" onLoad={_handleImgChange2} style={style} />) : (<img src={defaultimage} height="90px" width="90px" onLoad={_handleImgChange2} style={style} />)}

                            </div>

                        </Col>

                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="first_name">
                        <Form.Label column sm={3} className='d-flex flex-row-reverse'>
                            First Name
                        </Form.Label>

                        <Col sm={9}>
                            <Form.Control type="text" name="firstname" placeholder="Enter Your First Name" required type="text"
                                id="firstname"
                                value={patient ? patient.first_name : ''}
                                onChange={handleInputChange('first_name')}
                            // onChange={e => setFname(e.target.value)} 
                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a first name.
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    {/* <Form.Group as={Row} className="mb-3" controlId="middle_name">
                        <Form.Label column sm={3} className='d-flex flex-row-reverse'>
                            Middle Name
                        </Form.Label>

                        <Col sm={9}>

                            <Form.Control type="text" name="middle" placeholder="Enter Your Middle name" required type="text" id="middle"
                                value={patient ? patient.middle_name : ''}
                                onChange={handleInputChange('middle_name')}
                            // onChange={e => setMname(e.target.value)}
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

                                value={patient ? patient.last_name : ''}
                                onChange={handleInputChange('last_name')}
                            // onChange={e => setLname(e.target.value)}
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
                                value={patient ? patient.email_id : ''}
                                onChange={handleInputChange('email_id')}
                            // onChange={e => setEmail(e.target.value)}

                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a email.
                            </Form.Control.Feedback>
                        </Col>

                    </Form.Group>
                    {/* <Form.Group as={Row} className="mb-3" controlId="password">
                        <Form.Label column sm={3} className='d-flex flex-row-reverse'>
                            Password
                        </Form.Label>

                        <Col sm={9}>
                            <Form.Control type="password" name="pass" id='pass' placeholder="Enter Your password" required type="text"
                                // value={formInfo.password}
                                // onChange={handleInputChange('password')} 
                                onChange={e => setPass(e.target.value)}

                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a password.
                            </Form.Control.Feedback>
                        </Col>

                    </Form.Group> */}
                    <Form.Group as={Row} className="mb-3" controlId="mobile_no">
                        <Form.Label column sm={3} className='d-flex flex-row-reverse'>
                            Mobile Number
                        </Form.Label>

                        <Col sm={9}>
                            {/* <Form.Control type="text" name="mnumber" id='mnumber' placeholder="Enter Your Phone Number" required type="text"

                                value={patient ? patient.mobile_no : ''}
                                onChange={handleInputChange('mobile_no')}
                            // onChange={e => setPnumber(e.target.value)}

                            /> */}
                            <PhoneInput

                                value={patient ? patient.mobile_no : ''}

                                onChange={phonenumber => setPhonenumber({ phonenumber })}

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
                                value={patient ? patient.address : ''}
                                onChange={handleInputChange('address')}
                            // onChange={e => setAddress(e.target.value)}

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
                                value={patient ? patient.state : ''}
                                onChange={handleInputChange('state')}
                            // onChange={e => setStat(e.target.value)}

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
                                value={patient ? patient.city : ''}
                                onChange={handleInputChange('city')}
                            // onChange={e => setCity(e.target.value)}

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
                                value={patient ? patient.pincode : ''}
                                onChange={handleInputChange('pincode')}
                            // onChange={e => setPin(e.target.value)}

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
                            <div className='d-flex pd-1 mt-1 form-check'

                            >
                                <Radio.Group value={patient ? patient.gender : ''} onChange={handleInputChange('gender')} color="primary">
                                    <Radio value='male' style={{ marginRight: '10px' }}>Male</Radio>
                                    <Radio value='female' style={{ marginRight: '10px' }}>Female</Radio>
                                    <Radio value='other'>Other</Radio>

                                </Radio.Group>
                            </div>
                        </Col>

                    </Form.Group>

                    <Form.Group as={Row} className="mb-0" controlId="formHorizontalCheck">
                        <Col sm={{ span: 9, offset: 3 }}>
                            <Button variant="primary" type="submit">
                                Update Patient
                            </Button>
                        </Col>
                    </Form.Group>

                </Form>

            </Card.Body>
        </Card>

    </>);
}
export default EditPatient;