import React from 'react';
import { Redirect } from 'react-router';
import FriendshipService from '../services/FriendshipService';
import { UsersService } from '../services/UsersService';
import { FriendComponent } from '../components/FriendComponent';
import { UserDto } from '../services/dto/UsersDto';

class FriendsPage extends React.Component{
    _isMsounted:boolean = false;
state={
    friends: new Array<UserDto>(),
    invitations:new Array<UserDto>(),
}

friendsService = new FriendshipService();
usersService = new UsersService();

componentDidMount(){
    this._isMsounted = true;
    this.getFriends();
    this.getInvitations();
}

getFriends = () => {
    this.friendsService.GetFriendsList().then(result=>{
        this.usersService.getManyUsers(result).then(result=>{
            if(this._isMsounted)
            this.setState({
                friends:result
            })
        })
    })
}

getInvitations = () =>{
    this.friendsService.GetFriendshipsRequestsList().then(result=>{
        this.usersService.getManyUsers(result).then(result=>{
            if(this._isMsounted)
            this.setState({
                invitations:result
            })
        })
    })
}



componentWillUnmount(){
    this._isMsounted = false;
}

callBack(action:string){
    debugger;
    if(action === 'invitations'){
        this.getInvitations();
    }
    else if(action === 'friends'){
        this.getFriends();
    }
    else{
        this.getInvitations();
        this.getFriends();
    }
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
        <FriendComponent user={x} callBack={this.callBack.bind(this)}></FriendComponent>
        </div>)
    })

    const invitationsList = this.state.invitations.map(x=>{
        return (
            <div key={x.id} style={userStyle}>
            <FriendComponent user={x} callBack={this.callBack.bind(this)} />
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