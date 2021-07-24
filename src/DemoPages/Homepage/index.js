import React, {Fragment} from "react";

import {Route} from "react-router-dom";
import Dashboard from "./Dashboard";
import AddNewMember from "./Dashboard/tambah";
import UbahDataMember from "./Dashboard/ubah";

const Homepage = ({match}) => (

    <Fragment>
        <div className="app-main">

            <div className="app-main__inner">
                <>
                    <Route path={`${match.url}/karyawanindex`} component={Dashboard}/>
                    <Route path={`${match.url}/karyawanadd`} component={AddNewMember} />
                    <Route path={`${match.url}/karyawanedit`} component={UbahDataMember} />
                </>
            </div>
        </div>
    </Fragment>
);

export default Homepage;
