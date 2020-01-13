import React from 'react';
import { NavLink } from 'react-router-dom';
import "../styles/Navigation.css";

const list = [
  { name: "Home", path: "/", exact: true },
  { name: "Messages", path: "/messages" },
  { name: "Friends", path: "/friends" },
  { name: "Search", path: "/search" },
]

const Navigation = () => {

  const menu = list.map(item => (
    <li key={item.name}>
      <NavLink to={item.path} exact={item.exact ? item.exact : false}>{item.name}</NavLink>
    </li>
  ))

  return (
    <nav className="main">
      <ul>
        {menu}
      </ul>
    </nav>
  );
}

export default Navigation;