import React from 'react';
import { Redirect } from 'react-router';
import { MessagesService } from '../services/MessagesService';
import { LastMessageDto } from '../services/dto/MessagesDto';
import { ConversationsComponent } from '../components/ConversationsComponent';

class MessagesPage extends React.Component{

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
    this.getLastMessage();
    this.lastMessagesIntervalId = setInterval(this.getLastMessage, 3000);
}

componentWillUnmount= () => {
    clearInterval(this.lastMessagesIntervalId);
}

render(){
    
    const apiKey = this.service.GetApiKey();
  
    if(apiKey === undefined || apiKey === null || apiKey===''){
        return <Redirect to='/login'/>
    }

    return(
    <div className="Messages">
        <ConversationsComponent conversations={this.state.conversations} />
    </div>
    )
}

}

export default MessagesPage;