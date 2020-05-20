import { Component } from "react";
import { UserDto } from "../services/dto/UsersDto";
import UserWithLink, { UserComponent } from "./UserComponent";
import * as React from "react";
import { UserFriendshipActionComponent } from "./UserFriendshipActionComponent";
interface IFriendComponent {
  user: UserDto;
  callBack?;
}
export class FriendComponent extends Component<IFriendComponent> {
  state = {
    friendshipStatus: "friends",
  };

  callBack = (action) => {
    console.log("friendComponent callBack");
    if (this.props.callBack !== null && this.props.callBack !== undefined) {
      if (action === "removeFriend") {
        this.props.callBack("friends");
      } else {
        this.props.callBack();
      }
    }
  };

  render() {
    return (
      <>
        <UserWithLink user={this.props.user}></UserWithLink>
        <UserFriendshipActionComponent
          userId={this.props.user.id ?? 0}
          callBack={this.callBack}
        />
      </>
    );
  }
}
