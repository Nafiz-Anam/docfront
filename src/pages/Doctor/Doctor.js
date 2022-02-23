// @flow
import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button, Badge } from "react-bootstrap";

import { useHistory, Link } from "react-router-dom";
// components
import PageTitle from "../../components/PageTitle";
import Table from "../../components/Table";
import { API_BASE_URL } from "../../apiconstant";
import { toast } from "react-toastify";
import classNames from "classnames";

//dummy data
import { records as data, expandableRecords } from "../tables/data";

const loggedInUser = JSON.parse(window.localStorage.getItem("token"));
const token = loggedInUser.token;
const deleteDoctor = (props) => {
    console.log(props.row.original.id);
    fetch(API_BASE_URL + `/admin/doctors/delete?token=${token}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({ id: props.row.original.id }),
    })
        .then((response) => response.json())
        .then((result) => {
            if (result.status == 1) {
                console.log(result);
                toast.success("Doctor Deleted Successfully");
                window.location.reload();
            } else {
                toast.error(result.message);
            }
        })
        .catch((error) => {
            console.log(error);
            toast.error(error.message);
        });
};
const adddoc = (props) => {
    window.location.href = "/pages/editdoctor/" + props.row.original.id;
};

// approved status for doctor

// const Approved = () => {

// const [toogle, setToogle] = useState({ approvedbtn: false });

const approveddata = (props) => {
    fetch(API_BASE_URL + `/admin/doctors/changestatus?token=${token}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            id: props.row.original.id,
            application_status: "Approved",
        }),
    })
        .then((response) => response.json())
        .then((result) => {
            console.log(result);
            if (result.status == 1) {
                toast.success("Doctor Approved");
                // window.reload();
            } else {
                toast.error(result.message);
            }
        });
};

// }

const columns = [
    {
        Header: "First Name",
        accessor: "first_name",
        sort: true,
    },
    // {
    //     Header: 'Middle Name',
    //     accessor: 'middle_name',
    //     sort: true,
    // },
    {
        Header: "Last Name",
        accessor: "last_name",
        sort: true,
    },
    {
        Header: "Email",
        accessor: "email_id",
        sort: false,
    },
    {
        Header: "Phone Number",
        accessor: "mobile_no",
        sort: false,
    },
    // {
    //     Header: 'Degree',
    //     accessor: 'degree',
    //     sort: true,
    // },
    // {
    //     Header: 'status',
    //     Cell: props =>

    //         <div className='d-flex' style={{ fontSize: "16px", cursor: 'pointer' }}>
    //             <Badge pill bg="success" onClick={() => approveddata(props)}>
    //                 Approved
    //             </Badge>{' '}

    //         </div>
    // },
    {
        Header: "Status",
        accessor: "application_status",
        Cell: ({ row }) => {
            const data = row.original;
            // console.log(data);
            return data.application_status === "Approved" ? (
                // < div className='d-flex' style={{ fontSize: "16px", cursor: 'pointer' }}>
                <span
                    className={classNames("badge", {
                        "badge-success-lighten":
                            data.application_status === "Approved",
                    })}
                >
                    {data.application_status}
                </span>
            ) : // </div >
            data.application_status === "Pending" ? (
                <span
                    className={classNames("badge", {
                        "badge-warning-lighten":
                            data.application_status === "Pending",
                    })}
                >
                    {data.application_status}
                </span>
            ) : (
                <div
                    className="d-flex"
                    style={{ fontSize: "16px", cursor: "pointer" }}
                >
                    <Badge pill bg="danger">
                        Rejected
                    </Badge>{" "}
                </div>
            );
        },
    },

    {
        Header: "Action",

        Cell: (props) => (
            <div
                className="d-flex"
                style={{ fontSize: "20px", cursor: "pointer" }}
            >
                <Link
                    to={{
                        pathname: "/pages/editdoctor/" + props.row.original.id,
                        state: props.row.original,
                    }}
                >
                    <i
                        className="mdi mdi-square-edit-outline"
                        style={{ marginRight: "10px", color: "gray" }}
                    ></i>
                </Link>
                {/* <i className='mdi mdi-square-edit-outline' style={{ marginRight: "10px" }} onMouseOver={() => adddoc(props)}></i> */}

                <i
                    className="mdi mdi-delete"
                    onClick={() => deleteDoctor(props)}
                ></i>
            </div>
        ),
    },
];

const sizePerPageList = [
    {
        text: "5",
        value: 5,
    },
    {
        text: "10",
        value: 10,
    },
    {
        text: "25",
        value: 25,
    },
    {
        text: "All",
        value: data.length,
    },
];

const Doctor = () => {
    const [teamList, setTeamList] = useState([]);
    const loggedInUser = JSON.parse(window.localStorage.getItem("token"));
    const token = loggedInUser.token;
    const [doctor, setDoctor] = useState([]);
    console.log(token);

    const dataRendering = () => {
        fetch(
            `http://13.235.177.69:5000/admin/doctors/get?token=${token}`,

            {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            }
        )
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.status === 1) {
                    setTeamList(result.data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
        // console.log(teamList);
    };

    useEffect(() => {
        dataRendering();
    }, []);

    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: "Doctor", path: "/pages/doctor" },

                    { label: "Doctor", path: "/pages/doctor", active: true },
                ]}
                title={"Doctors"}
            />
            {/* <Row className='mb-2 d-flex'>
                <Col className="d-flex flex-row-reverse" >
                    <Link to="/pages/adddoctor"><Button>Add Doctor</Button></Link>
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
                                data={teamList}
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
};
export default Doctor;
