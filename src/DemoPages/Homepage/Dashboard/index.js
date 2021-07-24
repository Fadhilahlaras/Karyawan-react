import React, {Fragment, useEffect, useState} from "react";
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
// import AppHeader from "../../../Layout/AppHeader"
import {Row, CardBody} from "reactstrap";
import Carousel from "../Carousel/index";
import bg1 from "../../../assets/utils/images/originals/city.jpg";
import axios from "axios";
import Kartu from "../../Product/Kartu"

const Dashboard = () => {
    console.log("udah ada")
    const [dataCard, setDataCard] = useState([])
    let imageArrayPath = [];

    useEffect(() => {
        axios.get("http://localhost:1717/api/product").then(res => {
            setDataCard(res.data)

            console.log(res.data)
        })
    }, [])

    return(
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
                        <Row>
                            {/*<Col md="12">*/}
                            {/*<Card className="main-card mb-5">*/}
                            <CardBody>
                                <div
                                    className="p-5 bg-plum-plate">
                                    <div className="slide-img-bg"
                                         style={{
                                             fade: true,
                                             backgroundImage: 'url(' + bg1 + ')'
                                         }}/>
                                    <div className="slider-content" style={{
                                        color: "white"
                                    }}>
                                        <h3>Daily You</h3>
                                        <p>
                                            Daily You is like a dream. Some think it's too good to be true! .
                                        </p>
                                    </div>
                                </div>
                            </CardBody>
                            {/*</Col>*/}
                        </Row>
                        <Row>
                            <CardBody>
                                <Carousel/>
                            </CardBody>
                        </Row>

                        <Row>
                            <h3 style={{margin: "auto", marginBottom:"20px"}}> All Products </h3>
                        </Row>
                        <Row>
                            {dataCard.map((card, index) => (
                                <Kartu key={index} id={card.id} title={card.productName}
                                       category={card.categoryName}
                                       stock={card.stock} price={card.price}
                                       image={imageArrayPath[index]}/>
                            ))}

                        </Row>
                        {/*</Card>*/}
                    </div>

                </div>
            </CSSTransitionGroup>
        </Fragment>
    )
}
export default Dashboard;
