import React from 'react';
import { Redirect } from 'react-router';
import { ApiQueryService } from '../services/ApiQueryService';
import DictionaryItemDto from '../services/dto/DictionaryItemDto';
import DictionaryService from '../services/DictionaryService';
import FieldBasicFieldsComponent from '../components/FinderBasicFieldsComponent';
import { UserDto, UserFullDto, UserDetailsDto } from '../services/dto/UsersDto';
import { UsersService } from '../services/UsersService';
import UserProfileComponent from '../components/UserProfileComponent';


interface IProfilePageProps{

}

interface IProfilePageState{
 userFullDto: UserFullDto;
 interests : Array<DictionaryItemDto>
 eyesColors: Array<DictionaryItemDto>
 hairColors: Array<DictionaryItemDto>
}

class ProfilePage extends React.Component<IProfilePageProps, IProfilePageState>{

    usersService = new UsersService();
    dictionaryService = new DictionaryService();

    _isMounted = false;

    state={
        interests : new Array<DictionaryItemDto>(),
        eyesColors: new Array<DictionaryItemDto>(),
        hairColors: new Array<DictionaryItemDto>(),
        userFullDto: { basic:{}, details: {}}
    }

    componentWillUnmount(){
        this._isMounted=false;
    }

    componentDidMount(){
        this._isMounted=true;
        this.getLoggedUserData();
    }

    getLoggedUserData = () =>{
        var loggedUserId = +this.usersService.GetIdentity();
        this.usersService.getUserBasic(loggedUserId).then(result=>{
            const basicDto = result as UserDto;
            this.setState({
                userFullDto:{
                    ...this.state.userFullDto,
                    basic: basicDto
                }
            });
        })

        this.usersService.getUserDetais(loggedUserId).then(result=>{
            const detailsDto = result as UserDetailsDto;
            this.setState({
                userFullDto:{
                    ...this.state.userFullDto,
                    details: detailsDto
                }
            })
        })
    }

    getDictionariesValues = () =>{
        this.dictionaryService.GetAllInterest().then(result=>{
            this.setState({
                interests: result
            })
        })
        this.dictionaryService.GetAllEyesColors().then(result=>{
            this.setState({
                eyesColors: result
            })
        })
        this.dictionaryService.GetAllHairColors().then(result=>{
            this.setState({
                hairColors:result
            })
        })
    }

    
    service = new ApiQueryService();

    onFieldChange = (e) => {
        const value = e.target.value;
        const checked = e.target.checked;
        const name=e.target.name;
        const type=e.target.type;
        if(type === "checkbox"){
            if(this._isMounted)
            this.setState({
                queryDto: {
                    ...this.state.queryDto,
                [name]:checked
            }})
        }
        else {
            if(this._isMounted)
            this.setState({
                
                queryDto: {
                    ...this.state.queryDto,
                    [name]:value
                }
                
            })
        }
    }

    onDictionaryFieldChange = (e) =>{
        if(e.target.name === "eyesColor"){
            if(this._isMounted)
            this.setState({
                queryDto: {
                    ...this.state.queryDto,
                    eyescolor: e.target.value,
            }})
        }
        else if(e.target.name === "hairColor"){
            if(this._isMounted)
            this.setState({
                queryDto: {
                    ...this.state.queryDto,
                    haircolor: e.target.value,
            }})
        }
    
        else{
            let selectedItems = this.state.queryDto.interestids ?? [];
            
            if(e.target.checked && !selectedItems?.find(x=> x == e.target.name) ){
                selectedItems.push(e.target.name*1);
    
            }
    
            if(!e.target.checked && selectedItems?.find(x=> x == e.target.name) ){
                selectedItems=selectedItems.filter(x=> x != e.target.name);
                }
            if(this._isMounted)
            this.setState({
                queryDto:{
                ...this.state.queryDto,
                interestids: selectedItems,
            }})
        }
       
    }

    render(){
         
        const finderStyle={
            display: 'inline-grid',
            width:'35%',
            margin:'10px',
     
        }
    
     
    
        const apiKey = this.service.GetApiKey();
      
        if(apiKey === undefined || apiKey === null || apiKey===''){
            return <Redirect to='/login'/>
        }
    
        return(
            
        <div className="finder" >
    
              <UserProfileComponent userBasicDto={query} 
              userDetailsDto={}
              eyesColors={}
              hairColors={}
              interests={}
               onFieldChange={this.onFieldChange} />
          
        </div>
        )
    }
}

export default ProfilePage;