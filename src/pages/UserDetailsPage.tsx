import React, { Props } from 'react';
import { UsersService } from '../services/UsersService';
import {UserDetailsDto} from '../services/dto/UsersDto';
import { render } from '@testing-library/react';

export default class  UserDetailsPage extends React.Component{
    
    constructor(props) {
        super(props);
        this.state={
            userId: props.match.params.id,
            userDto: {}
        }
    }

    state={
        userId: 0,
        userDto:{},
    }
    

    render(){
        const userId = this.state.userId;
        const usersService = new UsersService();
  
    usersService.getUserDetais(userId).then(result=>{
        this.setState({
            userDto: result
        })
    });

    const {userDto} = this.state
    if(userDto !== undefined){
        console.log("something");
        const dto = userDto as UserDetailsDto;
        console.log(dto.id);
    }

    return(
        <>
    
        </>
    )}
}