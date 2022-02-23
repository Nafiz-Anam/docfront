import React, { useEffect } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, Redirect, useHistory } from 'react-router-dom';
import AccountLayout from './AccountLayout';
import { API_BASE_URL } from '../../apiconstant';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Row, Col, Card, Form, FloatingLabel, InputGroup, Button, Dropdown, DropdownButton } from 'react-bootstrap';


const AdminLogin = () => {
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');
    const [validated, setValidated] = useState(false);

    const schemaResolver = yupResolver(
        yup.object().shape({
            admin_username: yup.string().required('Please enter Username'),
            admin_password: yup.string().required('Please enter Password'),
        })
    );
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {

            let data = {
                admin_username: username,
                admin_password: pass,
            }
            console.log(data)
            fetch(

                API_BASE_URL + "/admin/login",
                {
                    method: 'post',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                }

            ).then(response =>

                response.json())
                .then(result => {
                    console.log(result);
                    if (result.status !== 0) {
                        toast.success('Login Successful');
                        const userDetails = {
                            admin_name: result.admin_name,
                            token: result.token,

                        };
                        console.log(userDetails);
                        window.localStorage.setItem('token', JSON.stringify(userDetails));
                        setTimeout(() => {

                            history.push('/pages/doctor')
                            // browserHistory.push('/')
                        }, 3000);

                        // dispatch(logoutUser(result.token))

                    } else {
                        toast.error(result.message)
                    }
                })

        }
        setValidated(true);

    }
    return (
        <>
            <AccountLayout>
                <div className="text-center w-75 m-auto">
                    <h4 className="text-dark-50 text-center mt-0 fw-bold">Sign In</h4>
                    <p className="text-muted mb-4">
                        Enter your email address and password to access admin panel
                    </p>
                </div>
                <Form noValidate validated={validated} onSubmit={handleSubmit} >
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="examplePassword2">Username</Form.Label>
                        <Form.Control
                            type="text"
                            name="admin_username"
                            id="examplePassword2"
                            placeholder="password placeholder"
                            onChange={(e) => setUsername(e.target.value)}

                        />

                        <Form.Control.Feedback type="invalid">
                            Please choose a username.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="examplePassword2">Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="admin_password"
                            id="examplePassword"
                            placeholder="password placeholder"
                            onChange={(e) => setPass(e.target.value)}

                        />

                        <Form.Control.Feedback type="invalid">
                            Please choose a password.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </AccountLayout>

        </>);

};

export default AdminLogin;