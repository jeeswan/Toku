import React, { useContext } from "react";
import "./Navbar.css";
import { IoMdSearch } from "react-icons/io";
import { MdPersonOutline } from "react-icons/md";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const PF = import.meta.env.VITE_PUBLIC_FOLDER;
  return (
    <div className="navbarContainer">
      <div className="navbarLeft">
        <NavLink to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Toku</span>
        </NavLink>
      </div>
      <div className="navbarCenter">
        <div className="searchBar">
          <IoMdSearch className="searchIcon" />
          <input
            type="text"
            placeholder="Search for friends, posts or videos"
            className="searchInput"
          />
        </div>
      </div>
      <div className="navbarRight">
        <div className="navbarLinks">
          <span className="navbarLink">Home</span>
          <span className="navbarLink">Timeline</span>
        </div>
        <div className="navbarIcons">
          <div className="navbarIconItem">
            <MdPersonOutline size={25} />
            <span className="navbarIconBadge">1</span>
          </div>
        </div>
        <div className="navbarIcons">
          <div className="navbarIconItem">
            <IoChatbubbleEllipsesOutline size={25} />
            <span className="navbarIconBadge">1</span>
          </div>
        </div>
        <div className="navbarIcons">
          <div className="navbarIconItem">
            <IoMdNotificationsOutline size={25} />
            <span className="navbarIconBadge">1</span>
          </div>
        </div>
        <NavLink to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePic ? PF + user.profilePic : PF + "person/noAvatar.png"
            }
            alt="Profile"
            className="navbarImage"
          />
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
