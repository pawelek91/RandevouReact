import { ApiQueryService } from "./ApiQueryService";
import DictionaryItemDto from "./dto/DictionaryItemDto";

class DictionaryService{

    InterestsEnd = ApiQueryService.ApiEndpoint + '/api/UserDictItems/Interest';
    HairColorsEnd = ApiQueryService.ApiEndpoint + '/api/UserDictItems/HairColors';
    EyesColorsEnd = ApiQueryService.ApiEndpoint + '/api/UserDictItems/EyesColors';

    GetDictionaryItems(endpoint:string){
        let apiKey = localStorage.getItem('apiKey');
        if(apiKey === null)
            apiKey ='';

        const header = new Headers();
        header.append('Content-Type','application/json');
        header.append('Authorization',apiKey);
        return  fetch(endpoint, {
            method:'GET',
            headers: header
        })
        .then(response =>{
            return response.json()
        })
        .then(resp=>{
            return resp as DictionaryItemDto[];
        })
    }
    GetAllInterest = () => {
        return this.GetDictionaryItems(this.InterestsEnd);
    }

    GetAllEyesColors = () => {
        return this.GetDictionaryItems(this.EyesColorsEnd);
    }

    GetAllHairColors = () =>{
        return this.GetDictionaryItems(this.HairColorsEnd);
    }
}

export default DictionaryService;