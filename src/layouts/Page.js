import React from 'react';
import {Route, Switch} from 'react-router-dom';
import ProfilePage from '../pages/ProfilePage';
import FriendsPage from '../pages/FriendsPage';
import MessagesPage from '../pages/MessagesPage';
import SearchPage from '../pages/SearchPage';
import LoginPage from '../pages/LoginPage'
import UserDetailsPage from '../pages/UserDetailsPage';
import ConversationPage from '../pages/ConversationPage';

const Page = () => {
    return(
        <>
        <Switch>
            <Route path="/" exact component={ProfilePage} />
            <Route path="/friends" exact component={FriendsPage}/>
            <Route path="/messages" exact component={MessagesPage}/>
            <Route path="/search" exact component={SearchPage}/>
            <Route path="/login" exact component={LoginPage}/>
            <Route path="/user/:id" exact component={UserDetailsPage}/>
            <Route path="/messages/conversation/:id" exact component={ConversationPage} />
        </Switch>
        </>
    )
}

export default Page;