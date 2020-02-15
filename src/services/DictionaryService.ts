import { ApiQueryService } from "./ApiQueryService";
import DictionaryItemDto from "./dto/DictionaryItemDto";

class DictionaryService extends ApiQueryService{

    InterestsEnd = ApiQueryService.ApiEndpoint + '/api/UserDictItems/Interest';
    HairColorsEnd = ApiQueryService.ApiEndpoint + '/api/UserDictItems/HairColors';
    EyesColorsEnd = ApiQueryService.ApiEndpoint + '/api/UserDictItems/EyesColors';

    GetDictionaryItems(endpoint:string):Promise<DictionaryItemDto[]>{
        return this.get<DictionaryItemDto[]>(endpoint);
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