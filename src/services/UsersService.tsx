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
    return this.postSpecific<UserDto[]>(this.getManyUsersEnd, ids);
    }

    getUserDetais(id:number){
        return this.get<UserDetailsDto>(this.BuildAddress(this.getUserDetailsEnd,id)); 
    }

    getUserBasic(id:number):Promise<UserDto> {
        return this.get<UserDto>(this.BuildAddress(this.getUserEnd,id)); 
    }
         
    patchtUserBasic(userDto: UserDto){
        this.patch(this.BuildAddress(this.patchUserEnd), userDto);
    }

    patchUserDetails(dto:UserDetailsDto){
        this.patch(this.BuildAddress(this.putUserDetailsEnd,+this.GetIdentity()), dto);
    }
}