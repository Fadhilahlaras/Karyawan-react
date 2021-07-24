import React, {Fragment} from 'react'
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import AppHeader from "../../../Layout/AppHeader";



class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            username: localStorage.getItem("username"),
            email: localStorage.getItem("email")
        };
    }

    render() {
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
                        <div className="container">
                            <h1 className="text-center mt-4">User Profile Information</h1>
                            <div className="modal-dialog w-100 mx-auto">
                                <div className="modal-content">
                                    <div className="modal-body">
                                        <div className="h5 modal-title text-justify">
                                            <h5> Username : {this.state.username} </h5>
                                            <h5> Email : {this.state.email} </h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CSSTransitionGroup>
            </Fragment>
        )
    }
}

export default UserProfile;