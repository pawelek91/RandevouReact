import * as React from 'react';
import { ConversationsComponent } from '../components/ConversationsComponent';
import { MessagesService } from '../services/MessagesService';
import { MessageDto } from '../services/dto/MessagesDto';
import { UsersService } from '../services/UsersService';
import {UserDto} from '../services/dto/UsersDto';
import {Link} from 'react-router-dom';
export class ConversationPage extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            userId: props.match.params.id,
            conversation: new Array<MessageDto>(),
            speaker: {}
        }
    }

    state={
        userId:0,
        conversation: new Array<MessageDto>(),
        speaker: {}
    }

    componentDidMount(){
        this.service.GetConversation(this.state.userId).then(result=>{
            this.setState({
                conversation:result
            })
        })
        this.userService.getUserBasic(this.state.userId).then(result=>{
            this.setState({
                speaker: result
            })
        })
    }
    service = new MessagesService();
    userService = new UsersService();
    render(){
        
        let speaker = this.state.speaker as UserDto;
        let linkToUser = `/user/${speaker.id}`;
        let messages = this.state.conversation.map(message=>{
            return(
                <div>
                    <strong> {message.senderName}</strong> | {message.sendDate}  <br/>
                    {message.content}
                </div>
            )
        });

        return(
            <div>
                <h3>
                conversation with <Link to={linkToUser}> {speaker.displayName}</Link>
                </h3>
                {messages}
            </div>
        )
    }
}

export default ConversationPage