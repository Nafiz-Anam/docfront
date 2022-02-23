import React, { useState } from 'react';
import { Row, Col, Card, Button, Form } from 'react-bootstrap';
import Select from 'react-select';
import PageTitle from '../../components/PageTitle';
const AddInsurance = () => {
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
                { label: 'Insurances', path: '/pages/insurance' },
                { label: 'Add Insurance', path: '/pages/addinsurance', active: true },
            ]}
            title={'Add Insurace'}
        />


        <Card>
            <Card.Body>
                <h4 className="header-title  mt-3 mb-3">Add Insurance</h4>

                <Form noValidate validated={validated} onSubmit={handleSubmit}>

                    <Form.Group as={Row} className="mb-3" controlId="validationTooltip01">
                        <Form.Label htmlFor="examplePname3" column sm={3} className='d-flex flex-row-reverse'>
                            Patient Name
                        </Form.Label>

                        <Col sm={9}>
                            <Form.Control type="text" name="pname" id="examplePname3" placeholder="Enter Your Patient Name" required type="text" />
                            <Form.Control.Feedback type="invalid">
                                Please choose a patient name.
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="validationTooltip02">
                        <Form.Label htmlFor="exampleInsurancecode3" column sm={3} className='d-flex flex-row-reverse'>
                            Insurancres Code
                        </Form.Label>

                        <Col sm={9}>
                            <Form.Control type="number" name="insurancecode" id="exampleinsurancecode3" placeholder="Enter Your Insurances Cdoe" required type="number" />
                            <Form.Control.Feedback type="invalid">
                                Please choose a insurances code.
                            </Form.Control.Feedback>
                        </Col>

                    </Form.Group>


                    <Form.Group as={Row} className="mb-3" controlId="validationTooltip03">
                        <Form.Label htmlFor="exampleInsurancesname3" column sm={3} className='d-flex flex-row-reverse'>
                            Insurance Name
                        </Form.Label>

                        <Col sm={9}>
                            <Form.Control type="text" name="insurancename" id="exampleInsurancename3" placeholder="Enter Your Insurances Name" required type="text" />
                            <Form.Control.Feedback type="invalid">
                                Please choose a insurance name.
                            </Form.Control.Feedback>
                        </Col>

                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="validationTooltip01">
                        <Form.Label htmlFor="exampleSdate3" column sm={3} className='d-flex flex-row-reverse'>
                            Insurances Start Date
                        </Form.Label>

                        <Col sm={9}>
                            <Form.Control type="date" name="edate" id="exampleSdate3" placeholder="Enter Your Insurances Start Date" required type="date" key='date' />
                            <Form.Control.Feedback type="invalid">
                                Please choose a insurance start date.
                            </Form.Control.Feedback>
                        </Col>

                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="validationTooltip04">
                        <Form.Label htmlFor="exampleEdate3" column sm={3} className='d-flex flex-row-reverse'>
                            Insurances End Date
                        </Form.Label>

                        <Col sm={9}>
                            <Form.Control type="date" name="edate" id="exampleEdate3" placeholder="Enter Your Insurances End Date" required type="date" key='date' />
                            <Form.Control.Feedback type="invalid">
                                Please choose a end date.
                            </Form.Control.Feedback>
                        </Col>

                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="validationTooltip05">
                        <Form.Label htmlFor="exampleInsuraceimg" column sm={3} className='d-flex flex-row-reverse'>
                            Insurance Image
                        </Form.Label>

                        <Col sm={9}>
                            <Form.Control type="file" name="profile" id="exampleInsuranceimg3" required type="file" />
                            <Form.Control.Feedback type="invalid">
                                Please choose a insurance image.
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
                                Add Insurances
                            </Button>
                        </Col>
                    </Form.Group>

                </Form>

            </Card.Body>
        </Card>

    </>);
}
export default AddInsurance;