/* eslint-disable eqeqeq */
import React from 'react';
import { Redirect } from 'react-router';
import { ApiQueryService } from '../services/ApiQueryService';
import DictionaryItemDto from '../services/dto/DictionaryItemDto';
import DictionaryService from '../services/DictionaryService';
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
    _interestsLoaded =false;
    _eyesColorsLoaded = false;
    _hairColorsLoaded = false;
    _basicLoaded = false;
    _detailsLoaded = false;

    state={
        interests : new Array<DictionaryItemDto>(),
        eyesColors: new Array<DictionaryItemDto>(),
        hairColors: new Array<DictionaryItemDto>(),
        userFullDto: { basic:{}, details: {}},
        selectedInterests: new Array<number>()
    }

    componentWillUnmount(){
        this._isMounted=false;
    }

    componentDidMount(){
        this._isMounted=true;
        this.getLoggedUserData();
        this.getDictionariesValues();

    
    }

    getLoggedUserData = () =>{
        var loggedUserId = +this.usersService.GetIdentity();
        this.usersService.getUserBasic(loggedUserId).then(result=>{
            
            const basicDto = result as UserDto;
            
            const birthDate = new Date(basicDto.birthDate as string)
            this._basicLoaded = true;
            this.setState({
                userFullDto:{
                    ...this.state.userFullDto,
                    basic: basicDto,
                    birthDate
                }
            });
            
        })

        this.usersService.getUserDetais(loggedUserId).then(result=>{
            const detailsDto = result as UserDetailsDto;
            this._detailsLoaded = true;
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
            this._interestsLoaded=true;
            this.setState({
                interests: result
            })
            
        })
        this.dictionaryService.GetAllEyesColors().then(result=>{
            this._eyesColorsLoaded = true;
            this.setState({
                eyesColors: result
            })
            
        })
        this.dictionaryService.GetAllHairColors().then(result=>{
            this._hairColorsLoaded = true;
            this.setState({
                hairColors:result
            })
            
        })
    }

    
    service = new ApiQueryService();

    onDateFieldChange = (e) =>{
        if(this._isMounted){
         this.setState({
            userFullDto: {
                ...this.state.userFullDto,
                birthDate: e,
                basic:{
                    ...this.state.userFullDto.basic,
                    birthDate: new Date(e).toJSON()
                }
            }})}
    }

    onFieldChange = (e) => {
        
        const type=e.target.type;
        let name=e.target.name as string;


        if(type === "checkbox"){
            const checked = e.target.checked;
            if(this._isMounted)
            this.setState({
                userFullDto: {
                    ...this.state.userFullDto,

                [name]:checked
            }})
        }
        else {
            if(this._isMounted){
                const value = e.target.value;
                if(name.startsWith('basic_')){
                    name = name.substring(0,'basic_'.length)
                    this.setState({
                        userFullDto: {
                            ...this.state.userFullDto,
                            basic: {
                                ...this.state.userFullDto.basic,
                                [name]: value
                            }
                        }
                    })}
                
                else{
                    this.setState({
                        userFullDto: {
                            ...this.state.userFullDto,
                            details: {
                                ...this.state.userFullDto.details,
                                [name]: value
                            }
                        }
                    })
                    }
                }
            }
        }

    onDictionaryFieldChange = (e) =>{
        if(e.target.name === "eyesColor"){
            if(this._isMounted)
            this.setState({
                userFullDto: {
                    ...this.state.userFullDto,
                    details:{
                        ...this.state.userFullDto.details,
                        eyesColor: e.target.value
                    }

                }
            })
        }
        else if(e.target.name === "hairColor"){
            if(this._isMounted)
            this.setState({
                userFullDto: {
                    ...this.state.userFullDto,
                    details:{
                        ...this.state.userFullDto.details,
                        hairColor: e.target.value
                    }

                }
            })
        }
        else if(e.target.name === "gender"){
            if(this._isMounted)
            this.setState({
                userFullDto: {
                    ...this.state.userFullDto,
                    basic:{
                        ...this.state.userFullDto.basic,
                        gender: e.target.value
                    }

                }
            })
        }
    
        else{
            let selectedItems = (this.state.userFullDto.details as UserDetailsDto).interests ?? [];
            
            if(e.target.checked && !selectedItems?.find(x=> x == e.target.name) ){
                selectedItems.push(e.target.name*1);
            }
    
            if(!e.target.checked && selectedItems?.find(x=> x == e.target.name) ){
                selectedItems=selectedItems.filter(x=> x != e.target.name);
                }

            if(this._isMounted)
            this.setState({
                userFullDto: {
                    ...this.state.userFullDto,
                    details:{
                        ...this.state.userFullDto.details,
                        interests:selectedItems
                    }
                }
            })
        }
       
    }

    onSave= () => {
        console.log(this.state);
    }

    render(){
    
        const apiKey = this.service.GetApiKey();
      
        if(apiKey === undefined || apiKey === null || apiKey===''){
            return <Redirect to='/login'/>
        }

        const {eyesColors, hairColors, interests, userFullDto} = this.state;

        if(this._basicLoaded && this._detailsLoaded && this._hairColorsLoaded && this._interestsLoaded && this._eyesColorsLoaded){
            return(
                
            <div className="finder" >
        
                <UserProfileComponent 
                userFullDto = {userFullDto}
                eyesColors={eyesColors}
                hairColors={hairColors}
                interests={interests}
                onFieldChange={this.onFieldChange}
                onDictionaryFieldChange={this.onDictionaryFieldChange}
                onDateFieldChange={this.onDateFieldChange}
                onSave={this.onSave}
                />
            
            </div>
            )
        }
        else{
            return(
                <p>Loading data</p>
            )
        }
    }
}

export default ProfilePage;