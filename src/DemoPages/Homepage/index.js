import React, {Fragment} from "react";

import {Route} from "react-router-dom";
import Dashboard from "./Dashboard";

import AppHeader from "../../Layout/AppHeader/index";


const Homepage = ({match}) => (

    <Fragment>
        <AppHeader/>

        <div className="app-main">

            <div className="app-main__inner">
                <>
                    <Route path={`${match.url}/dashboard`} component={Dashboard}/>
                </>
            </div>
        </div>
    </Fragment>
);

export default Homepage;
