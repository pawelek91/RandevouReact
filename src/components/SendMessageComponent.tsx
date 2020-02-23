import * as React from 'react';
import { MessagesService } from '../services/MessagesService';

interface ISendMessageComponent{
    userId: number
}
export class SendMessageComponent extends React.Component<ISendMessageComponent>{

        state={
            message:''
        }

        service = new MessagesService();

        sendMessage = () =>{
            this.service.SendMessage(this.props.userId, this.state.message);
            this.setState({
                message:'',
            })
        }

        contentChanged= (e) =>{
            this.setState({
                message:e.target.value
            })
        }

        render(){
            const textareaStyle= {
                width: "400px",
                height: "50px",
            }
            return(
                <div>
                    <textarea style={textareaStyle}  onChange={this.contentChanged} value={this.state.message} />
                    <br/>
                    <button onClick={this.sendMessage}>Wyślij</button>
                </div>
            )
        }
}