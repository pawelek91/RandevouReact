import * as React from 'react';
import { MessagesService } from '../services/MessagesService';
import { MessageDto } from '../services/dto/MessagesDto';
import { UsersService } from '../services/UsersService';
import {UserDto} from '../services/dto/UsersDto';
import {Link} from 'react-router-dom';
import {SendMessageComponent} from '../components/SendMessageComponent';
export class ConversationPage extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            userId: props.match.params.id,
            conversation: new Array<MessageDto>(),
            speaker: {}
        }
    }

    conversationIntervalId;

    state={
        userId:0,
        conversation: new Array<MessageDto>(),
        speaker: {}
    }

    getGonversation = () =>{
        this.service.GetConversation(this.state.userId).then(result=>{
            this.setState({
                conversation:result
            })
        })
    }

    componentDidMount(){
        this.getGonversation();
        this.conversationIntervalId = setInterval(this.getGonversation, 1000);

        this.userService.getUserBasic(this.state.userId).then(result=>{
            this.setState({
                speaker: result
            })
        })
    }

    componentWillUnmount(){
        clearInterval(this.conversationIntervalId);
    }

    service = new MessagesService();
    userService = new UsersService();
    render(){
        
        const messageStyle={
            color:"white",
            backgroundColor: "DodgerBlue",
            padding: "10px",
            fontFamily: "Arial",
            margin:"10px",
        };

        let speaker = this.state.speaker as UserDto;
        let linkToUser = `/user/${speaker.id}`;
        let messages = this.state.conversation.map(message=>{
            return(
                <div style={messageStyle} key={message.sendDate?.toString() ?? ''}>
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

                <SendMessageComponent userId={speaker.id ?? 0} />

                {messages}
            </div>
        )
    }
}

export default ConversationPage