import React from 'react';
import {Route, Switch} from 'react-router-dom';
import ProfilePage from '../pages/ProfilePage';
import FriendsPage from '../pages/FriendsPage';
import MessagesPage from '../pages/MessagesPage';
import SearchPage from '../pages/SearchPage';

const Page = () => {
    return(
        <>
        <Switch>
            <Route path="/" exact component={ProfilePage} />
            <Route path="/friends" exact component={FriendsPage}/>
            <Route path="/messages" exact component={MessagesPage}/>
            <Route path="/search" exact component={SearchPage}/>
        </Switch>
        </>
    )
}

export default Page;