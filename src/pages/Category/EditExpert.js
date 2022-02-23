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

const EditExpert = () => {
    const location = useLocation();
    let loggedInUser = JSON.parse(window.localStorage.getItem('token'));
    let token = loggedInUser.token;
    let history = useHistory();
    const [validated, setValidated] = useState(false);
    const [expertname, setExpertname] = useState();
    const [category, setCategory] = useState('')
    const expertId = ((location.pathname).split('/'))[3];
    const categoryId = ((location.pathname).split('/'))[4];

    console.log(expertId);
    console.log(categoryId);


    const handleInputChange = (key) => (event) => {
        setExpertname({
            ...expertname,
            [key]: event.target.value,
        });
    };

    useEffect(() => {
        fetch(API_BASE_URL + `/admin/expertises/get_by_id?token=${token}&id=${expertId}`,
            {
                method: 'get',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            })
            .then(response => response.json())
            .then(result => {
                console.log(result);
                setExpertname(result.data[0]);
            })
    }, [expertId, token])

    // console.log({ id: categoryname.id });
    // console.log({ name: categoryname.category_name });
    console.log(expertname);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();

        if (form.checkValidity() === false) {
            event.stopPropagation();

        }
        else {
            let data = {
                id: expertId,
                category_id: categoryId,
                expertise_name: expertname.expertise_name
            }
            console.log(data);
            fetch(API_BASE_URL + `/admin/expertises/update?token=${token}`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(data)

            })
                .then(respone => respone.json())
                .then(result => {
                    console.log(result);
                    if (result.status == 1) {
                        toast.success('Expert Updated succesfully');
                        setTimeout(() => {
                            history.push('/pages/expert')
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
                { label: 'Expert', path: '/pages/expert' },
                { label: 'Update Expert', path: '/pages/editexpert', active: true },
            ]}
            title={'Update Expert'}
        />


        <Card>
            <Card.Body>
                <h4 className="header-title  mt-3 mb-3">Update Expert</h4>

                <Form noValidate validated={validated} onSubmit={handleSubmit}>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={3} className='d-flex flex-row-reverse'>
                            Expert Name
                        </Form.Label>

                        <Col sm={9}>
                            <Form.Control type="text" name="expertname" placeholder="Enter Your Expert Name" required type="text"
                                id="expertname"
                                value={expertname ? expertname.expertise_name : ''}

                                onChange={e => setExpertname(e.target.value)}
                                onChange={handleInputChange('expertise_name')}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a Expert Name.
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>





                    <Form.Group as={Row} className="mb-0" controlId="formHorizontalCheck">
                        <Col sm={{ span: 9, offset: 3 }}>
                            <Button variant="primary" type="submit">
                                Update Expert
                            </Button>
                        </Col>
                    </Form.Group>

                </Form>

            </Card.Body>
        </Card>

    </>);
}
export default EditExpert;