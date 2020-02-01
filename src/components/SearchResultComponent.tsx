import React from 'react';
import { UserDto } from '../services/dto/UsersDto';

const SearchResultComponent = (props) => {
    const users = props.users as UserDto[]
    const usersList = users.map(user=>{
        return (
        <div key={user.id}>
            {user.displayName}
        </div>
        );
    })
    return ( 
    <>
    {usersList}
    </> );
}
 
export default SearchResultComponent;