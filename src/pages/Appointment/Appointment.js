import { Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// components
import PageTitle from '../../components/PageTitle';
import Table from '../../components/Table';
import { useState, useEffect } from 'react';
//dummy data
import { records as data, expandableRecords } from '../tables/data';
import { API_BASE_URL } from '../../apiconstant';
import Select from 'react-select';


const updateAppoint = () => {
    window.location.href = '/pages/editappointment'
}
const columns = [
    {
        Header: 'Doctor Name',
        accessor: 'name',
        sort: true,
    },
    {
        Header: 'Patient Name',
        accessor: '',
        sort: true,
    },
    {
        Header: 'Appointment Date',
        accessor: 'appointment_date',
        sort: true,
    },
    {
        Header: 'Appointment Time',
        accessor: 'appointment_time',
        sort: false,
    },
    {
        Header: 'Appointment Status',
        accessor: 'appointment_status',
        sort: false,
    },
    {
        Header: 'Progress',
        accessor: 'progress',

    },
    {
        Header: 'Plan',
        accessor: 'plan',

    },
    // {
    //     Header: () => {
    //         return (
    //             <Select options={[

    //                 { value: 'Consultation', label: 'Consultation' },
    //                 { value: 'Follow Up', label: 'Follow Up' },
    //             ]} style={{ width: '100' }} />

    //         );
    //     },
    //     accessor: 'Select Option'
    // },
    {
        Header: 'Transaction',
        Cell: props =>
            <div className='d-flex' style={{ fontSize: "20px" }}>
                <i className='mdi mdi-eye'></i>

            </div>

    },
    {
        Header: 'Action',
        Cell: props =>
            <div className='d-flex' style={{ fontSize: "20px" }}>
                <i className='mdi mdi-square-edit-outline' style={{ marginRight: "10px" }} onMouseOver={() => {
                    updateAppoint()
                }}></i>
                <Link to="/pages/transaction">
                    <i className='mdi mdi-delete'></i></Link>

            </div>


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
const Appointment = () => {
    const [appo, setAppo] = useState([]);
    const loggedInUser = JSON.parse(window.localStorage.getItem('token'));
    const token = loggedInUser.token;

    useEffect(() => {

        fetch(API_BASE_URL + `/admin/appointments/get?token=${token}`,
            {
                method: 'get',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },

            },

        ).then(res => res.json())
            .then(result => {
                console.log(result);
                if (result.status == 1) {
                    setAppo(result.data);
                }

            })
            .catch(error => {
                console.log(error);
            })


    }, [])

    return (
        <>


            <PageTitle
                breadCrumbItems={[

                    { label: 'Appointment', path: '/pages/appointment' },

                    { label: 'Appointment', path: '/pages/appointment', active: true },
                ]}
                title={'Appointment'}
            />
            {/* <Row className='mb-2 d-flex'>
                <Col className="d-flex flex-row-reverse" >
                    <Link to="/pages/addappointment"><Button>Add Appointment</Button></Link>
                </Col>

            </Row> */}

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
                                data={appo}
                                pageSize={5}
                                sizePerPageList={sizePerPageList}
                                isSortable={true}
                                pagination={true}

                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    )
}
export default Appointment;