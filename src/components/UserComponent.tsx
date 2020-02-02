import { Component } from "react";
import { UserDto } from "../services/dto/UsersDto";
import * as React from 'react';
import {Link} from 'react-router-dom';

interface IUserCoomponent{
    user:UserDto
}
export class UserComponent extends Component<IUserCoomponent>{

    calculateAge = (birthday) => { // birthday is a date
        var ageDifMs = Date.now() - birthday;
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
      }

    render(){
        const userStyle={
            border: '1px solid gray',
   
        }

        const user = this.props.user;
        const userDetailsLink = `/user/${user.id}`;
        let birthDate = '';
        birthDate = user.birthDate?.slice(0,10) ?? '';
        let gender = '';
        switch(user.gender){
            case 'm': gender='male';break;
            case 'f': gender='female';break;
        }
 

        return(
            <>
             <div key={user.id} style={userStyle}>
            Użytkownik {user.displayName} <br/>
            Płeć {gender} <br/>
            Wiek {this.calculateAge(Date.parse(birthDate))} <br/>
            <Link to={userDetailsLink}>Go</Link>
        </div>
            </>
        )
    }

}