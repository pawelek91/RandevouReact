import * as React from "react";
import { Component } from "react";
import { UserFullDto } from "../services/dto/UsersDto";
import InterestDisplayComponent from "../components/InterestsDisplayComponent";
import { UserComponent } from "./UserComponent";
import { UserFriendshipActionComponent } from "./UserFriendshipActionComponent";
import { DictionaryFieldReadComponent } from "./DictionaryFieldReadComponent";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

interface IUserDetailsComponent {
  user: UserFullDto;
}
export class UserDetailsComponent extends Component<IUserDetailsComponent> {
  goToConversation = () => {
    const userId = this.props.user.basic.id;
    const link = "/messages/conversation/" + userId;
    console.log("redirect to", link);
    return <Redirect to={link} />;
  };
  render() {
    const userDto = this.props.user;
    const userInterest = userDto.details?.interests as Number[];
    const messagesLink = `/messages/conversation/${userDto.basic.id}`;
    return (
      <>
        <UserComponent user={userDto.basic} />
        <table>
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

            <tr>
              <td>
                <DictionaryFieldReadComponent
                  itemName="kolor oczu"
                  itemId={userDto.details?.eyesColor ?? 0}
                />
              </td>
            </tr>

            <tr>
              <td>
                <DictionaryFieldReadComponent
                  itemName="kolor włosów"
                  itemId={userDto.details?.hairColor ?? 0}
                />
              </td>
            </tr>

            <tr>
              <th>Zainteresowania</th>
              <td>
                {userInterest?.length > 0 ? (
                  <InterestDisplayComponent ids={userInterest} />
                ) : (
                  <></>
                )}
              </td>
            </tr>
          </tbody>
        </table>
        {userDto.basic.id !== undefined ? (
          <UserFriendshipActionComponent userId={userDto.basic.id ?? 0} />
        ) : undefined}
        <Link to={messagesLink}>Send message</Link>;
      </>
    );
  }
}
