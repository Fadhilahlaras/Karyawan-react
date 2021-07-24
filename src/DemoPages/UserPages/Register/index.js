import React, {Fragment, useState} from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import axios from "axios";
import Swal from "sweetalert2";

import {Link, useHistory} from "react-router-dom";
import withReactContent from "sweetalert2-react-content";

import AppHeader from "../../../Layout/AppHeader";

import {
    Button,
    Col,
    Container,
    Form,
    FormGroup, Input,
    Label,
    Row
} from "reactstrap";


const MySwal = withReactContent(Swal);

const Register = () => {

    const history = useHistory();

    const [username, setUsername] = useState("");
    const [noHp, setNoHp] = useState("")
    const [alamat, setAlamat] = useState("")
    const [ktp, setKtp] = useState("")
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [repassword, setRepassword] = useState("");

    const validation = async () => {
        const variables={
            username,noHp, alamat, ktp,email,password
        }

        if (!username.length || !noHp.length || !alamat.length || !ktp.length || !email.length || !password.length || !repassword.length){
            console.log("Harus diisi")
            await MySwal.fire({
                icon: "error",
                title: "Please Fill All The Data",
                showConfirmButton: false,
                timer: 1500,
            });
        } else if (password.length < 8) {
            console.log("password kurang ")
            await MySwal.fire({
                icon: "error",
                title: "Password Should Contain At Least 8 Charecters",
                showConfirmButton: false,
                timer: 1500,
            });
        } else if(password === repassword) {
            axios.post("http://localhost:1717/register/create", variables)
                .then((response) => {
                    console.log("Sukses isi data")
                    if (response.status === 200) {
                        MySwal.fire({
                            icon: "success",
                            title: "Success Create Account",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        setUsername("");
                        setNoHp("");
                        setAlamat("");
                        setKtp("");
                        setPassword("");
                        setRepassword("")
                        setEmail("")
                        history.push('/pages/login')
                    } else {
                        console.log("Status Error")
                        MySwal.fire({
                            icon: "warning",
                            title: "Can't Create Account",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    }

                })
        } else {
            console.log("error")
            await MySwal.fire({
                icon: "error",
                title: "Username or Password is False",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

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

                    <div className="app-main">
                        <div className="app-main__inner">
                            <Container fluid>
                                <Row>
                                    <Col md="12" className="h-100 d-flex bg-white justify-content-center align-items-center">
                                        <Col lg="9" md="10" sm="12" className="mx-auto app-login-box">
                                            {/*<div className="app-logo"/>*/}
                                            <h4 className="mb-0">
                                                <div>Register</div>
                                                <span>Please sign up to create your account.</span>
                                            </h4>

                                            <Row className="divider"/>
                                            <div>
                                                <Form>
                                                    <Row form>
                                                        <Col lg={12}>

                                                            <FormGroup>
                                                                <Label for="ktp">NIK</Label>
                                                                <input
                                                                    id="ktp"
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="NIK"
                                                                    name="ktp"
                                                                    value={ktp}
                                                                    onChange={(event) => {
                                                                        setKtp(event.target.value);
                                                                    }}
                                                                />
                                                            </FormGroup>

                                                            <FormGroup>
                                                                <Label for="username">Username</Label>
                                                                <input
                                                                    id="username"
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Username"
                                                                    name="username"
                                                                    value={username}
                                                                    onChange={(event) => {
                                                                        setUsername(event.target.value);
                                                                    }}
                                                                />
                                                            </FormGroup>

                                                            <FormGroup>
                                                                <Label for="alamat">Address</Label>
                                                                <input
                                                                    id="alamat"
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Address"
                                                                    name="alamat"
                                                                    value={alamat}
                                                                    onChange={(event) => {
                                                                        setAlamat(event.target.value);
                                                                    }}
                                                                />
                                                            </FormGroup>

                                                            <FormGroup>
                                                                <Label for="noHp">Phone Number</Label>
                                                                <input
                                                                    id="noHp"
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Number Phone"
                                                                    name="noHp"
                                                                    value={noHp}
                                                                    onChange={(event) => {
                                                                        setNoHp(event.target.value);
                                                                    }}
                                                                />
                                                            </FormGroup>


                                                            <FormGroup>
                                                                <Label for="email">Email</Label>
                                                                <input
                                                                    id="email"
                                                                    type="email"
                                                                    className="form-control"
                                                                    placeholder="Email"
                                                                    name="email"
                                                                    value={email}
                                                                    onChange={(event) => {
                                                                        setEmail(event.target.value);
                                                                    }}
                                                                />
                                                            </FormGroup>

                                                            <FormGroup>
                                                                <Label for="examplePassword">Password</Label>
                                                                <input
                                                                    id="password"
                                                                    type="password"
                                                                    className="form-control"
                                                                    placeholder="Password"
                                                                    name="password"
                                                                    autoComplete=''
                                                                    value={password}
                                                                    onChange={(event) => {
                                                                        setPassword(event.target.value);
                                                                    }}
                                                                />
                                                            </FormGroup>

                                                            <FormGroup>
                                                                <Input
                                                                    type="password"
                                                                    name="passwordrep"
                                                                    id="examplePasswordRep"
                                                                    placeholder="Repeat Password here..."
                                                                    value={repassword}
                                                                    onChange={(event) => {
                                                                        setRepassword(event.target.value);
                                                                    }}
                                                                />
                                                            </FormGroup>


                                                        </Col>
                                                    </Row>
                                                    {/*<FormGroup check>*/}
                                                    {/*    <Input type="checkbox" name="check" id="exampleCheck"/>*/}
                                                    {/*    <Label for="exampleCheck" check>Keep me logged in</Label>*/}
                                                    {/*</FormGroup>*/}

                                                    <Row className="divider"/>
                                                    {/*<h6 className="mt-3">*/}
                                                    {/*    No account?{' '}*/}

                                                    {/*    /!*<a href="/login" onClick={(e)=>e.preventDefault()} className="text-primary">Sign up now</a>*!/*/}
                                                    {/*    /!*<Link to={"/login"} />*!/*/}

                                                    {/*    <Link to="/register" style={{textDecoration:"none"}}>Sign Up Here</Link>*/}

                                                    {/*</h6>*/}
                                                    {/*<div className="d-flex align-items-center">*/}
                                                    {/*    <div className="ml-auto">*/}
                                                    {/*        /!*<a href="https://colorlib.com/" onClick={(e)=>e.preventDefault()} className="btn-lg btn btn-link">Recover*!/*/}
                                                    {/*        /!*    Password</a>{' '}{' '}*!/*/}
                                                    {/*        /!*<Button color="primary" size="lg">Login</Button>*!/*/}

                                                    {/*        <Link to="/home" style={{textDecoration: "none"}}>*/}
                                                    {/*            <Button className="mb-2 mr-2 btn-icon btn-pill" color="primary" size="lg">Login</Button>*/}
                                                    {/*        </Link>*/}




                                                    {/*    </div>*/}
                                                    {/*</div>*/}

                                                    {/*<div className="text-center">*/}
                                                    {/*    <button disabled={loading} className="btn btn-primary btn-block" >Sign Up</button>*/}
                                                    {/*</div>*/}

                                                    <div className="text-center">
                                                        <Button
                                                            color="primary"
                                                            className="btn-wide btn-pill btn-shadow btn-hover-shine"
                                                            size="lg"
                                                            onClick={()=>validation()}
                                                        >
                                                            Create Account
                                                        </Button>
                                                    </div>
                                                </Form>
                                                {/*{error && <p className="text-danger mt-3 mb-2 text-center">{error}</p>}*/}

                                                <h6 className="mt-3">
                                                    Have an account?{' '}

                                                    <Link to="/pages/login" style={{textDecoration:"none"}}>Sign In Here</Link>

                                                </h6>
                                            </div>
                                        </Col>
                                    </Col>

                                </Row>
                            </Container>
                        </div>
                    </div>
                </CSSTransitionGroup>
            </Fragment>);
}

export default Register