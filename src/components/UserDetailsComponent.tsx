import * as React from 'react';
import { Component } from "react";
import { UserFullDto } from '../services/dto/UsersDto';
import InterestDisplayComponent from '../components/InterestsDisplayComponent';
import { UserComponent } from './UserComponent';
import { UserFriendshipActionComponent } from './UserFriendshipActionComponent';
interface IUserDetailsComponent{
    user: UserFullDto
}
export class UserDetailsComponent extends Component<IUserDetailsComponent>{
    render(){
        const userDto = this.props.user;
        const userInterest = userDto.details?.interests as Number[];
        console.log("render");
        console.log(userDto.basic.id);
    return(
        
        <>
        <UserComponent user={userDto.basic} />
        <table >
            <tbody>
                <tr>
                    <th>Miasto</th>
                    <td>{userDto.details?.city}</td>
                </tr>
                <tr>
                    <th>Województwo</th>
                    <td>{userDto.details?.region}</td>
                </tr>
                <tr>
                    <th>Wzrost</th>
                    <td>{userDto.details?.width}</td>
                </tr>
                <tr>
                    <th>Waga</th>
                    <td>{userDto.details?.heigth}</td>
                </tr>
  {/* <tr>
    <th>Kolor oczu</th>
    <td>{userEyesColor}</td>
  </tr>
  <tr>
    <th>Kolor włosów</th>
    <td>{userHairColor}</td>
  </tr>
  
  */}
  <tr>
    <th>Zainteresowania</th>
    <td>
            {userInterest?.length >0 ? 
            <InterestDisplayComponent ids={userInterest} /> : <></>}
    </td>
  </tr> 
            </tbody>
        </table>
        {userDto.basic.id !== undefined ? <UserFriendshipActionComponent userId={userDto.basic.id ?? 0} /> : undefined}

        </>
        )
    }
}