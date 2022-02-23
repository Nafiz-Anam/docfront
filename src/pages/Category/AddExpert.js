import React, { useState } from 'react';
import { Row, Col, Card, Button, Form } from 'react-bootstrap';
import Select from 'react-select';
import PageTitle from '../../components/PageTitle';
import { useHistory } from 'react-router-dom';
import { API_BASE_URL } from '../../apiconstant';
import { useEffect } from 'react';
import { forgotPassword, loginUser } from '../../redux/actions';
import { useRowSelect } from 'react-table';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';

const AddExpert = () => {
    const location = useLocation();
    let loggedInUser = JSON.parse(window.localStorage.getItem('token'));
    let token = loggedInUser.token;
    let history = useHistory();
    const [validated, setValidated] = useState(false);
    const [expert, setExpertname] = useState('');
    const categoryId = ((location.pathname).split('/'))[3];

    const handleSubmit = (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();

        }
        else {
            let data = {
                category_id: categoryId,
                expertise_name: expert
            }
            fetch(API_BASE_URL + `/admin/expertises/add?token=${token}`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(data)

            })
                .then(respone => respone.json())
                .then(result => {
                    console.log(result);
                    if (result.status == 1) {
                        toast.success('Expert Added Successfully');
                        setTimeout(() => {
                            history.push('/pages/category')

                        }, 3000);
                    } else {
                        toast.error(result.message);
                    }

                })
        }

        setValidated(true);
    };
    return (<>

        <PageTitle
            breadCrumbItems={[
                { label: 'Category', path: '/pages/category' },
                { label: 'Add Expert', path: '/pages/addexpert', active: true },
            ]}
            title={'Add Expert'}
        />


        <Card>
            <Card.Body>
                <h4 className="header-title  mt-3 mb-3">Add Category</h4>

                <Form noValidate validated={validated} onSubmit={handleSubmit}>

                    <Form.Group as={Row} className="mb-3" controlId="Cateogry_name">
                        <Form.Label column sm={3} className='d-flex flex-row-reverse'>
                            Expert Name
                        </Form.Label>

                        <Col sm={9}>
                            <Form.Control type="text" name="expertname" placeholder="Enter Your Expert Name" required type="text"
                                id="expertname"
                                // value={formInfo.first_name}
                                onChange={e => setExpertname(e.target.value)} />
                            <Form.Control.Feedback type="invalid">
                                Please choose a expert name.
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>





                    <Form.Group as={Row} className="mb-0" controlId="formHorizontalCheck">
                        <Col sm={{ span: 9, offset: 3 }}>
                            <Button variant="primary" type="submit">
                                Add Expert
                            </Button>
                        </Col>
                    </Form.Group>

                </Form>

            </Card.Body>
        </Card>

    </>);
}
export default AddExpert;