// @flow
import React, { useEffect } from 'react';
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
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

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

const ChangePassword = () => {
    // const dispatch = useDispatch();
    const { t } = useTranslation();
    const loggedInUser = JSON.parse(window.localStorage.getItem('token'));
    const token = loggedInUser.token;
    const [oldpass, setOldpass] = useState('');
    const [newpass, setNewpass] = useState('');
    const [confirmpass, setConfirmpass] = useState('')

    // useEffect(() => {
    //     dispatch(resetAuth());
    // }, [dispatch]);

    // const { loading, passwordReset, resetPasswordSuccess, error } = useSelector((state) => ({
    //     loading: state.Auth.loading,
    //     user: state.Auth.user,
    //     error: state.Auth.error,
    //     passwordReset: state.Auth.passwordReset,
    //     resetPasswordSuccess: state.Auth.resetPasswordSuccess,
    // }));

    /*
     * form validation schema
     */
    const schemaResolver = yupResolver(
        yup.object().shape({
            NewPassword: yup.string().required(t('Please Enter New Password')),
            OldPassword: yup.string().required(t('Please Enter Old Password')),
            ConfirmPassword: yup.string().required(t('Please Enter Confirm Password')).matches(newpass)

        })
    );

    /*
     * handle form submission
     */
    const history = useHistory();

    const onSubmit = () => {


        let data = {
            old_password: oldpass,
            new_password: newpass,
            // confirm_password: confirmpass
        }
        console.log(data);
        if (data.new_password === confirmpass) {
            fetch(API_BASE_URL + `/admin/change_password?token=${token}`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
                .then(respo => respo.json())
                .then(result => {
                    console.log(result);
                    if (result.status == 1) {
                        toast.success('Password Change Sucssessfully')
                        window.localStorage.removeItem('token')
                        setTimeout(() => {
                            history.push('/account/login')

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
        // dispatch(forgotPassword(formData['username']));
    };

    return (
        <>
            <AccountLayout bottomLinks={<BottomLink />}>
                <div className="text-center m-auto">
                    <h4 className="text-dark-50 text-center mt-0 font-weight-bold">Change Password</h4>

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
                        label='Old Password'
                        type="password"
                        name="OldPassword"
                        placeholder='Enter your Old Password'
                        containerClass={'mb-3'}
                        onChange={e => setOldpass(e.target.value)}
                    />
                    <FormInput
                        label='New Password'
                        type="password"
                        name="NewPassword"
                        placeholder='Enter your New Password'
                        containerClass={'mb-3'}
                        onChange={e => { setNewpass(e.target.value); console.log(newpass) }}

                    />

                    <FormInput
                        label='Confirm Password'
                        type="password"
                        name="ConfirmPassword"
                        placeholder='Enter your confirm Password'
                        containerClass={'mb-3'}
                        onChange={e => setConfirmpass(e.target.value)}

                    />

                    <div className="mb-3 mb-0 text-center">
                        <Button variant="primary" type="submit">
                            {/* {t('Submit')} */}
                            submit
                        </Button>
                    </div>
                </VerticalForm>
                {/* )} */}
            </AccountLayout>
        </>
    );
};

export default ChangePassword;
