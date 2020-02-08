import React from "react";
import FriendshipService from "../services/FriendshipService";

interface IUserFriendshipAction{
    userId:number
}

export class UserFriendshipActionComponent extends React.Component<IUserFriendshipAction>{
    
    _isMounted = false;
    state={
        friendshipStatus:''
    }

    friendshipService = new FriendshipService();
    componentDidMount(){
        this._isMounted = true;

        const userId = +this.friendshipService.GetIdentity();
        this.friendshipService.GetFriendshipStatus(userId, this.props.userId).then(result=>{
            
            if(this._isMounted)
            this.setState({
                friendshipStatus:result
            })

        })
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    removeFriend = (userId:number) =>{
        this.friendshipService.RemoveFriend(userId);
    }

    addToFriends = (userId:number) =>{
        this.friendshipService.SendInvitation(userId);
    }

    acceptFriendship = (userId:number)=>{
        this.friendshipService.AcceptFriendship(userId);
    }

    getUserFriendshipsActions = () => {
        const {friendshipStatus}=this.state;    
        const userId = this.props.userId;
        let friendButton;
        switch(friendshipStatus.toLocaleLowerCase())
        {
            case 'friends':
                friendButton = (<button key={userId}  onClick={()=>this.removeFriend(userId)}>Remove from friends</button>);
                break;
            case 'invited':
                friendButton = (<>
                <button  key={userId} onClick={()=>this.acceptFriendship(userId)}>Accept</button>
                <button key={userId}  onClick={()=>this.removeFriend(userId)}>Remove from friends</button>
                </>);
                break;
            case 'created':
                friendButton=(<>
                 <p>Invitation to friends has been sent</p>
                 <button key={userId}  onClick={()=>this.removeFriend(userId)}>Remove from friends</button>
                 </>

                )
                break;
            case 'none':
            friendButton = <button  key={userId} onClick={()=>this.addToFriends(userId)}>Add to friends</button>;
            break;
        }

        return friendButton;
    }
    
    render(){

        if(this.props.userId === 0)
        return (<></>)

        const actionBtn = this.getUserFriendshipsActions();
        

        return (
            <>
            {actionBtn}
            </>
        )
    }

}