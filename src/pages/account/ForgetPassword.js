// @flow
import React, { useEffect, useState } from 'react';
import { Button, Alert, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

//actions
import { resetAuth, forgotPassword } from '../../redux/actions';

// components
import { VerticalForm, FormInput } from '../../components/';

import AccountLayout from './AccountLayout';
import { API_BASE_URL } from '../../apiconstant';
import { toast } from 'react-toastify';


/* bottom link */
const BottomLink = () => {
    const { t } = useTranslation();

    return (
        <Row className="mt-3">
            <Col className="text-center">
                <p className="text-muted">
                    {t('Back to')}{' '}
                    <Link to={'/account/login'} className="text-muted ms-1">
                        <b>{t('Log In')}</b>
                    </Link>
                </p>
            </Col>
        </Row>
    );
};

const ForgetPassword = () => {
    // const dispatch = useDispatch();
    const { t } = useTranslation();

    const [adminemail, setAdminemail] = useState('');
    const [message, setMessage] = useState('');



    // useEffect(() => {
    //     dispatch(resetAuth());
    // }, [dispatch]);

    const { loading, passwordReset, resetPasswordSuccess, error } = useSelector((state) => ({
        loading: state.Auth.loading,
        // user: state.Auth.user,
        // error: state.Auth.error,
        // passwordReset: state.Auth.passwordReset,
        // resetPasswordSuccess: state.Auth.resetPasswordSuccess,
    }));

    /*
     * form validation schema
     */
    const schemaResolver = yupResolver(
        yup.object().shape({
            username: yup.string().email().required(t('Please enter Email')),
        })
    );

    /*
     * handle form submission
     */
    const onSubmit = (formData) => {
        let data = {
            email: adminemail
        }
        fetch(API_BASE_URL + `/admin/forgot_password`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(respons => respons.json())
            .then(result => {
                console.log(result);
                if (result.status == 1) {
                    // toast.success('OTP Is Successfully Send To The Email');
                    toast.success('Check your email')

                } else {
                    toast.error(result.message);
                }
            })
            .catch(error => {
                console.log(error);
                toast.error(error.message);
            })
        setMessage('Please Check Your Email and Follow The Instruction');

        // dispatch(forgotPassword(formData['username']));
    };

    return (
        <>
            <AccountLayout bottomLinks={<BottomLink />}>
                <div className="text-center m-auto">
                    <h4 className="text-dark-50 text-center mt-0 font-weight-bold">{t('Reset Password')}</h4>
                    <p className="text-muted mb-4">
                        {t(
                            "Enter your email address and we'll send you an email with instructions to reset your password"
                        )}
                    </p>
                </div>

                {/* {resetPasswordSuccess && <Alert variant="success">{resetPasswordSuccess.message}</Alert>}

                {error && (
                    <Alert variant="danger" className="my-2">
                        {error}
                    </Alert>
                )} */}

                {/* {!passwordReset && ( */}
                <VerticalForm onSubmit={onSubmit} resolver={schemaResolver}>
                    <FormInput
                        label='Email'
                        type="email"
                        name="username"
                        placeholder={t('Enter your Email')}
                        containerClass={'mb-3'}
                        onChange={e => setAdminemail(e.target.value)}
                    />
                    <p className="text-center mt-5"> {message} </p>

                    <div className="mb-3 mb-0 text-center">
                        <Button variant="primary" type="submit" disabled={loading}>
                            {t('Reset Password')}
                        </Button>
                    </div>
                </VerticalForm>
                {/* )} */}
            </AccountLayout>
        </>
    );
};

export default ForgetPassword;
