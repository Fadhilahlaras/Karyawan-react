import React, {useEffect, useState} from 'react';

import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";


const Delete = (props) => {

    const tampil = () =>{props.tampil()}

    useEffect(() => {
        tampil()
    }, [])

    return (
        <>
            <span className="d-inline-block mb-2 mr-2">
                 <Modal isOpen={props.modal} toggle={props.toggle}>
                        <ModalHeader toggle={props.toggle}>Konfirmasi</ModalHeader>
                        <ModalBody>
                            <div>
                                <h6>Apakah anda akan menghapus data ini ?</h6>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="link" onClick={() => {
                                props.onChangeToggle(false)
                            }}>Cancel</Button>
                            <Button color="primary" onClick={() => {
                                props.delete(props.data)
                                // console.log(props.data)
                            }}>Delete</Button>
                        </ModalFooter>
                    </Modal>
            </span>
        </>
    )
}

export default Delete;