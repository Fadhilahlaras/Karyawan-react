import React, { Fragment, useState } from "react";
import { Col, Row, Button, FormGroup,  Input } from "reactstrap";

// Layout
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import { useHistory } from "react-router-dom";

const MySwal = withReactContent(Swal);
const RegisterBoxed = ({ match }) => {
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
    if(password === repassword){
        axios.post("http://localhost:1717/register/create", variables)
      .then((response) => {
        if(response.status === 200){
        MySwal.fire({
            icon: "success",
            title: "Success Create Account",
            showConfirmButton: false,
            timer: 2500,
          });
          setUsername("");
          setNoHp("");
          setAlamat("");
          setKtp("");
          setPassword("");
          setRepassword("")
          setEmail("")
          history.push('/login')
        }else{
            MySwal.fire({
                icon: "warning",
                title: "Create Account Failed",
                showConfirmButton: false,
                timer: 2500,
              });
        }

      })
    }else{
        MySwal.fire({
          icon: "error",
          title: "username or password false",
          showConfirmButton: false,
          timer: 2500,
        });
    }
    
  };

  return (
    <Fragment>
      <div className="h-100 bg-premium-dark">
        <div className="d-flex h-100 justify-content-center align-items-center">
          <Col md="8" className="mx-auto app-login-box">
            <div className="app-logo-inverse mx-auto mb-3" />

            <div className="modal-dialog w-100">
              <div className="modal-content">
                <div className="modal-body">
                  <h5 className="modal-title">
                    <h4 className="mt-2">
                      <div>Welcome,</div>
                      <span>
                        It only takes a{" "}
                        <span className="text-success">few seconds</span> to
                        create your account
                      </span>
                    </h4>
                  </h5>
                  <Row className="divider" />
                  <Row form>
                      <Col md={12}>
                          <FormGroup>
                              <Input
                                  type="text"
                                  name="text"
                                  id="exampleKTP"
                                  placeholder="NIK here..."
                                  value={ktp}
                                  onChange={(event) => {
                                      setKtp(event.target.value);
                                  }}
                              />
                          </FormGroup>
                      </Col>
                      <Col md={12}>
                        <FormGroup>
                            <Input
                            type="text"
                            name="text"
                            id="exampleName"
                            placeholder="Name here..."
                            value={username}
                                onChange={(event) => {
                                setUsername(event.target.value);
                                }}
                            />
                        </FormGroup>
                      </Col>
                      <Col md={12}>
                          <FormGroup>
                              <Input
                                  type="text"
                                  name="text"
                                  id="exampleAlamat"
                                  placeholder="Address here..."
                                  value={alamat}
                                  onChange={(event) => {
                                      setAlamat(event.target.value);
                                  }}
                              />
                          </FormGroup>
                      </Col>
                      <Col md={12}>
                          <FormGroup>
                              <Input
                                  type="text"
                                  name="text"
                                  id="exampleNoHp"
                                  placeholder="Phone Number here..."
                                  value={noHp}
                                  onChange={(event) => {
                                      setNoHp(event.target.value);
                                  }}
                              />
                          </FormGroup>
                      </Col>
                      <Col md={12}>
                          <FormGroup>
                              <Input
                                  type="email"
                                  name="email"
                                  id="exampleEmail"
                                  placeholder="Email here..."
                                  value={email}
                                  onChange={(event) => {
                                      setEmail(event.target.value);
                                  }}
                              />
                          </FormGroup>
                      </Col>
                    <Col md={12}>
                      <FormGroup>
                        <Input
                          type="password"
                          name="password"
                          id="examplePassword"
                          placeholder="Password here..."
                          value={password}
                            onChange={(event) => {
                              setPassword(event.target.value);
                            }}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={12}>
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
                  <Row className="divider" />
                  <h6 className="mb-0">
                    Already have an account?{" "}
                    <a
                      onClick={(e) => history.push('/login')}
                      className="text-primary"
                    >
                      Sign in
                    </a>
                  </h6>
                </div>
                <div className="modal-footer d-block text-center">
                  <Button
                    color="primary"
                    className="btn-wide btn-pill btn-shadow btn-hover-shine"
                    size="lg"
                    onClick={()=>validation()}
                  >
                    Create Account
                  </Button>
                </div>
              </div>
            </div>
          </Col>
        </div>
      </div>
    </Fragment>
  );
};

export default RegisterBoxed;
