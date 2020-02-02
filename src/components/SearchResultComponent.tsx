import React, { Component } from 'react';
import { UserDto } from '../services/dto/UsersDto';
import {Link} from 'react-router-dom';
import UserWithLink ,{UserComponent, } from '../components/UserComponent';
interface ISearchComponentProps{
    users : UserDto[]
}


export class SearchResultComponent extends Component<ISearchComponentProps>  {
  
    render(){

        const users = this.props.users as UserDto[];
        const usersList = users.map(user=>{
            const userStyle={
                border: '1px solid gray',
            }
       
        return (
            <div style={userStyle} key={user.id}>
            <UserWithLink user={user}></UserWithLink>
            </div>
        );
    })
    return ( 
    <>
    {usersList}
    </> );
    }
}
 
export default SearchResultComponent;