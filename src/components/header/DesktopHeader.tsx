import NavLinkTemplate from "../layout/button/NavLinkTemplate";
import { Link } from "react-router-dom";
import Search from "../layout/search/Search";
import logo from "../../assets/logo.jpeg";
import calendar from "../../assets/calender-icon.jpeg";
import user from "../../assets/user-icon-copy.png";
import "./Header.scss";

const DesktopHeader = () => {

  const token: any = localStorage.getItem("token")
  return (
    <nav className="desktop-top-nav">
      <div className="left-nav">
        <Link to="/">
          <img src={logo} alt="logo" className="logo"></img>
        </Link>
        <Link to="/" className="tlc">
          TLC
        </Link>
        <NavLinkTemplate content={"Associations"} to={"/associations"} />
        <NavLinkTemplate content={"Volunteer now"} to={"/volunteering"} />
        {localStorage.getItem("role") === "association" && <NavLinkTemplate content={"New Volunteering"} to={"/newVolunteering"} />}
        {localStorage.getItem("role") === "user" && <NavLinkTemplate content={"For You"} to={"/foryou"} />}
        <NavLinkTemplate content={"About us"} to={"/About"} />
      </div>

      <div className="right-nav">
        <Search />
        {token && <NavLinkTemplate content={"Profile"} to={"/profile"} />}
        {!token && <Link to="/signin">
          <img src={user} alt="user"></img>
        </Link>}
        {token && <Link to="/calendar">
          <img src={calendar} alt="calendar" className="calendar"></img>
        </Link>}
      </div>
    </nav>
  );
};

export default DesktopHeader;
