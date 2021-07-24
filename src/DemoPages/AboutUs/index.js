import React, {Fragment} from "react";

import {Route} from "react-router-dom";

import AppHeader from "../../Layout/AppHeader";

import CompanyProfile from "./CompanyProfile";
import Team from "./Team";
import TableMember from "./Team/Table";

const About = ({ match }) => (

    <Fragment>
        <AppHeader/>

        <div className="app-main">

            <div className="app-main__inner">

                    <>
                        <Route path={`${match.url}/company`} component={CompanyProfile} />
                        <Route path={`${match.url}/team`} component={Team} />
                    </>

            </div>
        </div>
    </Fragment>
);

export default About;