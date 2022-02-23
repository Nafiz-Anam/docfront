import React, { useState } from 'react';
import { Row, Col, Card, Button, Form } from 'react-bootstrap';
import Select from 'react-select';
import PageTitle from '../../components/PageTitle';
import { useHistory } from 'react-router-dom';
import { API_BASE_URL } from '../../apiconstant';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { forgotPassword, loginUser } from '../../redux/actions';
import { useRowSelect } from 'react-table';
import { toast } from 'react-toastify';

const EditCategory = () => {
    const location = useLocation();
    let loggedInUser = JSON.parse(window.localStorage.getItem('token'));
    let token = loggedInUser.token;
    let history = useHistory();
    const [validated, setValidated] = useState(false);
    const [categoryname, setCategoryname] = useState();
    const [category, setCategory] = useState('')
    const categoryId = ((location.pathname).split('/'))[3];
    console.log(categoryId);

    const handleInputChange = (key) => (event) => {
        setCategoryname({
            ...categoryname,
            [key]: event.target.value,
        });
    };

    useEffect(() => {
        fetch(API_BASE_URL + `/admin/doctor_category/get_by_id?token=${token}&id=${categoryId}`,
            {
                method: 'get',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            })
            .then(response => response.json())
            .then(result => {
                console.log(result);
                setCategoryname(result.data[0]);
            })
    }, [categoryId, token])

    // console.log({ id: categoryname.id });
    // console.log({ name: categoryname.category_name });
    console.log(categoryname);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();

        if (form.checkValidity() === false) {
            event.stopPropagation();

        }
        else {
            let data = {
                id: categoryId,
                category_name: categoryname.category_name
            }
            console.log(data);
            fetch(API_BASE_URL + `/admin/doctor_category/update?token=${token}`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(data)

            })
                .then(respone => respone.json())
                .then(result => {
                    console.log(result);
                    if (result.status == 1) {
                        toast.success('Catgory Updated succesfully');
                        setTimeout(() => {
                            history.push('/pages/category')
                        }, 3000);
                    } else {
                        toast.error(result.message);
                    }
                })
                .catch(error => {
                    console.log(error);
                    toast.error(error.message);
                })
        }

        setValidated(true);
    };


    return (<>

        <PageTitle
            breadCrumbItems={[
                { label: 'Category', path: '/pages/category' },
                { label: 'Update Category', path: '/pages/editcategory', active: true },
            ]}
            title={'Update Category'}
        />


        <Card>
            <Card.Body>
                <h4 className="header-title  mt-3 mb-3">Update Category</h4>

                <Form noValidate validated={validated} onSubmit={handleSubmit}>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={3} className='d-flex flex-row-reverse'>
                            Category Name
                        </Form.Label>

                        <Col sm={9}>
                            <Form.Control type="text" name="categoryname" placeholder="Enter Your Category Name" required type="text"
                                id="categoryname"
                                value={categoryname ? categoryname.category_name : ''}
                                // onChange={e => setCategory(e.target.value)}
                                onChange={e => setCategoryname(e.target.value)}
                                onChange={handleInputChange('category_name')}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a category.
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>





                    <Form.Group as={Row} className="mb-0" controlId="formHorizontalCheck">
                        <Col sm={{ span: 9, offset: 3 }}>
                            <Button variant="primary" type="submit">
                                Update Category
                            </Button>
                        </Col>
                    </Form.Group>

                </Form>

            </Card.Body>
        </Card>

    </>);
}
export default EditCategory;