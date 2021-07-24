import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';

// USER PAGES

import Login from './Login/';
import Register from './Register/';
import Profile from './UserProfile/index';
import Profile2 from './UserProfile/index2';

const UserPages = ({match}) => (
    <Fragment>
        <div className="app-container">

            {/* User Pages */}

            <Route path={`${match.url}/login`} component={Login}/>
            <Route path={`${match.url}/register`} component={Register}/>
            <Route path={`${match.url}/profileUser`} component={Profile}/>
            <Route path={`${match.url}/profileAdmin`} component={Profile2}/>
        </div>
    </Fragment>
);

export default UserPages;