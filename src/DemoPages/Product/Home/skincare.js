import React, {Fragment, useEffect, useState} from "react";
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import AppHeader from "../../../Layout/AppHeader/index";
import {Col, Row} from "reactstrap";
import ThisCard from "../Kartu";
import axios from "axios";
import Image from "../../Components/GuidedTours/Examples/Image";
import bg1 from "../../../assets/utils/images/originals/city.jpg";

const SkinCare = () => {
    console.log("udah ada")
    const [dataCard, setDataCard] = useState([])
    // const [images, setimages] = useState([])
    // let imageArrayPath = [];

    useEffect(() => {
        axios.get("http://localhost:1717/api/product/category/2").then(res => {
            setDataCard(res.data)

        })
    }, [])

    // useEffect(() => {
    //     dataCard.map((data, index) => {
    //         axios.get('http://localhost:1717/api/product/getImage/' + data.id).then(res => {
    //             setimages(res.data)
    //             // console.log(res.data)
    //             console.log("udah ada")
    //         })
    //     })
    // })

    // function showImage() {
    //     return images.map((img, index) => (
    //         <Image
    //             image={img.urls.regular}
    //             index={index}
    //             key={index}/>
    //     ))
    // };

    {/*async function getGambar() {*/}
    {/*    dataCard.map((data, index) => {*/}
    {/*        axios({*/}
    {/*            url: 'http://localhost:1717/api/product/getImage/' + data.id,*/}
    {/*            method: 'GET',*/}
    {/*            responseType: 'blob', // important*/}
    //         }).then((response) => {
    //             const url = window.URL.createObjectURL(new Blob([response.data]));
    //             const link = document.createElement('img');
    //             console.log(url);
    //             console.log("ini link" + link);
    //             link.src = url;
    //             // link.setAttribute('download', 'file.pdf');
    //             return link.src
    //         });
    //     })
    // }


    return (
        <Fragment>
            <CSSTransitionGroup
                component="div"
                transitionName="TabsAnimation"
                transitionAppear={true}
                transitionAppearTimeout={0}
                transitionEnter={false}
                transitionLeave={false}>

                <Row>
                    <Col md="12">

                        <div
                            className="p-5 bg-plum-plate">
                            <div className="slide-img-bg"
                                 style={{
                                     fade: true,
                                     backgroundImage: 'url(' + bg1 + ')',
                                     color: "white", textAlign: "center"
                                 }}/>
                            <div className="slider-content" style={{
                                color: "white", textAlign: "center"
                            }}>
                                <h3>Skin Care</h3>
                            </div>
                        </div>

                    </Col>

                </Row>
                <Row>
                    {dataCard.map((card, index) => (
                        <ThisCard key={index} id={card.id} title={card.productName} category={card.categoryName}
                                  stock={card.stock} price={card.price}/>
                    ))}
                </Row>
            </CSSTransitionGroup>
        </Fragment>
    )
}


export default SkinCare;