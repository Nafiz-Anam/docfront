import React, { useState } from 'react';
import { Row, Col, Card, Button, Form, FormControl } from 'react-bootstrap';
import Select from 'react-select';
import PageTitle from '../../components/PageTitle';
import { API_BASE_URL } from '../../apiconstant';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
const AddAppointment = () => {

    const [validated, setValidated] = useState(false);
    const [formInfo, setFormInfo] = useState('');
    const loggedInUser = JSON.parse(window.localStorage.getItem('token'));
    const token = loggedInUser.token;
    const history = useHistory();
    const [doctor, setDoctor] = useState('');
    const [patient, setPatient] = useState('');
    const [appdate, setAppdate] = useState('');
    const [apptime, setApptime] = useState('');
    const [plandoc, setPlandoc] = useState('');
    const [progressdoc, setProgressdoc] = useState('');
    const [status, setStatus] = useState('');
    /*
     * handle form submission
     */
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {

            fetch(API_BASE_URL + `/patient/patient_appointments/add?token=${token}`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(formInfo)
            })
                .then(response => response.json())
                .then(result => {
                    console.log(result);
                    if (result.status == 1) {
                        toast.success('Appointmnet Added successfully');
                        setTimeout(() => {
                            history.push('/pages/appointment')
                        }, 3000);
                    } else {
                        toast.error(result.message)
                    }
                }).catch(error => {

                    console.log(error);
                    toast.error(error.message);
                })
        }
        setValidated(true);
    };
    return (<>

        <PageTitle
            breadCrumbItems={[
                { label: 'Appointment', path: '/pages/appointment' },
                { label: 'Add Appointment', path: '/pages/addappointment', active: true },
            ]}
            title={'Add Appointment'}
        />


        <Card>
            <Card.Body>
                <h4 className="header-title  mt-3 mb-3">Add Appointment</h4>

                <Form noValidate validated={validated} onSubmit={handleSubmit}>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label htmlFor="exampledname3" column sm={3} className='d-flex flex-row-reverse'>
                            Doctor Name
                        </Form.Label>

                        <Col sm={9}>
                            <Form.Control type="text" name="docname" id="exampleDocname3" placeholder="Enter Doctor Name" required type="text" />
                            <Form.Control.Feedback type="invalid">
                                Please choose a doctor name.
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label htmlFor="examplePatName3" column sm={3} className='d-flex flex-row-reverse'>
                            Patient Name
                        </Form.Label>

                        <Col sm={9}>
                            <Form.Control type="text" name="middle" id="examplePatName3" placeholder="Enter Patient Name" required type="text" />
                            <Form.Control.Feedback type="invalid">
                                Please choose a patient name.
                            </Form.Control.Feedback>
                        </Col>

                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label htmlFor="exampledate3" column sm={3} className='d-flex flex-row-reverse'>
                            Appointment Date
                        </Form.Label>

                        <Col sm={9}>
                            <FormControl

                                type="date"
                                name="date"
                                containerClass={'mb-3'}
                                // onChange={handleInputChange('appointment_date')}
                                key="date"
                                required type="date"

                            />

                            <Form.Control.Feedback type="invalid">
                                Please choose a appointment date.
                            </Form.Control.Feedback>
                        </Col>

                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label htmlFor="exampleProtime3" column sm={3} className='d-flex flex-row-reverse'>
                            Appointment Time
                        </Form.Label>

                        <Col sm={9}>

                            <Form.Control type="time" name="time" id="exampletime3" required type="time" key="time"
                            // onChange={handleInputChange('appointment_time')}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a appointment time.
                            </Form.Control.Feedback>
                        </Col>

                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label htmlFor="exampleprogress3" column sm={3} className='d-flex flex-row-reverse'>
                            Progress For Doctor
                        </Form.Label>

                        <Col sm={9}>
                            <Form.Control type="text" name="lastname" id="exampleprogress3" placeholder="Enter Progress For Doctor" required type="text"
                            // onChange={handleInputChange('progress')}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose Progress.
                            </Form.Control.Feedback>
                        </Col>

                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                        <Form.Label htmlFor="examplePlan3" column sm={3} className='d-flex flex-row-reverse'>
                            Plan For Doctor
                        </Form.Label>

                        <Col sm={9}>
                            <Form.Control type="text" name="plan" id="examplePlan3" placeholder="Enter Plan For Doctor" required type="text"
                            // onChange={handleInputChange('plan')}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a plan.
                            </Form.Control.Feedback>
                        </Col>

                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label htmlFor="exampleappstatus3" column sm={3} className='d-flex flex-row-reverse'>
                            Appointment Status
                        </Form.Label>

                        <Col sm={9}>
                            <Select
                                className="react-select"
                                classNamePrefix="react-select"
                                placeholder="Select Appointment Status"

                                options={[
                                    { value: 'Consultation', label: 'Consultation' },
                                    { value: 'Follow up', label: 'Follow up' },
                                ]}></Select>

                            <Form.Control.Feedback type="invalid">
                                Please choose a appointment status.
                            </Form.Control.Feedback>
                        </Col>

                    </Form.Group>



                    <Form.Group as={Row} className="mb-3" controlId="validationTooltip04">
                        <Form.Label htmlFor="exampleactive3" column sm={3} className='d-flex flex-row-reverse'>
                            IsActive
                        </Form.Label>
                        <Col sm={9} >
                            <div className='d-flex pd-1 mt-1'>
                                <Form.Check type="radio" id="default-checkbox" label="Active" style={{ marginRight: 10 }} />
                                <Form.Check className='ml-3' type="radio" id="default-checkbox" label="InActive" />
                            </div>
                        </Col>

                    </Form.Group>

                    <Form.Group as={Row} className="mb-0" controlId="formHorizontalCheck">
                        <Col sm={{ span: 9, offset: 3 }}>
                            <Button variant="primary" type="submit">
                                Add Appointement
                            </Button>
                        </Col>
                    </Form.Group>

                </Form>

            </Card.Body>
        </Card>

    </>);
}
export default AddAppointment;