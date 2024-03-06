import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import DropdownMenu from "./DropdownMenu";
import { LuListTodo } from "react-icons/lu";
import { RiCalendarTodoLine } from "react-icons/ri";
import { MdOutlineQuestionAnswer, MdNotifications } from "react-icons/md";

const Navbar = ({ setLogoutClicked }) => {
  const [open, setOpen] = useState(false);

  const linkRef = useRef();
  const menuRef = useRef();

  window.addEventListener('click', (e) => {
    if (e.target !== menuRef.current && e.target !== linkRef.current && open) {
      setOpen(false);
    }
  });

  return (
    <nav className="navbar" anchor='dropdown-menu'>
      <div className="nav-container">
        <Link className="home-link link" to={'/'}>Home</Link>
        <div className="links">
          <Link className="navbar-link link" to={'/schedule'}><RiCalendarTodoLine className="icon"/>Schedule</Link>
          <Link className="navbar-link link" to={'/todos'}><LuListTodo className="icon"/>Todos</Link>
          <Link className="navbar-link link" to={'/questions_answers'}><MdOutlineQuestionAnswer className="icon"/>Q&A</Link>
        </div>
        <Link className="profile-link link" ref={linkRef} to='#' onClick={() => setOpen(prev => !prev)}>Profile</Link>
        <DropdownMenu id='dropdown-menu' menuRef={menuRef} open={open} setLogoutClicked={setLogoutClicked}/>
      </div>
    </nav>
  )
};

export default Navbar;
