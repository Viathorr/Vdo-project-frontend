import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import DropdownMenu from "./DropdownMenu";
import { useSelector } from "react-redux";

const Navbar = ({ setLogoutClicked }) => {
  const [open, setOpen] = useState(false);
  const auth = useSelector(state => state.auth.value);

  const linkRef = useRef();
  const menuRef = useRef();

  window.addEventListener('click', (e) => {
    if (e.target !== menuRef.current && e.target !== linkRef.current && open) {
      setOpen(false);
    }
  });

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link className="home-link" to={'/'}>Home</Link>
        <div className="schedule-links">
          <Link to={'/classes'}>Classes</Link>
          <Link to={'/todos'}>Todos</Link>
        </div>
        <Link className="profile-link" ref={linkRef} to='#' onClick={() => setOpen(prev => !prev)}>Profile</Link>
        <DropdownMenu menuRef={menuRef} open={open} setLogoutClicked={setLogoutClicked}/>
      </div>
    </nav>
  )
};

export default Navbar;
