import React, { Component } from 'react';
import { UserDto } from '../services/dto/UsersDto';

interface ISearchComponentProps{
    users : UserDto[]
}


export class SearchResultComponent extends Component<ISearchComponentProps>  {
  
    calculateAge(birthday) { // birthday is a date
        var ageDifMs = Date.now() - birthday;
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
      }

    render(){
        const userStyle={
            border: '1px solid gray',
   
        }

        const users = this.props.users as UserDto[];
    const usersList = users.map(user=>{
       
       let gender = '';
       switch(user.gender){
           case 'm': gender='male';break;
           case 'f': gender='female';break;
       }

       let birthDate = '';
       birthDate = user.birthDate?.slice(0,10) ?? '';
        return (
        <div key={user.id} style={userStyle}>
            Użytkownik {user.displayName} <br/>
            Płeć {gender} <br/>
            Wiek {this.calculateAge(Date.parse(birthDate))} <br/>
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