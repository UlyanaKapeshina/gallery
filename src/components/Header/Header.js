import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <>
      <header className="header">
        <NavLink to="/users" className="header_link">
          <h2 className="header_title">gallery app</h2>
        </NavLink>
      </header>
    </>
  );
};

export default Header;
