import React, {Fragment} from 'react';

// import Ionicon from 'react-ionicons';

import { IoIosCalendar } from "react-icons/io";

import PerfectScrollbar from 'react-perfect-scrollbar';

import {
    DropdownToggle, Button, DropdownItem, UncontrolledDropdown, DropdownMenu
} from 'reactstrap';

import {Link} from "react-router-dom";
import {faAngleDown} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class UserBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            username: localStorage.getItem("username")

        };
    }

    logout() {
        localStorage.clear();
        console.log("Keluar")
    }


    render() {

        return (
            <Fragment>
                <div className="header-btn-lg pr-0">
                    <div className="widget-content p-0">
                        <div className="widget-content-wrapper">
                            <div className="widget-content-left">
                                {(() => {
                                    if (localStorage.getItem("roles") === null) {
                                        return (
                                            <Link to="/pages/login" style={{textDecoration: "none"}}>
                                                <Button className="mb-2 mr-2 btn-icon btn-pill" outline color="primary">
                                                    <i className="pe-7s-add-user btn-icon-wrapper"> </i>
                                                    Login
                                                </Button>
                                            </Link>
                                        )
                                    } else if (localStorage.getItem("roles").includes("ROLE_ADMIN")){
                                        return (
                                            <UncontrolledDropdown>
                                                <DropdownToggle>
                                                    Welcome, {this.state.username}
                                                    <FontAwesomeIcon className="ml-2 opacity-5" icon={faAngleDown}/>
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    <Link to="/pages/profileAdmin">
                                                        <DropdownItem style={{textAlign: 'center'}}>View Profile</DropdownItem>
                                                    </Link>
                                                    <Link to="/home/dashboard">
                                                        <DropdownItem type="submit" style={{textAlign: 'center'}} onClick={this.logout}>Logout</DropdownItem>
                                                    </Link>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        )
                                    } else if (localStorage.getItem("roles").includes("ROLE_USER")){
                                        return (
                                            <UncontrolledDropdown>
                                                <DropdownToggle>
                                                    Welcome, {this.state.username}
                                                    <FontAwesomeIcon className="ml-2 opacity-5" icon={faAngleDown}/>
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    <Link to="/pages/profileUser">
                                                        <DropdownItem style={{textAlign: 'center'}}>View Profile</DropdownItem>
                                                    </Link>
                                                    <Link to="/home/dashboard">
                                                        <DropdownItem type="submit" style={{textAlign: 'center'}} onClick={this.logout}>Logout</DropdownItem>
                                                    </Link>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        )
                                    }
                                })()}
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default UserBox;