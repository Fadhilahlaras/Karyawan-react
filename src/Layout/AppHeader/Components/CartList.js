import React, {useEffect, useState} from 'react';
import {Button, CustomInput, Input, ListGroupItem} from "reactstrap";


const CartList = (props) => {
    const [quantity, setQuantity] = useState(null)
    const [subTotal, setSubTotal] = useState(null)

    const quantityChange = (value) => {
        setQuantity(Number(value))
        setSubTotal(props.data.price * value)
        let newData = [...props.dataArray];
        newData[props.index].productQuantity = quantity;
        newData[props.index].subTotalPrice = quantity * props.data.price
        props.cartEdit(newData)

    }

    useEffect(() => {
        setSubTotal(props.data.price * props.data.productQuantity)
        },[])

    return (
        <>
            <ListGroupItem>
                <div className="todo-indicator bg-success"/>
                <div className="widget-content p-0">
                    <div className="widget-content-wrapper">
                        <div className="widget-content-left mr-2">
                            <CustomInput type="checkbox" id={props.data.id} onChange={props.checked}
                                         label="&nbsp;"/>
                        </div>
                        <div className="widget-content-left flex2">
                            <div className="widget-heading">
                                {props.data.productName}
                            </div>
                            <div className="widget-subheading">
                                Subtotal : Rp {subTotal} ,-
                            </div>
                        </div>
                        <div className="widget-content-right">
                            <h6>

                            </h6>
                        </div>
                        <div className="widget-content-right">
                            {/*<div className="badge badge-warning mr-2">69</div>*/}
                            <Input type="number" min={1} value={quantity == null ? props.data.productQuantity : quantity} onChange={(e) => {
                                quantityChange(e.target.value)
                            }} onClick={(e) => {
                                quantityChange(e.target.value)
                            }} width={30}/>
                        </div>
                    </div>
                </div>
            </ListGroupItem>
        </>
    )
}
export default CartList;