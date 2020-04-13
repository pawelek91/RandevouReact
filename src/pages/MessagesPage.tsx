import React from 'react';
import { Redirect } from 'react-router';
import { MessagesService } from '../services/MessagesService';
import { LastMessageDto } from '../services/dto/MessagesDto';
import { ConversationsComponent } from '../components/ConversationsComponent';
import {connect} from 'react-redux';

interface IMessagesPageProps{
    loginInfo:any
   }

   
class MessagesPage extends React.Component<IMessagesPageProps>{

state={
    conversations: new Array<LastMessageDto>(),
}

lastMessagesIntervalId;
service = new MessagesService();

getLastMessage = () =>{
    this.service.GetLastMessages().then(result=>{
        this.setState({
            conversations: result
        })
    })
}
componentDidMount(){
    if(this.props.loginInfo.loggedIn){
        this.getLastMessage();
        this.lastMessagesIntervalId = setInterval(this.getLastMessage, 3000);
    }
    
}

componentWillUnmount= () => {
    clearInterval(this.lastMessagesIntervalId);
}

render(){
    
  
    if(!this.props.loginInfo.loggedIn){
        return <Redirect to='/login'/>
    }

    return(
    <div className="Messages">
        <ConversationsComponent conversations={this.state.conversations} />
    </div>
    )
}

}

export default connect((state,props)=>{
    return{
        loginInfo:state.loginInfo
    }
})(MessagesPage)