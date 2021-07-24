import React, {Fragment} from "react";

import {Route} from "react-router-dom";
import DashboardAdm from "./DashboardAdm";

import AppHeader2 from "../../Layout/AppHeader/index3";
import NewTable from "../Product/Tabel/NewTable";
import Team from "../../DemoPages/AboutUs/Team/Table";


const Homepage = ({ match }) => (

    <Fragment>
        <AppHeader2/>

        <div className="app-main">

            <div className="app-main__inner">


                <>
                        {/*Dashboard Admin*/}
                        <Route path={`${match.url}/dashboardAdm`} component={DashboardAdm} />
                        {/*ManagedProduct*/}
                        <Route path={`${match.url}/table`} component={NewTable}/>
                        {/*Managed Team*/}
                        <Route path={`${match.url}/team`} component={Team}/>
                    </>

            </div>
        </div>
    </Fragment>
);

export default Homepage;
