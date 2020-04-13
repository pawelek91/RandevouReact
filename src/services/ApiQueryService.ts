import store from '../stores/configureStore'

export class ApiQueryService{
    static ApiEndpoint  = 'http://localhost:7777';
    
    GetIdentity(): string {
      return store.getState().loginInfo.identity;
      }

      BuildAddress(address: string, id?: number): string {
        if (id == null && id === undefined) {
          return address;
        }
    
        address = address.replace('{id}', id.toString());
        return address;
      }

      GetApiKey() {
        return store.getState().loginInfo.apiKey;
      }
    

      patch(endpoint: string, dto){
        let apiKey = this.GetApiKey();
        if(apiKey === null)
            apiKey ='';
        
        console.log(endpoint);
        const header = new Headers();
        header.append('Content-Type','application/json');
        header.append('Authorization',apiKey);

        return fetch(endpoint, {
            method:'PATCH',
            headers:header,
            body: JSON.stringify(dto)
        }).then(result=>{
            if(!result.ok){
                Error(result.statusText);
            }
        }).catch(err=> Error (err));
      }

      get<T>(endpoint:string): Promise<T>{
        let apiKey = this.GetApiKey();
        if(apiKey === null)
            apiKey ='';
        
        const header = new Headers();
        header.append('Content-Type','application/json');
        header.append('Authorization',apiKey);
        return fetch(endpoint, {
            method:'Get',
            headers: header,
        }).then(res=>{
            if(!res.ok || res.status === 204){
                
                throw Error('Nie udało się pobrać użyszkodnika');
            }
            return res.json().then(result=> {
                return result as Promise<T>;
            })
        }).catch(err=>{
             throw Error(err)
        })
      }

      postSpecific<TResult>(endpoint:string, body:any): Promise<TResult>{
        let apiKey = this.GetApiKey();
        if(apiKey === null)
            apiKey ='';

        const header = new Headers();
        header.append('Content-Type','application/json');
        header.append('Authorization',apiKey);
        return fetch(endpoint, {
            method:'Post',
            headers: header,
            body: JSON.stringify(body)
        }).then(result=>{
            return result.json().then(result=>{
                return result as TResult;
              }
        )})
      }

      post(endpoint:string, body:any):Promise<Response>{
        let apiKey = this.GetApiKey();
        if(apiKey === null)
            apiKey ='';

        const header = new Headers();
        header.append('Content-Type','application/json');
        header.append('Authorization',apiKey);
        return fetch(endpoint, {
            method:'Post',
            headers: header,
            body: JSON.stringify(body)
        })
      }

      put(endpoint:string, body:any):Promise<Response>{
        let apiKey =  this.GetApiKey();
        if(apiKey === null)
            apiKey ='';

        const header = new Headers();
        header.append('Content-Type','application/json');
        header.append('Authorization',apiKey);
        
        return fetch(endpoint,{method:'Put',headers: header, body: JSON.stringify(body)}).then(res=>
            {
                if(!res.ok){
                    console.log("Nie udało się wysłać zaproszenia");
                    console.log(res.json());
                }
                return res;
            })
      }

}