import React, { Props } from 'react';
import { UsersService } from '../services/UsersService';
import {UserDetailsDto} from '../services/dto/UsersDto';
import {UserDetailsComponent} from '../components/UserDetailsComponent';
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

    componentDidMount(){
        const userId = this.state.userId;
        const usersService = new UsersService();
  
    usersService.getUserDetais(userId).then(result=>{
        console.log(result);
        this.setState({
            userDto: result
        })
    });
    }
    

    render(){
       
    
    const {userDto} = this.state
    if(userDto !== undefined){
        console.log("something");
        const dto = userDto as UserDetailsDto;

        return(
            <UserDetailsComponent user={dto} /> // get full user details DTO
        )
    }

    return(
        <>
    
        </>
    )}
}