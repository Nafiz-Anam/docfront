// @flow
import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';

// components
import PageTitle from '../../components/PageTitle';
import Table from '../../components/Table';
import { useHistory, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../apiconstant';
import { toast } from 'react-toastify';

//dummy data
import { records as data, expandableRecords } from '../tables/data';


const loggedInUser = JSON.parse(window.localStorage.getItem('token'));
const token = loggedInUser.token;

// const editpatient = (props) => {
//     console.log(props.row)
//     // window.location.href = '/edit-patient/' + props.row.original.patient_id;
//     window.location.href = '/pages/editpatient/' + props.location.id
// }

const deletePatient = (props) => {
    // console.log(props.row.original.id);
    fetch(API_BASE_URL + `/admin/patients/delete?token=${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ 'id': props.row.original.id })
    })
        .then(response => response.json())
        .then(result => {
            if (result.status == 1) {
                console.log(result);
                toast.success('Patient Deleted Successfully');
                setTimeout(() => {

                    window.location.reload()
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
const columns = [
    {
        Header: 'First Name',
        accessor: 'first_name',
        sort: true,
    },
    // {
    //     Header: 'Middle Name',
    //     accessor: 'middle_name',
    //     sort: true,
    // },
    {
        Header: 'Last Name',
        accessor: 'last_name',
        sort: true,
    },
    {
        Header: 'Email',
        accessor: 'email_id',
        sort: false,
    },
    {
        Header: 'Phone Number',
        accessor: 'mobile_no',
        sort: false,
    },

    {
        Header: 'Action',
        Cell: props =>
            <div className='d-flex' style={{ fontSize: "20px", cursor: 'pointer' }} >
                <Link
                    to={{
                        pathname: '/pages/editpatient/' + props.row.original.id,
                        // state: { id: props.row.original.id },
                    }}
                >
                    {/* onMouseOver={() => editpatient(props)} */}
                    <i className='mdi mdi-square-edit-outline' style={{ marginRight: "10px", color: "gray" }}
                    ></i>
                </Link>
                < i className='mdi mdi-delete' onClick={() => deletePatient(props)}
                ></i >

            </div >




    },
];

const sizePerPageList = [
    {
        text: '5',
        value: 5,
    },
    {
        text: '10',
        value: 10,
    },
    {
        text: '25',
        value: 25,
    },
    {
        text: 'All',
        value: data.length,
    },
];
const Patient = () => {
    const [patientlist, setPateintlist] = useState([]);
    const history = useHistory();
    const loggedInUser = JSON.parse(window.localStorage.getItem('token'));
    const token = loggedInUser.token;
    const datarendering = () => {
        fetch(
            `http://13.235.177.69:5000/admin/patients/get?token=${token}`,

            {
                method: 'get',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },

            },

        ).then(res => res.json())
            .then(result => {
                console.log(result);
                if (result.status == 1) {
                    setPateintlist(result.data);
                }

            })
            .catch(error => {
                console.log(error);
            })
        // console.log(teamList);

    }

    useEffect(() => {
        datarendering();
    }, [])
    return (
        <>

            <PageTitle
                breadCrumbItems={[

                    { label: 'Patient', path: '/pages/Patient' },

                    { label: 'Patient', path: '/pages/Patient', active: true },
                ]}
                title={'Patient'}
            />
            <Row className='mb-2 d-flex'>
                <Col className="d-flex flex-row-reverse" >
                    <Link to="/pages/addpatient"><Button>Add Patient</Button></Link>
                </Col>

            </Row>

            <Row>

                <Col>

                    <Card>
                        <Card.Body>
                            {/* <h4 className="header-title">Pagination &amp; Sort</h4>
                            <p className="text-muted font-14 mb-4">
                                A simple example of table with pagination and column sorting
                            </p> */}

                            <Table
                                columns={columns}
                                data={patientlist}
                                pageSize={5}
                                sizePerPageList={sizePerPageList}
                                isSortable={true}
                                pagination={true}

                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            {/* <Row className='mb-2 d-flex'>
                <Col className="d-flex flex-row-reverse" >
                    <Link to="/pages/transaction"><Button>Transaction</Button></Link>
                </Col>

            </Row> */}
        </>
    );
}
export default Patient