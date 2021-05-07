import React from "react";
import { Link } from "react-router-dom";

const Nav: React.FC = () => {
  return (
    <section className="Nav">
      <ul className="Nav__ul">
        <li className="Nav__li">
          <Link to="/">Home</Link>
        </li>
        <li className="Nav__li">
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
    </section>
  );
};

export default Nav;
