import React, {Fragment} from 'react';
import cx from 'classnames';

import {connect} from 'react-redux';

import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import HeaderLogo from '../AppLogo';

import SearchBox from './Components/SearchBox';
import MegaMenu2 from './Components/MegaMenu2';
import UserBox from './Components/UserBox';

import HeaderDots from "./Components/HeaderDots";

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    // const username = localStorage.getItem("username")
    //
    // const logout = (e) => {
    //     localStorage.clear()
    // }

    render() {
        let {
            headerBackgroundColor,
            enableMobileMenuSmall,
            enableHeaderShadow
        } = this.props;
        return (
            <Fragment>
                <CSSTransitionGroup
                    component="div"
                    className={cx("app-header", headerBackgroundColor, {'header-shadow': enableHeaderShadow})}
                    transitionName="HeaderAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={1500}
                    transitionEnter={false}
                    transitionLeave={false}>

                    <HeaderLogo/>


                    <div className={cx(
                        "app-header__content",
                        {'header-mobile-open': enableMobileMenuSmall},
                    )}>


                        {/*<div className="app-header-left">*/}
                        {/*    <MegaMenu/>*/}
                        {/*</div>*/}

                        <div className="app-header-right">
                            <MegaMenu2/>

                            <HeaderDots/>
                            <UserBox/>
                        </div>
                    </div>
                </CSSTransitionGroup>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    enableHeaderShadow: state.ThemeOptions.enableHeaderShadow,
    closedSmallerSidebar: state.ThemeOptions.closedSmallerSidebar,
    headerBackgroundColor: state.ThemeOptions.headerBackgroundColor,
    enableMobileMenuSmall: state.ThemeOptions.enableMobileMenuSmall,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Header);