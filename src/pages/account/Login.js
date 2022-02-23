// @flow
import React, { useEffect } from 'react';
import { Button, Alert, Row, Col } from 'react-bootstrap';
import { Link, Redirect, useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

//actions
import { resetAuth, loginUser, logoutUser } from '../../redux/actions';

import { useQuery } from '../../hooks/';

// components
import { VerticalForm, FormInput } from '../../components/';

import AccountLayout from './AccountLayout';
import { API_BASE_URL } from '../../apiconstant';
import { useState } from 'react';

/* bottom link of account pages */
// const BottomLink = () => {
//     const { t } = useTranslation();

//     return (
//         <Row className="mt-3">
//             <Col className="text-center">
//                 <p className="text-muted">
//                     {t("Don't have an account?")}{' '}
//                     <Link to={'/account/register'} className="text-muted ms-1">
//                         <b>{t('Sign Up')}</b>
//                     </Link>
//                 </p>
//             </Col>
//         </Row>
//     );
// };

const Login = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();
    const query = useQuery();
    const next = query.get('next');
    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');
    const [showpassword, setShowPassword] = useState({
        type: 'text'
    });

    // useEffect(() => {
    //     // loginlist();
    //     dispatch(resetAuth());

    // }, [dispatch]);

    const { loading, userLoggedIn, user, error } = useSelector((state) => ({
        loading: state.Auth.loading,
        user: state.Auth.user,
        error: state.Auth.error,
        userLoggedIn: state.Auth.userLoggedIn,
    }));

    /*
    form validation schema
    */
    const schemaResolver = yupResolver(
        yup.object().shape({
            admin_username: yup.string().required(t('Please enter Username')),
            admin_password: yup.string().required(t('Please enter Password')),
        })
    );

    // password hide and show
    const passwordShow = () => {
        setShowPassword(({ type }) => ({
            type: type === 'text' ? 'password' : 'text'
        }))
    }

    const handleInputchange = (key) => (event) => {
        setPass({ ...pass, [key]: event.target.value });
    }

    /*
    handle form submission
    */
    const onSubmit = () => {
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
                    toast.success('Login Successfully');
                    const userDetails = {
                        admin_name: result.admin_name,
                        token: result.token,

                    };
                    console.log(userDetails);
                    window.localStorage.setItem('token', JSON.stringify(userDetails));
                    setTimeout(() => {

                        history.push('/')
                        // browserHistory.push('/')
                    }, 3000);

                    // dispatch(logoutUser(result.token))

                } else {
                    toast.error(result.message)
                }
            })
            .catch(error => {

                console.log(error);
                toast.error(error.message);
            })
        // console.log(pass);
        // dispatch(loginUser(formData['username'], formData['password']));

    };

    return (
        <>
            {/* {userLoggedIn || user ? <Redirect to={next ? next : '/'}></Redirect> : null} */}

            <AccountLayout>
                <div className="text-center w-75 m-auto">
                    <h4 className="text-dark-50 text-center mt-0 fw-bold">{t('Sign In')}</h4>
                    <p className="text-muted mb-4">
                        {t('Enter your email address and password to access admin panel.')}
                    </p>
                </div>

                {/* {error && (
                    <Alert variant="danger" className="my-2">
                        {error}
                    </Alert>
                )} */}

                <VerticalForm
                    onSubmit={onSubmit}
                    resolver={schemaResolver}
                // defaultValues={{ username: 'test', password: 'test' }}
                >
                    <FormInput
                        label={t('Username')}
                        type="text"
                        name="admin_username"
                        placeholder={t('Enter your Username')}
                        containerClass={'mb-3'}
                        onChange={(e) => setUsername(e.target.value)}

                    />
                    {/* <div className='d-flex flex-column'> */}
                    <FormInput
                        label={t('Password')}

                        type='password'
                        name="admin_password"
                        placeholder={t('Enter your password')}
                        containerClass={'mb-3'}
                        // value={pass}

                        // defaultValues='12345'
                        onChange={(e) => setPass(e.target.value)}
                    // onChange={handleInputchange("admin_password")}

                    />


                    {/* <span className="password__show" onClick={passwordShow}>{showpassword.type === 'text' ? 'Hide' : 'Show'}</span>
                    </div> */}
                    <div className="mb-3 mb-0 text-center">
                        <Button variant="primary" type="submit" disabled={loading}>
                            {t('Log In')}
                        </Button>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <Link to="/account/forget-password" className="text-muted float-end">
                                <small>{t('Forgot your password?')}</small>

                            </Link>
                        </div>
                        {/* <div className='col-6'>
                            <Link to="/account/change-password" className="text-muted float-end">
                                <small>{t('Change your password?')}</small>

                            </Link>
                        </div> */}
                    </div>
                </VerticalForm>
            </AccountLayout>
        </>
    );
};

export default Login;
