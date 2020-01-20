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
    headers: {'Content-Type':'application/json','Accept': 'application/json'},
    body: JSON.stringify(dto)
  }).then(response=>{
    if(response.status !== 200){
      console.log("not logged");
      throw Error;
    }
    return response.json().then(resp=>{
      const key = resp;
      return key;
      // set key to local storage as identity
    })})
  .catch(err=>{
    console.log("error:"+err);
  })
  return response;
}

GetIdentity(apiKey: string){
  const endpoint = ApiQueryService.ApiEndpoint + this.identityEndpoint;
}

}