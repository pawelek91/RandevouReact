import React from 'react';
import { Redirect } from 'react-router';
import FriendshipService from '../services/FriendshipService';
import { ApiQueryService } from '../services/ApiQueryService';
import { UsersService } from '../services/UsersService';
import { FriendComponent } from '../components/FriendComponent';
import { UserDto } from '../services/dto/UsersDto';

class FriendsPage extends React.Component{
state={
    friends: new Array<UserDto>(),
    invitations:new Array<UserDto>(),
}

friendsService = new FriendshipService();
usersService = new UsersService();

componentDidMount(){
    this.getFriends();
    this.getInvitations();
}

getFriends = () => {
    this.friendsService.GetFriendsList().then(result=>{
        this.usersService.getManyUsers(result).then(result=>{
            this.setState({
                friends:result
            })
        })
    })
}

getInvitations = () =>{
    this.friendsService.GetFriendshipsRequestsList().then(result=>{
        this.usersService.getManyUsers(result).then(result=>{
            this.setState({
                invitations:result
            })
        })
    })
}
render(){
    const apiKey = this.friendsService.GetApiKey();
  
    if(apiKey === undefined || apiKey === null || apiKey===''){
        return <Redirect to='/login'/>
    }
    
    const userStyle={
        border: '1px solid gray',
        margin:'10px'
    }

    const friendsList = this.state.friends.map(x=>{
        return (
        <div key={x.id} style={userStyle}>
        <FriendComponent user={x}></FriendComponent>
        </div>)
    })

    const invitationsList = this.state.invitations.map(x=>{
        return (
            <div key={x.id} style={userStyle}>
            <FriendComponent user={x}></FriendComponent>
            </div>)
    })

  

    return(
    <div className="Friends">
        <h3>Friends</h3>
        {friendsList}
        <h3>Invitations to friends</h3>
        {invitationsList}
    </div>
    )
}

}

export default FriendsPage;