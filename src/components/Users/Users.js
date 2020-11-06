import React from "react";
import { NavLink } from "react-router-dom";
import "./Users.css";

function Users(props) {
  const { users } = props;

  const usersList = users.map((it) => {
    return (
      <li className="users_item">
        <NavLink
          className="users_link"
          to={{
            pathname: `/users/${it.id}/albums`,
            state: {
              user: it
            }
          }}
          aria-label="open user's albums"
        >
          <p className="users_name">{it.name}</p>
        </NavLink>
      </li>
    );
  });
  return (
    <section className="users">
      <h2 className="users_title">Users</h2>
      {<ul className="users_list">{usersList}</ul>}
    </section>
  );
}

export default Users;
