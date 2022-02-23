// @flow
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
        Header: 'Phone Number',
        accessor: 'phone',
        sort: true,
    },
    {
        Header: 'Address',
        accessor: '',
        sort: true,
    },
    {
        Header: 'Transaction Date',
        accessor: '',
        sort: false,
    },
    {
        Header: 'Transaction Time',
        accessor: '',
        sort: false,
    },
    {
        Header: 'Ammount',
        accessor: '',
        sort: false,
    },
    {
        Header: 'Transaction Type',
        accessor: '',
        sort: false,
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
const Transaction = () => {
    return (
        <>

            <PageTitle
                breadCrumbItems={[

                    { label: 'Transaction', path: '/pages/transaction' },

                    { label: 'Transaction', path: '/pages/transaction', active: true },
                ]}
                title={'Transaction'}
            />
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
export default Transaction;