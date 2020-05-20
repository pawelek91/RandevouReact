import { Component } from "react";
import { UserDto } from "../services/dto/UsersDto";
import * as React from "react";
import { Link } from "react-router-dom";

interface IUserCoomponent {
  user: UserDto;
}

export class UserComponent extends Component<IUserCoomponent> {
  calculateAge = (birthday) => {
    // birthday is a date
    var ageDifMs = Date.now() - birthday;
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  render() {
    const user = this.props.user;

    let birthDate = "";
    birthDate = user.birthDate?.slice(0, 10) ?? "";
    let gender = "";
    switch (user.gender) {
      case "m":
        gender = "male";
        break;
      case "f":
        gender = "female";
        break;
    }

    return (
      <>
        <div key={user.id}>
          Użytkownik {user.displayName} <br />
          Płeć {gender} <br />
          Wiek {this.calculateAge(Date.parse(birthDate))} <br />
        </div>
      </>
    );
  }
}

const UserWithLink = (props) => {
  const userDetailsLink = `/user/${props.user.id}`;
  const messagesLink = `/messages/conversation/${props.user.id}`;
  return (
    <>
      <UserComponent user={props.user} /> |<Link to={userDetailsLink}>Go</Link>{" "}
      |<Link to={messagesLink}>Send message</Link> |
    </>
  );
};

export default UserWithLink;
