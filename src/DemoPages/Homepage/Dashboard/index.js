import React, {Fragment, useEffect, useState} from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import axios from "axios";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IoIosAddCircle} from "react-icons/all";
import {faTrash, faEdit} from "@fortawesome/free-solid-svg-icons";

import ReactTable from "react-table";


import {
    Row, Col,
    Card, CardBody, Button, Container
} from 'reactstrap';

import EditMember from "./edit";
import AddMember from "./add";
import Delete from "./delete";
import {Link} from "react-router-dom";


const TableMember = () => {

    {/*Deklarasi Awal Variabel*/}
    const [dataTable, setDataTable] = useState([])
    const [modalEdit, setModalEdit] = useState(false)
    const [modalAdd, setModalAdd] = useState(false)
    const [modalDelete, setModalDelete] = useState(false)
    const [del, setDel] = useState(0)
    const [dataa, setDataa] = useState({})
    const [pictureUrl, setPictureUrl] = useState("")
    // const [image, setImage] = useState("")

    {/*Untuk memperbarui nilai variaabel berdasarkan state yang diedit atau di delete sebelumnya*/}
    useEffect(() => {
        tampil()
    }, [del])


    {/*Mengambil semua data dari BE. Lalu data akan dioleh oleh then dan catch. Jika sukses maka akan diberikan ke var DataTable*/}
    const tampil = () =>{


        axios.get("http://localhost:1717/team")
            .then(res => {
                setDataTable(res.data)
                console.log(dataTable)
            }).catch();
    }

    const toggleAdd = () => {
        setModalAdd(!modalAdd)
    }


    const toggleDelete = (id) => {
        setModalDelete(!modalDelete)
        setDel(id)
    }

    const toggleEdit = (val) => {
        setModalEdit(!modalEdit)
        console.log('Show modal edit', val)

        axios.get('http://localhost:1717/team/' + val).then(res => {
            setDataa(res.data)
        })
        axios.get("http://localhost:1717/team/getImage/" + val).then(res => {
            setPictureUrl(res.data)
        }).catch()
    }

    const deleteData = (id) => {
        console.log("hai hapus ya")
        axios.delete('http://localhost:1717/team/' + id).then(tampil).catch(err => console.log(err))
        setDel(id)
        onChangeToggleDelete(false)
    }

    const onChangeToggleAdd = () => {
        setModalAdd(!modalAdd)
    }

    const onChangeToggleEdit = () => {
        setModalEdit(!modalEdit)
    }

    const onChangeToggleDelete = () => {
        setModalDelete(!modalDelete)
    }


    return (
        <Fragment>
            <CSSTransitionGroup
                component="div"
                transitionName="TabsAnimation"
                transitionAppear={true}
                transitionAppearTimeout={0}
                transitionEnter={false}
                transitionLeave={false}>


                <div className="app-main">
                    <div className="app-main__inner">
                        <Container fluid>
                            <Row>
                                <Col md="12">
                                    <Card>
                                        <CardBody>
                                            <div
                                                className="p-5 bg-plum-plate">
                                                <div className="slider-content" style={{
                                                    color: "white", textAlign: "center"
                                                }}>
                                                    <h3>Master Karyawan</h3>
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="12">
                                    <Card className="main-card mb-3">
                                        <CardBody>

                                            <Link to="/promise/karyawaneditadd" style={{textDecoration: "none"}}>
                                                <Button outline className="mb-2 mr-2 btn-pill" color="primary"> <IoIosAddCircle size={17}/>Tambah Karyawan </Button>
                                            </Link>
                                            <ReactTable
                                                data={dataTable}
                                                filterable
                                                columns=
                                                    {[{
                                                        columns: [
                                                            {
                                                                Header: "No",
                                                                accessor: "noId"
                                                            },
                                                            {
                                                                Header: "Nama",
                                                                accessor: "nama"
                                                            },
                                                            {
                                                                Header: "Tanggal Lahir",
                                                                accessor: "tanggalLahir"
                                                            },
                                                            {
                                                                Header: "Jabatan",
                                                                accessor: "jabatan"
                                                            },
                                                            {
                                                                Header: "NIP",
                                                                accessor: "nip"
                                                            },

                                                            {
                                                                Header: "Jenis Kelamin",
                                                                accessor: "jenisKelamin"
                                                            },
                                                            {
                                                                Header: 'Picture',
                                                                accessor: 'pictureUrl',
                                                                // Cell: row => (
                                                                //     <img src={"data:image/*;base64," + image(row.original.id)}/>
                                                                // )
                                                            },
                                                        ]
                                                    },
                                                        {
                                                            columns: [
                                                                {
                                                                    Header: "Aksi",
                                                                    accessor: "action",
                                                                    filterable: false,
                                                                    Cell: row => (
                                                                        <div className="d-block w-100 text-center">
                                                                            <Button outLine
                                                                                    className="mb-2 mr-2 btn-pill"
                                                                                    color="primary"
                                                                                    onClick={(e) => {
                                                                                        toggleEdit(row.original.id)
                                                                                    }}>
                                                                                <FontAwesomeIcon icon={faEdit}/>
                                                                            </Button>
                                                                            <Button outLine
                                                                                    className="mb-2 mr-2 btn-pill"
                                                                                    color="primary"
                                                                                    onClick={(e) => {
                                                                                        toggleDelete(row.original.id)
                                                                                    }}>
                                                                                <FontAwesomeIcon icon={faTrash}/>
                                                                            </Button></div>
                                                                    )
                                                                }
                                                            ]
                                                        }
                                                    ]}
                                                defaultPageSize={10}
                                                className="-striped -highlight"
                                            />

                                        </CardBody>
                                    </Card>

                                    <EditMember toggle={() => {
                                        toggleEdit()
                                    }} tampil={()=> {
                                        tampil()
                                    }} modal={modalEdit} data={dataa} pictureUrl={pictureUrl} onChangeToggle={onChangeToggleEdit} />

                                    <AddMember toggle={() => {
                                        toggleAdd()
                                    }} modal={modalAdd} onChangeToggle={onChangeToggleAdd} tampil = {()=>{tampil()}}/>

                                    <Delete toggle={() => {
                                        toggleDelete()
                                    }} modal={modalDelete} data={del} onChangeToggle={onChangeToggleDelete} delete={deleteData} tampil = {() => {tampil()}} />


                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
            </CSSTransitionGroup>
        </Fragment>
    )
}

export default TableMember