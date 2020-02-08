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
  const response = fetch(endpoint, {
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
    })})
  .catch(err=>{
    console.log("error:"+err);
  })
  return response;
}

GetIdentity(apiKey: string){
  const endpoint = ApiQueryService.ApiEndpoint + this.identityEndpoint;
  return fetch(endpoint, {
    method: 'GET',
    headers: {'Content-Type':'application/json','Accept': 'application/json', 'Authorization':apiKey},
  }).then(result=>{
    return result.json().then(res=>{
      return res as Number;
    })
  })

}

}