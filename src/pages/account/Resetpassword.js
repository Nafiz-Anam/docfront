// @flow
import React, { useEffect, useState } from 'react';
import { Button, Alert, Row, Col } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';


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

const ResetPassword = () => {
    // const dispatch = useDispatch();
    const { t } = useTranslation();

    const [newpass, setNewpass] = useState('');
    const [confirmpass, setConfirmpass] = useState('');
    const history = useHistory();
    function useQuery() {
        const { search } = useLocation();

        return React.useMemo(() => new URLSearchParams(search), [search]);
    }

    let query = useQuery();
    let token = query.get('reset_token');


    /*
     * form validation schema
     */
    const schemaResolver = yupResolver(
        yup.object().shape({
            newpassword: yup.string().required(t('Please enter New Password')),
            confirmpassword: yup.string().required(t('Please enter confirm Password')),
        })
    );

    /*
     * handle form submission
     */
    const onSubmit = () => {
        let data = {
            new_password: newpass,
            confirm_password: confirmpass
        }
        console.log(data);
        if (data.new_password === data.confirm_password) {
            fetch(API_BASE_URL + `/account/reset_password?reset_token=${token}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(result => {
                    console.log(result);
                    if (result.status !== 0) {
                        toast.success("Password Change Successfully. Redirecting to login...");
                        window.localStorage.removeItem('user');
                        setTimeout(() => {
                            history.push('/account/login');
                        }, 3000);
                    } else {
                        toast.error(result.message)
                    }
                })
                .catch(error => {
                    console.log(error);
                    toast.error(error.message);
                })

        }


        else {
            toast.error("Password doesn't match");
        }
        console.log(data);

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

                <VerticalForm onSubmit={onSubmit} resolver={schemaResolver}>
                    <FormInput
                        label='New Password'
                        type="password"
                        name="newpassword"
                        placeholder={t('Enter your New Password')}
                        containerClass={'mb-3'}
                        onChange={e => setNewpass(e.target.value)}
                    />

                    <FormInput
                        label='Confirm Password'
                        type="password"
                        name="confirmpassword"
                        placeholder={t('Enter your Confirm Password')}
                        containerClass={'mb-3'}
                        onChange={e => setConfirmpass(e.target.value)}
                    />
                    <div className="mb-3 mb-0 text-center">
                        <Button variant="primary" type="submit">
                            {t('Submit')}
                        </Button>
                    </div>
                </VerticalForm>

            </AccountLayout>
        </>
    );
};

export default ResetPassword;
