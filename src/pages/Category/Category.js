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
import { API_BASE_URL } from '../../apiconstant';
import { toast } from 'react-toastify';
// import Expert from './Expert';

const loggedInUser = JSON.parse(window.localStorage.getItem('token'));
const token = loggedInUser.token;
const editCategory = (props) => {
    window.location.href = '/pages/editcategory/' + props.row.original.id;
}
const ExpertCategory = (props) => {
    window.location.href = '/pages/expert/' + props.row.original.id;
}

// delete category
const deleteCategory = (props) => {
    console.log(props.row.original.id);
    fetch(API_BASE_URL + `/admin/doctor_category/delete?token=${token}`, {
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
                    // history.push('/pages/category')
                }, 3000);
            } else {
                toast.error(result.message)

            }

        })
        .catch(error => {
            console.log(error);
            // toast.error(error.message);
        })
}



const columns = [
    {
        Header: 'Category Name',
        accessor: 'category_name',
        sort: true,
    },

    {
        Header: 'Expert',
        Cell: props =>
            <div className='d-flex' style={{ fontSize: "16px", cursor: 'pointer' }} >

                <Badge pill bg="primary" onClick={() => ExpertCategory(props)}>Expert</Badge>
            </div>

    },
    {
        Header: 'Action',
        Cell: props =>
            <div className='d-flex' style={{ fontSize: "20px", cursor: 'pointer' }} >
                {/* <Link to={{
                        pathname: '/pages/editcategory/' + props.row.original.id
                    }}> */}
                <i className='mdi mdi-square-edit-outline' style={{ marginRight: "10px" }}
                    onClick={() => editCategory(props)}
                ></i>
                {/* </Link> */}
                <i className='mdi mdi-delete' onClick={() => deleteCategory(props)}></i>
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

const Category = () => {

    const [categorydata, setCategorydata] = useState([]);
    const loggedInUser = JSON.parse(window.localStorage.getItem('token'));
    const token = loggedInUser.token;
    const Datarendering = () => {
        fetch(API_BASE_URL + `/admin/doctor_category/get?token=${token}`, {
            method: 'get',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        })
            .then(response => response.json())
            .then(result => {
                console.log(result);
                setCategorydata(result.data)

            })
            .catch(error => {
                console.log(error);

            })
    }


    useEffect(() => {
        Datarendering();
    }, [])
    return (
        <>
            <PageTitle
                breadCrumbItems={[

                    { label: 'Category', path: '/pages/category' },

                    { label: 'Categroy', path: '/pages/category', active: true },
                ]}
                title={'Category'}
            />
            <Row className='mb-2 d-flex'>
                <Col className="d-flex flex-row-reverse" >
                    <Link to="/pages/addcategory"><Button>Add Category</Button></Link>
                </Col>

            </Row>


            <Row>

                <Col>

                    <Card>
                        <Card.Body>

                            <Table
                                columns={columns}
                                data={categorydata}
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
export default Category;