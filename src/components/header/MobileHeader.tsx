import React from "react";
import hamburger from "../../assets/group-13.png";
import user from "../../assets/user-icon-copy.png";
import "./Header.scss";
import { Fragment, useState } from "react";
import NavLinkTemplate from "../layout/button/NavLinkTemplate";
import { Link } from "react-router-dom";
import CloseButton from "../layout/button/CloseButton";
import calendar from "../../assets/calender-icon.jpeg";

const MobileHeader = () => {
  const content: string[] = ["Sign In", "Contact Us", "Terms Of Use"];
  const [showNavBar, setShowNavBar] = useState(false);
  const openNavBarHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    setShowNavBar(true);
  };
  return (
    <Fragment>
      <nav className="mobile-top-nav">
        {!showNavBar && (
          <>
            <img
              src={hamburger}
              alt="hamburger"
              className="hamburger"
              onClick={openNavBarHandler}
            ></img>
            <NavLinkTemplate content={"My Profile"} to={"/profile"} />
            <Link to="/signin">
              <img src={user} alt="user"></img>
            </Link>
            <Link to="/calendar">
              <img src={calendar} alt="calendar" className="calendar"></img>
            </Link>
          </>
        )}
      </nav>
      {showNavBar && (
        <div className="hamburger-bar">
          {showNavBar && (
            <CloseButton onClick={() => setShowNavBar(false)}></CloseButton>
          )}
          <div className="hamburger-nav-top">
            <Link to="/associations" className="hamburger-nav-top-links">
              Associations
            </Link>
            <Link to="/volunteering/1" className="hamburger-nav-top-links">
              Volunteer now
            </Link>
            <Link to="/About" className="hamburger-nav-top-links">
              About us
            </Link>
          </div>
          {content.map((navLi) => (
            <li className="hamburger-nav-list" key={navLi}>
              <NavLinkTemplate content={navLi} to={navLi.replace(/\s/g, "")} />
            </li>
          ))}
        </div>
      )}
    </Fragment>
  );
};

export default MobileHeader;
