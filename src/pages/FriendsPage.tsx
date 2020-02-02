import React from 'react';
import { Redirect } from 'react-router';
import FriendshipService from '../services/FriendshipService';
import { ApiQueryService } from '../services/ApiQueryService';

class FriendsPage extends React.Component{
state={
    friends:[]
}

friendsService = new FriendshipService();
componentDidMount(){
    this.friendsService.GetFriendsList().then(result=>{
        console.log(result);
    })
}
render(){
    const apiKey = this.friendsService.GetApiKey();
  
    if(apiKey === undefined || apiKey === null || apiKey===''){
        return <Redirect to='/login'/>
    }
    
    return(
    <div className="Friends">
         
    </div>
    )
}

}

export default FriendsPage;