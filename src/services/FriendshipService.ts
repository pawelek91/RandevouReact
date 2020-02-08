import {ApiQueryService} from "./ApiQueryService";
import { FriendhsipSendRequestDto, UpdateFriendshipStatusDto } from "./dto/FriendshipRequestDto";

export default class FriendshipService extends ApiQueryService{

    FriendshipQueryEndpoint =  ApiQueryService.ApiEndpoint + '/api/UserFriendship';
    GetFriendsListEnd = this.FriendshipQueryEndpoint + '/users/{id}/friends';
    GetFriendshipisRequestsEnd = this.FriendshipQueryEndpoint + '/users/{id}/requests';
    GetPossibleActionEnd = this.FriendshipQueryEndpoint + '/PossibleRequestsActions';
    SendInvitationEnd = this.FriendshipQueryEndpoint + '/Invitation';
    SetFriendshipStatusEnd = this.FriendshipQueryEndpoint + '/FriendshipStatusAction';
    GetFriendshipStatusNend = this.FriendshipQueryEndpoint + '/users/{id}/RelationStatus/';

    GetFriendsList() {
        let identity = this.GetIdentity();
        const endpoint = this.BuildAddress(this.GetFriendsListEnd, +identity);
        
        let apiKey =  this.GetApiKey();
        if(apiKey === null)
            apiKey ='';

        const header = new Headers();
        header.append('Content-Type','application/json');
        header.append('Authorization',apiKey);
        return fetch(endpoint,{method:'Get',headers: header})
        .then(result=> {
            return result.json().then(res=>{
                return res as Number[];
            })
        })
        
        }

        GetFriendshipsRequestsList(){
            const identity = this.GetIdentity();
            const endpoint =  this.BuildAddress(this.GetFriendshipisRequestsEnd, +identity);
            
            let apiKey =  this.GetApiKey();
            if(apiKey === null)
                apiKey ='';
    
            const header = new Headers();
            header.append('Content-Type','application/json');
            header.append('Authorization',apiKey);
            
            return fetch(endpoint,{method:'Get',headers: header})
            .then(result=> {
                return result.json().then(res=>{
                    return res as Number[];
                })
            })
        }

        SendInvitation(userId:number){
            let apiKey =  this.GetApiKey();
            if(apiKey === null)
                apiKey ='';

            const loggedUserId = +this.GetIdentity();
            const endpoint = this.SendInvitationEnd;
            const dto :  FriendhsipSendRequestDto = { fromUserId :loggedUserId,toUserId: userId };

            const header = new Headers();
            header.append('Content-Type','application/json');
            header.append('Authorization',apiKey);
            
            return fetch(endpoint,{method:'Put',headers: header, body: JSON.stringify(dto)}).then(res=>
                {
                    if(!res.ok){
                        console.log("Nie udało się wysłać zaproszenia");
                        console.log(res.json());
                    }
                })
        }

        GetFriendshipStatus(user1Id: number, user2Id: number) {
            let endpoint = this.BuildAddress(this.GetFriendshipStatusNend, user1Id);
            endpoint += user2Id;
             
            let apiKey =  this.GetApiKey();
            if(apiKey === null)
                apiKey ='';
    
            const header = new Headers();
            header.append('Content-Type','application/json');
            header.append('Authorization',apiKey);
            header.append('Accept', 'application/json');
            return fetch(endpoint,{method:'Get',headers: header})
            .then(result=> {
                return result.json().then(res=>{
                    console.log(user1Id);
                    console.log(user2Id);
                    console.log(res);
                    return res as string;
                })
            })
          }

        AreFriends(user1Id:number, user2Id:number){
            return this.GetFriendshipStatus(user1Id,user2Id).then(result=>{
                return result.toLowerCase() === 'none';
            })
        }

        AcceptFriendship(userId:number){
            let apiKey =  this.GetApiKey();
            if(apiKey === null)
                apiKey ='';
    
            const loggedUserId = +this.GetIdentity();
            let endpoint = this.BuildAddress(this.SetFriendshipStatusEnd, loggedUserId);
            console.log(endpoint);
            const header = new Headers();
            header.append('Content-Type','application/json');
            header.append('Authorization',apiKey);
            const dto : UpdateFriendshipStatusDto = { toUserId:userId, fromUserId : loggedUserId, action: 'Accept' }
           

            return fetch(endpoint,{method:'Put',headers: header, body: JSON.stringify(dto)}).then(res=>
                {
                    if(!res.ok){
                        console.log("Nie udało się zaakceptować zaproszenia");
                        console.log(res.json());
                    }
                })

        }

        RemoveFriend(userId:number){
            let apiKey =  this.GetApiKey();
            if(apiKey === null)
                apiKey ='';
    
            const loggedUserId = +this.GetIdentity();
            let endpoint = this.BuildAddress(this.SetFriendshipStatusEnd, loggedUserId);

            const dto : UpdateFriendshipStatusDto = {fromUserId:loggedUserId, toUserId: userId, action: 'Delete'};
            const header = new Headers();
            header.append('Content-Type','application/json');
            header.append('Authorization',apiKey);
            return fetch(endpoint,{method:'Put',headers: header, body: JSON.stringify(dto)}).then(res=>
                {
                    if(!res.ok){
                        console.log("Nie udało się  usunąć znajomości");
                        console.log(res.json());
                    }
                })
        }
      }
    