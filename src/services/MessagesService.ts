import { ApiQueryService } from "./ApiQueryService";
import { LastMessageDto, MessageDto, MessageBasicDto, RequestMessagesDto } from "./dto/MessagesDto";

export class MessagesService extends ApiQueryService{
    MessagesEndp = ApiQueryService.ApiEndpoint + '/api/Messages';
    ConversationsEndp = this.MessagesEndp + '/Conversation/{id}';
    SpeakersEndp = this.MessagesEndp + '/{id}/Speakers';
    WholeConversationEndp = this.MessagesEndp + '/Conversation';
    MessageMarkReadEndp = this.MessagesEndp + '/MarkRead';
    MessageMarkUnreadEndp = this.MessagesEndp + '/MarkUnread';

    
  GetLastMessages(): Promise<Array<LastMessageDto>> {
     const userId = +this.GetIdentity();
    const endpoint = this.BuildAddress(this.ConversationsEndp, userId);
    return this.get<Array<LastMessageDto>>(endpoint);
  }

  GetConversation(speakerId: number): Promise<Array<MessageDto>> {
      
    const dto :  RequestMessagesDto = {firstUserId: +this.GetIdentity(), secondUserId: +speakerId};
    const endpoint = this.BuildAddress(this.WholeConversationEndp, dto.firstUserId);
    return this.postSpecific<Array<MessageDto>>(endpoint, dto);
  }

  SendMessage(receiverId:number, content:string) {
    const dto :  MessageBasicDto = {receiverId: receiverId, content: content, senderId: +this.GetIdentity()};
    console.log(dto);
    const endpoint = this.BuildAddress(this.MessagesEndp);
    return this.post(endpoint, dto);
  }
}