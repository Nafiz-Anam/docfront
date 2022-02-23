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
const AddCategory = () => {
    let loggedInUser = JSON.parse(window.localStorage.getItem('token'));
    let token = loggedInUser.token;
    let history = useHistory();
    const [validated, setValidated] = useState(false);
    const [categoryname, setCategoryname] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();

        }
        else {
            let data = {
                category_name: categoryname
            }
            fetch(API_BASE_URL + `/admin/doctor_category/add?token=${token}`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(data)

            })
                .then(respone => respone.json())
                .then(result => {
                    console.log(result);
                    if (result.status == 1) {
                        toast.success('Category Added Successfully');
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
                { label: 'Add Category', path: '/pages/addcateogry', active: true },
            ]}
            title={'Add Category'}
        />


        <Card>
            <Card.Body>
                <h4 className="header-title  mt-3 mb-3">Add Category</h4>

                <Form noValidate validated={validated} onSubmit={handleSubmit}>

                    <Form.Group as={Row} className="mb-3" controlId="Cateogry_name">
                        <Form.Label column sm={3} className='d-flex flex-row-reverse'>
                            Category Name
                        </Form.Label>

                        <Col sm={9}>
                            <Form.Control type="text" name="categoryname" placeholder="Enter Your First Name" required type="text"
                                id="categoryname"
                                // value={formInfo.first_name}
                                onChange={e => setCategoryname(e.target.value)} />
                            <Form.Control.Feedback type="invalid">
                                Please choose a category name.
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>





                    <Form.Group as={Row} className="mb-0" controlId="formHorizontalCheck">
                        <Col sm={{ span: 9, offset: 3 }}>
                            <Button variant="primary" type="submit">
                                Add Category
                            </Button>
                        </Col>
                    </Form.Group>

                </Form>

            </Card.Body>
        </Card>

    </>);
}
export default AddCategory;