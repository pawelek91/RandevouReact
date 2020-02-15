import { ApiQueryService } from './ApiQueryService';
import SearchQueryDto from './dto/SearchQueryDto';
import { UsersService } from './UsersService';
import { UserDto } from './dto/UsersDto';

export class SearchUsersService extends ApiQueryService{
    postUserFindEnd  =  ApiQueryService.ApiEndpoint + '/api/UserFinder';

    searchUsers(dto: SearchQueryDto):Promise<UserDto[]>{
        return this.postSpecific<Array<Number>>(this.postUserFindEnd, dto)
        .then(result=>{
            return new UsersService().getManyUsers(result);
        })
    }
}