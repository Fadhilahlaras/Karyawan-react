import React, {Fragment, useEffect, useState} from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import axios from "axios";

import {
    Row, Col,
    Card, CardBody, Button, Container, FormGroup, Label, Input, Form, ModalFooter
} from 'reactstrap';
import Select from "react-select";


const UbahDataMember = (props) => {

    const [nama, setNama] = useState(props.data.nama)
    const [tanggalLahir, setTanggalLahir] = useState(props.data.tanggalLahir)
    const [selectOptions, setSelectOptions] = useState([]);
    const [idJabatan, setIdJabatan] = useState(props.data.idJabatan)
    const [nip, setNip] = useState(props.data.nip)
    const [jenisKelamin, setJenisKelamin] = useState(null)
    const [pictureUrl, setPictureUrl] = useState(props.data.pictureUrl);
    const [img, setImg] = useState(
        "data:/image/*;base64," + props.pictureUrl
    )

    const onSubmit = () => {
        {/*Create a new object FromData*/}
        const formData = new FormData();

        {/*A method to converts a JavaScript object or value to a JSON string*/}
        const json = JSON.stringify({
            "id": this.props.id,
            "nama": nama == null ? props.data.nama : nama,
            "tanggalLahir":  tanggalLahir == null ? props.data.tanggalLahir : tanggalLahir,
            "idJabatan": idJabatan == null ? props.data.idJabatan : idJabatan,
            "nip": nip == null ? props.data.nip : nip,
            "jenisKelamin": jenisKelamin == null ? props.data.jenisKelamin : jenisKelamin,
        });


        {/*Sebuah object yang berisi hasil convert JS ke JSON*/}
        const blobDoc = new Blob([json], {
            type: 'application/json'
        });

        formData.append("pictureUrl", pictureUrl == null ? props.data.pictureUrl : pictureUrl)
        formData.append('data', blobDoc)

        const config = {
            headers: {
                'content-type': 'multipart/mixed'
            }
        }

        console.log("ini adalah "+ price)
        axios.post("http://localhost:1717/team/save", formData, config)
            .then(()=>{tampil()})

        props.onChangeToggle(false)
        setImg("");
    }

    const imagePreview = (e)=>{
        const url=URL.createObjectURL(e.target.files[0]);
        setImg(url);
        setPictureUrl(e.target.files[0])
    }

    const tampil = () =>{props.tampil()}


    const getOptions = () => {
        console.log("why im not around")
        axios.get('http://localhost:1717/api/jabatancategory', {
            headers: {'Content-Type': 'application/json'}
        }).then(res => {
            const data = res.data;
            const options = data.map(d => ({
                "value": d.id,
                "label": d.jabatanName

            }));
            setSelectOptions(options)
        })

        console.log(selectOptions)
    }

    // const tampil = () =>{props.tampil}

    useEffect(() => {
        getOptions();
        tampil()
    }, [])

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

                                            <Form>

                                                <FormGroup>
                                                    <Label>Nama</Label>
                                                    <Input type="text" name="nama" id="nama"
                                                           placeholder="Nama" onChange={(e) => {
                                                        setNama(e.target.value)
                                                    }}/>
                                                </FormGroup>

                                                <FormGroup>
                                                    <Label>Tanggal Lahir</Label>
                                                    <Input type="date" name="tanggalLahir" id="tanggalLahir" onChange={(e) => {
                                                        setTanggalLahir(e.target.value)
                                                    }}/>
                                                </FormGroup>

                                                <FormGroup>
                                                    <Label for="jabatan">Jabatan</Label>
                                                    <Select name="idJabatan" id="idJabatan"
                                                            options={selectOptions}
                                                        // onChange={handleChangeSelect.bind(this)}
                                                            onChange={(e) => {
                                                                setIdJabatan(e.value)
                                                            }}
                                                    />
                                                </FormGroup>


                                                <FormGroup>
                                                    <Label for="nip">Jabatan</Label>
                                                    <Input type="number" name="nip" id="nip"
                                                           placeholder="Input your NIP" onChange={(e) => {
                                                        setNip(e.target.value)
                                                    }}/>
                                                </FormGroup>


                                                <FormGroup>
                                                    <Label for="jenisKelamin">Jenis Kelamin</Label>
                                                    <Input type="select" name="jenisKelamin" id="jenisKelamin" onChange={(e) => {
                                                        setJenisKelamin(e.target.value)
                                                    }}>
                                                        <option></option>
                                                        <option>Pria</option>
                                                        <option>Wanita</option>
                                                    </Input>
                                                </FormGroup>


                                                <FormGroup>
                                                    <Label>Upload Your Photo</Label>
                                                    <Input type="file" name="picture" id="picture" accepts="image/*"
                                                           placeholder="Input Picture of Product"
                                                           onChange={(e) => {
                                                               imagePreview(e)
                                                           }}
                                                    />
                                                    <div style={{display:"flex", justifyContent:"center", marginTop:"20px"}}>
                                                        <img src={img} style={{width:"100%"}}/></div>
                                                </FormGroup>

                                                <Button color="link" onClick={()=> {props.onChangeToggle(false)}}>Cancel</Button>
                                                <Button color="primary" onClick={() => {onSubmit()}}>Save</Button>

                                            </Form>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
            </CSSTransitionGroup>
        </Fragment>
    )
}

export default UbahDataMember