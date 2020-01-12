import {RegisterDto, ApiAuthDto} from './dto/ApiAuthDto';
import {ApiQueryService} from './ApiQueryService';

class AuthenticationService{
    
  loginEndpotint = '/api/Login/Login';
  registerEndpoint = '/api/login/Register';
  identityEndpoint = '/api/login/Identity';



RegisterUser(dto: RegisterDto){
  const endpoint = ApiQueryService.ApiEndpoint + this.registerEndpoint;
}

LoginUser(dto: ApiAuthDto){
  const endpoint = ApiQueryService.ApiEndpoint + this.loginEndpotint;
}

GetIdentity(apiKey: string){
  const endpoint = ApiQueryService.ApiEndpoint + this.identityEndpoint;
}

}