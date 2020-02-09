import { ApiQueryService } from './ApiQueryService';
import SearchQueryDto from './dto/SearchQueryDto';
import { UsersService } from './UsersService';
import { UserDto } from './dto/UsersDto';

export class SearchUsersService extends ApiQueryService{
    postUserFindEnd  =  ApiQueryService.ApiEndpoint + '/api/UserFinder';

    searchUsers(dto: SearchQueryDto){
        let apiKey = this.GetApiKey();
        if(apiKey === null)
            apiKey ='';

        const header = new Headers();
        header.append('Content-Type','application/json');
        header.append('Authorization',apiKey);
        return fetch(this.postUserFindEnd, {
            method:'Post',
            headers: header,
            body: JSON.stringify(dto)
        }).then(result=>{
            return result.json()
        }).then(result=>{
            
            let ids = result as Array<Number>;
            if(ids === null || ids==undefined){
                throw Error;
            }

            if(ids.length >0){
                const usersService = new UsersService();
                return usersService.getManyUsers(ids);
            }
            
        }).catch(err=>{
            console.log(err);
            return undefined;
        })
    }
}