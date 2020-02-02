import React, { Component } from 'react';
import { UserDto } from '../services/dto/UsersDto';
import {Link} from 'react-router-dom';
import {UserComponent} from '../components/UserComponent';
interface ISearchComponentProps{
    users : UserDto[]
}


export class SearchResultComponent extends Component<ISearchComponentProps>  {
  
    render(){

        const users = this.props.users as UserDto[];
        const usersList = users.map(user=>{
       
       
        return (
            <UserComponent user={user}></UserComponent>
        );
    })
    return ( 
    <>
    {usersList}
    </> );
    }
}
 
export default SearchResultComponent;