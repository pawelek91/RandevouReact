import {ApiQueryService} from "./ApiQueryService";

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

        GetFriendshipStatus(user1Id: number, user2Id: number) {
            let endpoint = this.BuildAddress(this.GetFriendshipStatusNend, user1Id);
            endpoint += user2Id;
             
            let apiKey =  this.GetApiKey();
            if(apiKey === null)
                apiKey ='';
    
            const header = new Headers();
            header.append('Content-Type','application/json');
            header.append('Authorization',apiKey);
            return fetch(endpoint,{method:'Get',headers: header})
            .then(result=> {
                return result.json().then(res=>{
                    return res as string;
                })
            })
          }

        AreFriends(user1Id:number, user2Id:number){
            return this.GetFriendshipStatus(user1Id,user2Id).then(result=>{
                return result.toLowerCase() === 'none';
            })
        }
      }
    