import { ApiQueryService } from "./ApiQueryService";
import { UserDto, UserDetailsDto } from "./dto/UsersDto";

export class UsersService extends ApiQueryService{

  usersEnd = ApiQueryService.ApiEndpoint + '/api/Users';
  getAllUsersEnd = this.usersEnd;
  getManyUsersEnd = this.usersEnd + '/List';
  getUserEnd = this.usersEnd + '/{id}';
  patchUserEnd = this.usersEnd;
  deleteUserEnd = this.usersEnd + '/{id}';
  postUserEnd = this.usersEnd;

  getUserDetailsEnd = this.getUserEnd + '/Details';
  putUserDetailsEnd = this.patchUserEnd + '/{id}/Details';
  putAvatar = this.patchUserEnd + '/{id}/Details/avatar';
  putAvatarBase64 = this.putAvatar + '/base64';
  getUsersAvatars = this.getManyUsersEnd + '/Avatars/base64img';

  getManyUsers(ids:Array<Number>):Promise<UserDto[]>{
    let apiKey = localStorage.getItem('apiKey');
    if(apiKey === null)
        apiKey ='';
        
    const header = new Headers();
    header.append('Content-Type','application/json');
    header.append('Authorization',apiKey);
    return fetch(this.getManyUsersEnd, {
        method:'Post',
        headers: header,
        body: JSON.stringify(ids)
    }).then(result=>{
        return result.json().then(result=>{
            return result as UserDto[]
          }
    )})
    }

    getUserDetais(id:number){
        let apiKey = localStorage.getItem('apiKey');
        if(apiKey === null)
            apiKey ='';
        
        const endpoint = this.BuildAddress(this.getUserDetailsEnd,id);
        const header = new Headers();
        header.append('Content-Type','application/json');
        header.append('Authorization',apiKey);
        return fetch(endpoint, {
            method:'Get',
            headers: header,
        }).then(res=>{
            return res.json().then(result=> {
                return result as UserDetailsDto;
            })
        })

        
    }
}