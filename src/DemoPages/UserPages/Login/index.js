import React, {Fragment, Component, useState, useEffect} from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";

import axios from "axios";

import Swal from "sweetalert2";

import Slider from "react-slick";

import decode from "jwt-decode";
import withReactContent from "sweetalert2-react-content";

import {
    Col,
    Row,
    Form,
    FormGroup,
    Label
} from 'reactstrap';

import {Link} from "react-router-dom";

import AppHeader from "../../../Layout/AppHeader";

import pro1 from "../../../assets/utils/images/prodemy/prodemy4_1.jpg";
import pro2 from "../../../assets/utils/images/prodemy/prodemy4_7.jpg";
import pro3 from "../../../assets/utils/images/prodemy/prodemy4_12.jpg";


const MySwal = withReactContent(Swal);

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username:"",
            password: "",
            error: null,
            users: null,
            errmessage:"",
            isAlert: false
        };

    }




    handleOnchange = e => this.setState({ [e.target.name]: e.target.value });

    handleSignUp = event => {
        event.preventDefault()

        this.setState({
            isAlert:false
        })

        const { username, password, users } = this.state;

        const param = new URLSearchParams()
        param.append("username", username)
        param.append("password", password)

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        console.log(param)

        axios.post("http://localhost:1717/auth/token",param, config)
            .then(res=> {
                localStorage.setItem("access_token", res.data.data.access_token)

                const userData = decode(res.data.data.access_token)
                localStorage.setItem("username", userData.preferred_username)
                localStorage.setItem("email", userData.email)
                localStorage.setItem("roles", userData.resource_access["dailyyou-client"].roles[0])

                MySwal.fire({
                    icon: "success",
                    title: "Congrats You Can Access This Page",
                    showConfirmButton: false,
                    timer: 1500,
                });

                {(() => {
                    if (localStorage.getItem("roles").includes("ROLE_ADMIN")){
                        this.props.history.push("/homeAdmin/dashboardAdm");
                    } else {
                        this.props.history.push("/home/dashboard");
                    }
                })()}

            })
            .catch(err=>{
                MySwal.fire({
                    icon: "error",
                    title: "Username or Password False",
                    showConfirmButton: false,
                    timer: 2500,
                });
            })
    };

    handleClear() {
        localStorage.clear()
    }

    render() {
        let settings = {
            dots: true,
            infinite: true,
            speed: 500,
            arrows: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: true,
            initialSlide: 0,
            autoplay: true,
            adaptiveHeight: true

        };

        const { username, password} = this.state;

        return (
            <Fragment>
                <CSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <AppHeader/>
                    <div className="h-100">
                        <Row className="h-100 no-gutters">

                            <Col lg="8" md="12" className="h-100 d-flex bg-white justify-content-center align-items-center">
                                <Col lg="9" md="10" sm="12" className="mx-auto app-login-box">

                                    <h4 className="mb-0">
                                        <div>Welcome back,</div>
                                        <span>Please sign in to your account.</span>
                                    </h4>

                                    <Row className="divider"/>
                                    <div>
                                        <Form onSubmit={this.handleSignUp}>
                                            <Row form>
                                                <Col md={6}>

                                                    <FormGroup>
                                                        <Label for="name">Username</Label>
                                                        <input
                                                            type="text"
                                                            id="username"
                                                            className="form-control"
                                                            placeholder="Username"
                                                            name="username"
                                                            onChange={this.handleOnchange}
                                                            value={username}
                                                        />
                                                    </FormGroup>

                                                    <FormGroup>
                                                        <Label for="examplePassword">Password</Label>
                                                        <input
                                                            id="password"
                                                            type="password"
                                                            className="form-control"
                                                            placeholder="password"
                                                            name="password"
                                                            autoComplete=''
                                                            onChange={this.handleOnchange}
                                                            value={password}
                                                        />
                                                    </FormGroup>


                                                </Col>
                                            </Row>


                                            <Row className="divider"/>
                                            <h6 className="mt-3">
                                                No account?{' '}

                                                {/*<a href="/login" onClick={(e)=>e.preventDefault()} className="text-primary">Sign up now</a>*/}
                                                {/*<Link to={"/login"} />*/}

                                                <Link to="/pages/register" style={{textDecoration:"none"}}>Sign Up Here</Link>

                                            </h6>



                                            <div className="text-center">
                                                <button className="btn btn-primary btn-block">Sign In</button>
                                            </div>

                                        </Form>

                                    </div>
                                </Col>
                            </Col>
                            <Col lg="4" className="d-none d-lg-block">
                                <div className="slider-light">
                                    <Slider  {...settings}>
                                        <div className="h-100 d-flex justify-content-center align-items-center bg-plum-plate">
                                            <div className="slide-img-bg"
                                                 style={{
                                                     backgroundImage: 'url(' + pro1 + ')'
                                                 }}/>
                                            <div className="slider-content">
                                                <h3>Perfect Bright</h3>
                                                <p>
                                                    Daily You is like a dream. This product can help you to brighten your face and clean your face optimally from dust, dirt, and remaining makeup.
                                                </p>
                                            </div>
                                        </div>

                                        <div
                                            className="h-100 d-flex justify-content-center align-items-center bg-premium-dark">
                                            <div className="slide-img-bg"
                                                 style={{
                                                     backgroundImage: 'url(' + pro2 + ')'
                                                 }}/>
                                            <div className="slider-content">
                                                <h3>Nature Daily</h3>
                                                <p>
                                                    Contains natural Aloe vera which provides extra moisture with a soothing effect and cools dry and reddened skin due to the sun.
                                                </p>
                                            </div>
                                        </div>
                                        <div
                                            className="h-100 d-flex justify-content-center align-items-center bg-sunny-morning">
                                            <div className="slide-img-bg opacity-6"
                                                 style={{
                                                     backgroundImage: 'url(' + pro3 + ')'
                                                 }}/>
                                            <div className="slider-content">
                                                <h3>C Defense</h3>
                                                <p>
                                                    Free radicals can damage the skin. Starting from making it dry, dull, accelerate aging to acne. For that you need anti-oxidant skincare that can win free radicals so that your skin is healthy and glowing.
                                                </p>
                                            </div>
                                        </div>
                                    </Slider>
                                </div>

                            </Col>
                        </Row>
                    </div>
                </CSSTransitionGroup>
            </Fragment>
        );
    }
}

export default Login;
