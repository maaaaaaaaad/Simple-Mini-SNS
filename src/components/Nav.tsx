import { faHome, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { FirebaseUser } from "../App";
import "../css/Nav.css";

interface Props {
  userData: FirebaseUser | undefined;
}

const Nav: React.FC<Props> = ({ userData }) => {
  return (
    <section className="Nav">
      <ul className="Nav__ul">
        <li className="Nav__li">
          <Link to="/">
            <FontAwesomeIcon icon={faHome} size={"3x"}></FontAwesomeIcon>
          </Link>
        </li>
        <li className="Nav__li">
          <Link to="/profile">
            <FontAwesomeIcon icon={faUser} size={"3x"}></FontAwesomeIcon>
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default Nav;
