import { Component } from "react";
import { UserDto } from "../services/dto/UsersDto";
import { UserComponent } from "./UserComponent";
import * as React from 'react';
import { UserFriendshipActionComponent } from "./UserFriendshipActionComponent";
interface IFriendComponent{
    user: UserDto
}
export class FriendComponent extends Component<IFriendComponent>{
    state = {
        friendshipStatus: 'friends'
    }

    removeFriend = (userId) =>{
        console.log(userId);
    }

    addToFriends = (userId) =>{
        console.log(userId);
    }

    
    render(){
        // const {friendshipStatus}=this.state;    
        // const userId = this.props.user.id;
        // let friendButton;
        // switch(friendshipStatus.toLocaleLowerCase())
        // {
        //     case 'friends':
        //         friendButton = <button key={userId}  onClick={()=>this.removeFriend(userId)}>Remove from friends</button>;
        //         break;
        //     case 'invited':
        //         friendButton = <button  key={userId} onClick={()=>this.addToFriends(userId)}>Add to friends</button>;
        //         break;
        // }
        return (
            <>
            
        <UserComponent user={this.props.user} />
        <UserFriendshipActionComponent userId={this.props.user.id ?? 0} />
        </>
        )
    }
}