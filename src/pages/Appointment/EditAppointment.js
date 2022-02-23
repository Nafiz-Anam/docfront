import React, { useState } from 'react';
import { Row, Col, Card, Button, Form, FormControl } from 'react-bootstrap';
import Select from 'react-select';
import PageTitle from '../../components/PageTitle';
const EditAppointment = () => {

    const [validated, setValidated] = useState(false);

    /*
     * handle form submission
     */
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };
    return (<>

        <PageTitle
            breadCrumbItems={[
                { label: 'Appointment', path: '/pages/appointment' },
                { label: 'Update Appointment', path: '/pages/editappointment', active: true },
            ]}
            title={'Update Appointment'}
        />


        <Card>
            <Card.Body>
                <h4 className="header-title  mt-3 mb-3">Update Appointment</h4>

                <Form noValidate validated={validated} onSubmit={handleSubmit}>

                    <Form.Group as={Row} className="mb-3" controlId="validationTooltip01">
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

                    <Form.Group as={Row} className="mb-3" controlId="validationTooltip02">
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

                    <Form.Group as={Row} className="mb-3" controlId="validationTooltip04">
                        <Form.Label htmlFor="exampledate3" column sm={3} className='d-flex flex-row-reverse'>
                            Appointment Date
                        </Form.Label>

                        <Col sm={9}>
                            <FormControl

                                type="date"
                                name="date"
                                containerClass={'mb-3'}

                                key="date"
                                required type="date"

                            />

                            <Form.Control.Feedback type="invalid">
                                Please choose a appointment date.
                            </Form.Control.Feedback>
                        </Col>

                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="validationTooltip05">
                        <Form.Label htmlFor="exampleProtime3" column sm={3} className='d-flex flex-row-reverse'>
                            Appointment Time
                        </Form.Label>

                        <Col sm={9}>
                            <Form.Control type="time" name="time" id="exampletime3" required type="time" key="time" />
                            <Form.Control.Feedback type="invalid">
                                Please choose a appointment time.
                            </Form.Control.Feedback>
                        </Col>

                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="validationTooltip03">
                        <Form.Label htmlFor="exampleprogress3" column sm={3} className='d-flex flex-row-reverse'>
                            Progress For Doctor
                        </Form.Label>

                        <Col sm={9}>
                            <Form.Control type="text" name="lastname" id="exampleprogress3" placeholder="Enter Progress For Doctor" required type="text" />
                            <Form.Control.Feedback type="invalid">
                                Please choose Progress.
                            </Form.Control.Feedback>
                        </Col>

                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="validationTooltip01">
                        <Form.Label htmlFor="examplePlan3" column sm={3} className='d-flex flex-row-reverse'>
                            Plan For Doctor
                        </Form.Label>

                        <Col sm={9}>
                            <Form.Control type="text" name="plan" id="examplePlan3" placeholder="Enter Plan For Doctor" required type="text" />
                            <Form.Control.Feedback type="invalid">
                                Please choose a plan.
                            </Form.Control.Feedback>
                        </Col>

                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="validationTooltip05">
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
                                Update Appointement
                            </Button>
                        </Col>
                    </Form.Group>

                </Form>

            </Card.Body>
        </Card>

    </>);
}
export default EditAppointment;