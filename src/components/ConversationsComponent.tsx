import * as React from 'react';
import { LastMessageDto } from '../services/dto/MessagesDto';
import {Link} from 'react-router-dom';
interface IConversationsComponent{
    conversations: LastMessageDto[]
}
export class ConversationsComponent extends React.Component<IConversationsComponent>{


    render(){
        let convs = this.props.conversations.map(x=>{
            const linkToConversation = `/messages/conversation/${x.speakerId}`;
            return (
                <div key={x.speakerId}>
                {x.messageDate} | <strong> {x.speakerName}</strong> <br/>
                {x.messageShortContent} 
                <hr/>
                <Link to={linkToConversation}>Przejdź</Link>
                </div>
            )
        })


        return (
        <div>
            {convs}
        </div>
    )
    }
}