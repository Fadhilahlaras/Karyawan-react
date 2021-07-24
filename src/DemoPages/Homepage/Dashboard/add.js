import React, {useState, useEffect} from 'react';
import axios from "axios";
import Select from "react-select";
import {Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

const AddMember = (props) => {
    const [nama, setNama] = useState(null)
    const [tanggalLahir, setTanggalLahir] = useState(null)
    const [selectOptions, setSelectOptions] = useState([]);
    const [idJabatan, setIdJabatan] = useState(null)
    const [nip, setNip] = useState(null)
    const [jenisKelamin, setJenisKelamin] = useState(null)
    const [picture, setPicture] = useState();
    const [img, setImg] = useState()

    const onSubmit = (e) => {
        {/*Create a new object FromData*/}
        const formData = new FormData();

        {/*A method to converts a JavaScript object or value to a JSON string*/}
        const json = JSON.stringify({
            "nama": nama,
            "tanggalLahir":  tanggalLahir,
            "idJabatan": idJabatan,
            "nip": nip,
            "jenisKelamin": jenisKelamin,
        });


        {/*Sebuah object yang berisi hasil convert JS ke JSON*/}
        const blobDoc = new Blob([json], {
            type: 'application/json'
        });

        formData.append('data', blobDoc)

        const config = {
            headers: {
                'content-type': 'multipart/mixed'
            }
        }

        axios.post("http://localhost:1717/team/save", formData, config)
            .then(props.tampil).catch()

        props.onChangeToggle(false)
        props.tampil();
        setImg("")
    }

    const imagePreview = (e)=>{
        const url=URL.createObjectURL(e.target.files[0]);
        setImg(url);
        setPicture(e.target.files[0])
    }

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
    }, [])


    return (
        <>
            <span className="d-inline-block mb-2 mr-2">
                 <Modal isOpen={props.modal} toggle={props.toggle}>
                        <ModalHeader toggle={props.toggle}>Add New Member</ModalHeader>
                        <ModalBody>
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

                                        </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="link" onClick={()=> {props.onChangeToggle(false)}}>Cancel</Button>
                            <Button color="primary" onClick={() => {onSubmit()}}>Save</Button>
                        </ModalFooter>
                    </Modal>
            </span>
        </>
    )
}

export default AddMember;