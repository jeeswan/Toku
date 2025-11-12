import React from 'react'
import "./Sidebar.css"
import { MdOutlineRssFeed } from "react-icons/md";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { FiVideo } from "react-icons/fi";
import { MdOutlineGroup } from "react-icons/md";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { MdWorkOutline } from "react-icons/md";
import { BsCalendar3Event } from "react-icons/bs";
import { LiaUserGraduateSolid } from "react-icons/lia";
import {Users} from "../../dummyData"
import Closefriend from '../closefriend/Closefriend';

const Sidebar = () => {
  return (
    <div className='sidebarContainer'>
      <div className='sidebarWrapper'>
        <ul className='sidebarList'>
            <li className='sidebarListItem'>
                <MdOutlineRssFeed className='sidebarIcon'/>
                <span className='sidebarListItemText'>Feed</span>
            </li>
            <li className='sidebarListItem'>
                <IoChatbubbleEllipsesOutline className='sidebarIcon'/>
                <span className='sidebarListItemText'>Chats</span>
            </li>
            <li className='sidebarListItem'>
                <FiVideo className='sidebarIcon'/>
                <span className='sidebarListItemText'>Videos</span>
            </li>
            <li className='sidebarListItem'>
                <MdOutlineGroup className='sidebarIcon'/>
                <span className='sidebarListItemText'>Groups</span>
            </li>
            <li className='sidebarListItem'>
                <MdOutlineBookmarkBorder className='sidebarIcon'/>
                <span className='sidebarListItemText'>Bookmarks</span>
            </li>
            <li className='sidebarListItem'>
                <FaRegCircleQuestion className='sidebarIcon'/>
                <span className='sidebarListItemText'>Questions</span>
            </li>
            <li className='sidebarListItem'>
                <MdWorkOutline className='sidebarIcon'/>
                <span className='sidebarListItemText'>Jobs</span>
            </li>
            <li className='sidebarListItem'>
                <BsCalendar3Event className='sidebarIcon'/>
                <span className='sidebarListItemText'>Events</span>
            </li>
            <li className='sidebarListItem'>
                <LiaUserGraduateSolid className='sidebarIcon'/>
                <span className='sidebarListItemText'>Courses</span>
            </li>
        </ul>
        <button className='sidebarButton'>Show More</button>
        <hr className='sidebarHR'/>
        <ul className="sidebarFriendList">
            {Users.map(u => (
                <Closefriend key={u.id} user={u} />
            ))}
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
