import React, {Fragment} from 'react';

import {
    UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,
    Nav
} from 'reactstrap';

import bg3 from '../../../assets/utils/images/dropdown-header/abstract3.jpg';

import {
    faAngleDown,

} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Link} from "react-router-dom";


class MegaMenu2 extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false,
            popoverOpen: false,
        };
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen,
            popoverOpen: !this.state.popoverOpen

        });
    }

    state = {};

    render() {
        return (
            <Fragment>
                <Nav className="header-megamenu">
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav>
                            <i className="nav-link-icon pe-7s-gift"> </i>
                            {(() => {
                                if (localStorage.getItem("roles") === null) {
                                    return (
                                        <Link to="/pages/login">Login</Link>
                                    )
                                } else if (localStorage.getItem("roles").includes("ROLE_ADMIN")){
                                    return (
                                        <Link to="/homeAdmin/Team" style={{textDecoration:"none"}}>Manage Team Member</Link>
                                    )
                                } else if (localStorage.getItem("roles").includes("ROLE_USER")) {
                                    return (
                                        <Link to="/pages/login" style={{textDecoration:"none"}}>Manage Team Member</Link>
                                    )
                                }
                            })()}
                        </DropdownToggle>
                    </UncontrolledDropdown>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav>
                            <i className="nav-link-icon pe-7s-gift"> </i>
                            {(() => {
                                if (localStorage.getItem("roles") === null) {
                                    return (
                                        <Link to="/pages/login">Login</Link>
                                    )
                                } else if (localStorage.getItem("roles").includes("ROLE_ADMIN")){
                                    return (
                                        <Link to="/homeAdmin/table" style={{textDecoration:"none"}}>Manage Product</Link>
                                    )
                                } else if (localStorage.getItem("roles").includes("ROLE_USER")) {
                                    return (
                                        <Link to="/pages/login" style={{textDecoration:"none"}}>Manage Product</Link>
                                    )
                                }
                            })()}
                            {/*<FontAwesomeIcon className="ml-2 opacity-5" icon={faAngleDown}/>*/}
                        </DropdownToggle>
                    </UncontrolledDropdown>
                    {/*<UncontrolledDropdown nav inNavbar>*/}
                    {/*    <DropdownToggle nav>*/}
                    {/*        <i className="nav-link-icon pe-7s-gift" style={{textDecoration:"none"}}> </i>*/}
                    {/*        Products*/}
                    {/*        <FontAwesomeIcon className="ml-2 opacity-5" icon={faAngleDown}/>*/}
                    {/*    </DropdownToggle>*/}
                    {/*    <DropdownMenu className="dropdown-menu-rounded dropdown-menu-lg rm-pointers">*/}
                    {/*        <div className="dropdown-menu-header">*/}
                    {/*            <div className="dropdown-menu-header-inner bg-success">*/}
                    {/*                <div className="menu-header-image opacity-2"*/}
                    {/*                     style={{*/}
                    {/*                         backgroundImage: 'url(' + bg3 + ')'*/}
                    {/*                     }}*/}
                    {/*                />*/}
                    {/*                <div className="menu-header-content text-left">*/}
                    {/*                    <h5 className="menu-header-title">Products Daily You</h5>*/}

                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*        <DropdownItem>*/}
                    {/*            <i className="dropdown-icon pe-7s-check"> </i>*/}
                    {/*            {(() => {*/}
                    {/*                if (localStorage.getItem("roles") === null) {*/}
                    {/*                    return (*/}
                    {/*                        <Link to="/pages/login">Make Up</Link>*/}
                    {/*                    )*/}
                    {/*                } else {*/}
                    {/*                    return (*/}
                    {/*                        <Link to="/product/make-up" style={{textDecoration:"none"}}>Make Up</Link>*/}
                    {/*                    )*/}
                    {/*                }*/}
                    {/*            })()}*/}
                    {/*        </DropdownItem>*/}
                    {/*        <DropdownItem>*/}
                    {/*            <i className="dropdown-icon pe-7s-check"> </i>*/}
                    {/*            {(() => {*/}
                    {/*                if (localStorage.getItem("roles") === null) {*/}
                    {/*                    return (*/}
                    {/*                        <Link to="/pages/login">Make Up</Link>*/}
                    {/*                    )*/}
                    {/*                } else {*/}
                    {/*                    return (*/}
                    {/*                        <Link to="/product/skin-care" style={{textDecoration:"none"}}>Skin Care</Link>*/}
                    {/*                    )*/}
                    {/*                }*/}
                    {/*            })()}*/}
                    {/*        </DropdownItem>*/}
                    {/*        <DropdownItem>*/}
                    {/*            <i className="dropdown-icon pe-7s-check"> </i>*/}
                    {/*            {(() => {*/}
                    {/*                if (localStorage.getItem("roles") === null) {*/}
                    {/*                    return (*/}
                    {/*                        <Link to="/pages/login">Make Up</Link>*/}
                    {/*                    )*/}
                    {/*                } else {*/}
                    {/*                    return (*/}
                    {/*                        <Link to="/product/body-care" style={{textDecoration:"none"}}>Body Care</Link>*/}
                    {/*                    )*/}
                    {/*                }*/}
                    {/*            })()}*/}
                    {/*        </DropdownItem>*/}

                    {/*    </DropdownMenu>*/}
                    {/*</UncontrolledDropdown>*/}
                    {/*<UncontrolledDropdown nav inNavbar>*/}
                    {/*    <DropdownToggle nav>*/}
                    {/*        <i className="nav-link-icon pe-7s-gift"> </i>*/}
                    {/*        <Link to="/activities" style={{textDecoration:"none"}}>Activities</Link>*/}
                    {/*        /!*<FontAwesomeIcon className="ml-2 opacity-5" icon={faAngleDown}/>*!/*/}
                    {/*    </DropdownToggle>*/}
                    {/*</UncontrolledDropdown>*/}
                </Nav>
            </Fragment>
        )
    }
}

export default MegaMenu2;
