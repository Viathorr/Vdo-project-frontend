import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { CgProfile, CgLogOut } from "react-icons/cg";
import { MdOutlineSettings } from "react-icons/md";

const DropdownMenu = ({ menuRef, open, setLogoutClicked }) => {
 
  const auth = useSelector(state => state.auth.value);

  return (
    <div ref={menuRef} className={ open ? 'dropdown-menu open' : 'dropdown-menu' }>
      { auth.isAuth ? (
        <>
          <button className='menu-btn'><CgProfile className='profile-icon icon' />
            <Link to={'/profile'}>Your account</Link>
          </button>
          <button className='menu-btn'><MdOutlineSettings className='settings-icon icon' />
            <Link to={'/settings'}>Settings</Link>
          </button>
          <button className='menu-btn logout-btn' onClick={() => setLogoutClicked(true)}>
            <CgLogOut className='logout-icon icon'/>Log out
          </button>
        </>
      ) : (
        <>
          <button className='menu-btn'><Link to={'/login'}>Log in</Link></button>
          <button className='menu-btn'><Link to={'/signup'}>Sign up</Link></button>
        </>
      )}
    </div>
  )
};

export default DropdownMenu;
