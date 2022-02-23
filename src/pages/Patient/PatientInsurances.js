
import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// components
import PageTitle from '../../components/PageTitle';
import Table from '../../components/Table';

//dummy data
import { records as data, expandableRecords } from '../tables/data';
const columns = [
    {
        Header: 'Patient Name',
        accessor: 'name',
        sort: true,
    },
    {
        Header: 'Insurances Code',
        accessor: '',
        sort: true,
    },
    {
        Header: 'Insurance Name',
        accessor: '',
        sort: true,
    },
    {
        Header: 'Start Date',
        accessor: '',
        sort: false,
    },
    {
        Header: 'End Date',
        accessor: 'phone',
        sort: false,
    },

    {
        Header: 'Action',
        Cell: ({ row }) => {
            return (
                <>
                    <Button size="sm" style={{ marginRight: '10px' }}><i className='mdi mdi-pencil'></i></Button>
                    <Button variant="danger" size="sm"> <i className='mdi mdi-delete'></i></Button>

                </>
            );
        }

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
const Insurances = () => {
    return (
        <>

            <PageTitle
                breadCrumbItems={[

                    { label: 'Insurances', path: '/pages/insurances' },

                    { label: 'Insurances', path: '/pages/insurances', active: true },
                ]}
                title={'Insurances'}
            />
            <Row className='mb-2 d-flex'>
                <Col className="d-flex flex-row-reverse" >
                    <Link to="/pages/addinsurances"><Button>Add Insurances</Button></Link>
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
                                data={data}
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
    );
}
export default Insurances;