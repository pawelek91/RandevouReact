import React, { Props } from 'react';
import { UsersService } from '../services/UsersService';
import {UserDetailsDto, UserDto, UserFullDto} from '../services/dto/UsersDto';
import {UserDetailsComponent} from '../components/UserDetailsComponent';
import { Redirect } from 'react-router';
export default class  UserDetailsPage extends React.Component{
    
    usersService = new UsersService();

    constructor(props) {
        super(props);
        this.state={
            userId: props.match.params.id,
            userDto: {},
            userDetailsDto: {}
        }
    }

    state={
        userId: 0,
        userDto:{},
        userDetailsDto: {}
    }

    componentDidMount(){
        const userId = this.state.userId;
  
    this.usersService.getUserDetais(userId).then(result=>{
        this.setState({
            userDetailsDto: result
        })
    });

    this.usersService.getUserBasic(userId).then(result=>{
        this.setState({
            userDto: result
        })        
    })
    }
    

    render(){
        const apiKey = this.usersService.GetApiKey();
  
        if(apiKey === undefined || apiKey === null || apiKey===''){
            return <Redirect to='/login'/>
        }
    
    
    const {userDto, userDetailsDto} = this.state
    if(userDto !== undefined && userDetailsDto !==undefined){

        const detailsDto = userDetailsDto as UserDetailsDto;
        const userBasicDto = userDto as UserDto;
        const userFullDto : UserFullDto ={ basic: userBasicDto, details: detailsDto };

        return(
            <UserDetailsComponent user={userFullDto} /> // get full user details DTO
        )
    }

    return(
        <>
    
        </>
    )}
}