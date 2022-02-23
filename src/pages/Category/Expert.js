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
import { useLocation } from 'react-router-dom';

// import Expert from './Expert';

const loggedInUser = JSON.parse(window.localStorage.getItem('token'));
const token = loggedInUser.token;


const editExpert = (props) => {
    window.location.href = '/pages/editexpert/' + props.row.original.id + '/' + props.row.original.category_id;
}

// const AddExpert = (props) => {


//     window.location.href = '/pages/addexpert/' + ((useLocation().pathname).split('/'))[3];
// }

// delete Expert
const deleteExpert = (props) => {
    console.log(props.row.original.id);
    fetch(API_BASE_URL + `/admin/expertises/delete?token=${token}`, {
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
        Header: 'Expert Name',
        accessor: 'expertise_name',
        sort: true,
    },

    {
        Header: 'Action',
        Cell: props =>
            <div className='d-flex' style={{ fontSize: "20px" }} >
                {/* <Link to={{
                        pathname: '/pages/editcategory/' + props.row.original.id
                    }}> */}
                <i className='mdi mdi-square-edit-outline' style={{ marginRight: "10px" }}
                    onClick={() => editExpert(props)}
                ></i>
                {/* </Link> */}
                <i className='mdi mdi-delete' onClick={() => deleteExpert(props)}></i>
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

const Expert = () => {
    const [expertdata, setExpertdata] = useState([]);
    const loggedInUser = JSON.parse(window.localStorage.getItem('token'));
    const token = loggedInUser.token;
    const location = useLocation();
    const categoryid = ((location.pathname).split('/'))[3];
    const Datarendering = () => {
        fetch(API_BASE_URL + `/admin/expertises/get?token=${token}&category_id=${categoryid}`, {
            method: 'get',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        })
            .then(response => response.json())
            .then(result => {
                console.log(result);
                setExpertdata(result.data)

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

                    { label: 'Expert', path: '/pages/expert' },

                    { label: 'Expert', path: '/pages/expert', active: true },
                ]}
                title={'Expert'}
            />
            <Row className='mb-2 d-flex'>
                <Col className="d-flex flex-row-reverse" >
                    <Link to={{
                        pathname: '/pages/addexpert/' + ((useLocation().pathname).split('/'))[3]
                        // state: { id: props.row.original.id },
                    }}>
                        <Button>Add Expert</Button>
                    </Link>
                </Col>

            </Row>


            <Row>

                <Col>

                    <Card>
                        <Card.Body>

                            <Table
                                columns={columns}
                                data={expertdata}
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
export default Expert;