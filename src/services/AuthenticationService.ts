import {RegisterDto, ApiAuthDto} from './dto/ApiAuthDto';
import {ApiQueryService} from './ApiQueryService';

export default class AuthenticationService{
    
  loginEndpotint = '/api/Login/Login';
  registerEndpoint = '/api/login/Register';
  identityEndpoint = '/api/login/Identity';



RegisterUser(dto: RegisterDto){
  const endpoint = ApiQueryService.ApiEndpoint + this.registerEndpoint;
}

LoginUser(dto: ApiAuthDto){
  const endpoint = ApiQueryService.ApiEndpoint + this.loginEndpotint;
  const response = fetch('http://localhost:7777/api/Login/Login', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(dto)
  }).then(response=>{
    console.log(response);
  }).catch(err=>{
    console.log(err);
  })
}

GetIdentity(apiKey: string){
  const endpoint = ApiQueryService.ApiEndpoint + this.identityEndpoint;
}

}