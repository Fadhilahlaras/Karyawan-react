import React, {useEffect, useState} from "react";
import {
    Alert,
    Button, Card, CardFooter,
    CardHeader, CustomInput, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Input,
    ListGroup,
    ListGroupItem,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Table
} from "reactstrap";
import {IoIosCart} from "react-icons/io";
import CartList from "./CartList";
import axios from "axios";
import {Link} from "react-router-dom";


const CartModal = (props) => {
    const [cartList, setCartList] = useState([])
    const [checkedState, setCheckedState] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [disabledButton, setDisabledButton] = useState(false)


    const getAllCartData = () => {
        axios.get('http://localhost:1717/api/cart').then(res => {
            console.log(res.data)
            setCartList(res.data)
            setCheckedState([])
            total(res.data)
        }).catch(err => {
            console.log(err)
        })
    }

    const total = (val) => {
        let price = 0
        let qty = 0
        val.map((data) => {
            price = price + data.subTotalPrice
            qty = qty + data.productQuantity
            console.log("sub total")
        })
        console.log("cart edited >>")
        console.log(price)
        console.log(qty)
        setTotalPrice(price);
        // setTotalQuantity(qty)

    }

    useEffect(() => {
        getAllCartData()
    }, [])

    const saveCart = () => {
        const dataCart = {"addToCart": []}
        cartList.map((data, index) => {
            dataCart.addToCart.push(
                {
                    "id": data.id,
                    "idProduct": data.idProduct,
                    "productQuantity": data.productQuantity,
                    "idUser": data.idUser
                })
        })

        axios.post('http://localhost:1717/api/cart', dataCart)
            .then(
                getAllCartData
            )
            .catch(err => {
                console.log('pesan error >>', err)
            })

        console.log("save cart > > ", cartList)
        console.log("checked id > > ", dataCart)
        setCheckedState([])
        props.toggle(false)


    }

    const cartEdited = (value) => {
        setCartList(value)
        total(value)
    }

    const Checked = (e, id) => {
        if (e.target.checked) {
            if ([...checkedState].indexOf(id) === -1) {
                let checked = [...checkedState, id]
                setCheckedState(checked)
            }
        } else {
            let unchecked = [...checkedState]
            let index = unchecked.indexOf(id)
            if (index !== -1) {
                unchecked.splice(index, 1)
                setCheckedState(unchecked)
            }
        }

    }
    useEffect(() => {
        if (checkedState.length === 0) {
            setDisabledButton(true)
        } else {
            setDisabledButton(false)
        }

    })

    const deleteCart = () => {

        console.log("checked to delete >> ", checkedState)
        checkedState.map((id) => {
            axios.delete('http://localhost:1717/api/cart/' + id).then(
                getAllCartData
            ).catch()
        })
        total(cartList)

        props.toggle(false)
    }

    const toggle = () => {
        props.toggle()
        setCheckedState([])
        getAllCartData()
    }

    const checkOut = () => {
        let cartId = []
        checkedState.map((data) => {
            cartId.push({"id": data})
        })
        let toCheckout = {"idCartDtoList": cartId}
        // axios.post('http://localhost:1212/api/c/checkout', toCheckout).then().catch()
        console.log(toCheckout)
        props.toggle()
    }


    return (
        <>
            <span className="d-inline-block mb-2 mr-2">
                 <Modal isOpen={props.modal} onOpened={getAllCartData} toggle={props.toggle} className="modal-content" backdrop={false}>
                        <ModalHeader toggle={() => {
                            toggle()
                        }}><IoIosCart size={18}/> My Cart</ModalHeader>
                        <ModalBody>
                            <ListGroup className="todo-list-wrapper" flush>
                                {cartList.map((data, index) => (
                                    <CartList key={index}
                                              index={index}
                                              data={data}
                                              cartEdit={cartEdited}
                                              dataArray={cartList}
                                              checked={(e) => {
                                                  Checked(e, data.id)
                                              }}
                                    />
                                ))}
                                <ListGroupItem>
                                        <div className="todo-indicator bg-success"/>
                                            <div className="widget-content p-0">
                                                <div className="widget-content-wrapper">
                                                    <div className="widget-content-left mr-2">
                                                        </div>
                                                    <div className="widget-content-left flex2">
                                                    <div className="widget-heading">
                                                        Total : Rp {totalPrice} ,-
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                </ListGroupItem>
                            </ListGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" onClick={() => {
                                deleteCart()
                            }} disabled={disabledButton}>Delete</Button>
                             {/*<Link to="/checkout" style={{textDecoration: "none"}}>*/}
                            <Button color="success" onClick={() => {
                                saveCart()
                            }}>Save</Button>
                             {/*</Link>*/}
                            <Button color="light" onClick={() => {
                                toggle()
                            }}>Cancel</Button>
                            <Button color="primary" onClick={() => {
                                checkOut()
                            }} disabled={disabledButton}>CheckOut!</Button>
                        </ModalFooter>
                    </Modal>
            </span>
        </>
    )
}

export default CartModal;