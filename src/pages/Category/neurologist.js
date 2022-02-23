// @flow
import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router";
// components
import PageTitle from '../../components/PageTitle';
import Table from '../../components/Table';
import api1 from "../../api1";
import axios from 'axios'
import { records as data, expandableRecords } from '../tables/data';
const Neurologist = () => {
    const columns = [
        {
            Header: 'First Name',
            accessor: 'name',
            sort: true,
        },
        {
            Header: 'Middle Name',
            accessor: 'designation',
            sort: true,
        },
        {
            Header: 'Last Name',
            accessor: 'description',
            sort: true,
        },
        {
            Header: 'Email',
            accessor: 'image_url',
            sort: false,
        },
        {
            Header: 'Phone Number',
            accessor: 'phone',
            sort: false,
        },


        {
            Header: 'Action',
            Cell: ({ row }) => {
                const data = row.original;
                // console.log(data);
                const adddoc = () => {
                    // setAction("EDIT");
                    alert("hello")
                }
                return (
                    <>
                        <Button size='sm'>Expert</Button>
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

    ];

    return (
        <>
            <PageTitle
                breadCrumbItems={[

                    { label: 'Neurologist', path: '/pages/neurologist' },

                    { label: 'Neurologist', path: '/pages/neurologist', active: true },
                ]}
                title={'Neurologist'}
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
export default Neurologist;