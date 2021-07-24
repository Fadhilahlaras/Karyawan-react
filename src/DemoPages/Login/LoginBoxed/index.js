import React, { Fragment, useState } from "react";
import { Col, Row, Button, Form, FormGroup, Input } from "reactstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import { SERVICE } from "../../../config/config.json";
import { useHistory } from "react-router-dom";
const MySwal = withReactContent(Swal);

const LoginBoxed = ({ match }) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const validation = () => {
    const auth = {
      username: username,
      password: password,
    };

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }


    console.log(auth.username);
    console.log(auth.password);

    axios.post("http://localhost:1717/auth/token", auth, config)
        .then(res=> {
          localStorage.setItem("access_token", res.data.data.access_token)
          localStorage.setItem("username", username)
          // localStorage.setItem("auth", true);
          // localStorage.setItem("role", "app_user");
          // this.props.history.push("/dashAdmin");
          window.location.href = "/";

        })
      .catch((error) => {
        MySwal.fire({
          icon: "error",
          title: "username or password false",
          showConfirmButton: false,
          timer: 2500,
        });
      });

    setUsername("");
    setPassword("");
  };

  return (
    <Fragment>
      <div className="h-100 bg-heavy-rain bg-animation">
        <div className="d-flex h-100 justify-content-center align-items-center">
          <Col md="8" className="mx-auto app-login-box">
            <div className="app-logo-inverse mx-auto mb-3" />

            <div className="modal-dialog w-100 mx-auto">
              <div className="modal-content">
                <div className="modal-body">
                  <div className="h5 modal-title text-center">
                    <h4 className="mt-2">
                      <div>Welcome back,</div>
                      <span>Please sign in to your account below.</span>
                    </h4>
                  </div>
                  <Form>
                    <Row form>
                      <Col md={12}>
                        <FormGroup>
                          <Input
                            type="username"
                            name="username"
                            id="exampleUsername"
                            placeholder="Username here..."
                            value={username}
                            onChange={(event) => {
                              setUsername(event.target.value);
                            }}
                            required
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
                            required
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                  <div className="divider" />
                  <h6 className="mb-0">
                    No account?{" "}
                    <a
                      onClick={(e) => history.push('/register')}
                      className="text-primary"
                    >
                      Sign up now
                    </a>
                  </h6>
                </div>
                <div className="modal-footer clearfix">
                  <div className="float-right">
                    <Button color="primary" size="lg" onClick={validation}>
                      Login
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="text-center text-white opacity-8 mt-3">
                        Copyright &copy; ArchitectUI 2019
                    </div> */}
          </Col>
        </div>
      </div>
    </Fragment>
  );
};

export default LoginBoxed;
