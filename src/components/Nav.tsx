import React from "react";
import { Link } from "react-router-dom";
import { FirebaseUser } from "../App";

interface Props {
  userData: FirebaseUser | undefined;
}

const Nav: React.FC<Props> = ({ userData }) => {
  return (
    <section className="Nav">
      <ul className="Nav__ul">
        <li className="Nav__li">
          <Link to="/">Home</Link>
        </li>
        <li className="Nav__li">
          <Link to="/profile">{userData!.displayName}'s Profile</Link>
        </li>
      </ul>
    </section>
  );
};

export default Nav;
