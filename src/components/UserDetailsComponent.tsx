import * as React from 'react';
import { Component } from "react";
import { UserFullDto } from '../services/dto/UsersDto';
import InterestDisplayComponent from '../components/InterestsDisplayComponent';
interface IUserDetailsComponent{
    user: UserFullDto
}
export class UserDetailsComponent extends Component<IUserDetailsComponent>{
    render(){
        const userDto = this.props.user;
        const userInterest = userDto.details?.interests as Number[];
    return(
        <>
        <table >
            <tbody>
                <tr>
                    <th>Nazwa użytkownika</th>
                    <td>{userDto.basic?.displayName}</td>
                </tr>
                <tr>
                    <th>Data urodzin</th>
                    <td>{userDto.basic?.birthDate}</td>
                </tr>
                <tr>
                    <th>Płeć</th>
                    <td>{userDto.basic?.gender}</td>
                </tr>
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
        </>
        )
    }
}