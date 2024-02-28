import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { CgProfile, CgLogOut } from "react-icons/cg";
import { MdOutlineSettings } from "react-icons/md";
import { IoLogInOutline, IoPersonAddOutline } from "react-icons/io5";

const DropdownMenu = ({ menuRef, open, setLogoutClicked }) => {
 
  const auth = useSelector(state => state.auth.value);

  return (
    <div ref={menuRef} className={ open ? auth.isAuth ? 'dropdown-menu open' : 'dropdown-menu open not-auth' : 'dropdown-menu' }>
      { auth.isAuth ? (
        <>
          <button className='menu-btn'><CgProfile className='icon' />
            <Link to={'/profile'}>Your account</Link>
          </button>
          <button className='menu-btn'><MdOutlineSettings className='icon' />
            <Link to={'/settings'}>Settings</Link>
          </button>
          <button className='menu-btn logout-btn' onClick={() => setLogoutClicked(true)}>
            <CgLogOut className='icon'/>Log out
          </button>
        </>
      ) : (
        <>
          <button className='menu-btn'><IoLogInOutline className='icon' />
            <Link to={'/login'}>Log in</Link>
          </button>
          <button className='menu-btn'><IoPersonAddOutline className='icon' />
            <Link to={'/signup'}>Sign up</Link>
          </button>
        </>
        )
      }
    </div>
  )
};

export default DropdownMenu;
