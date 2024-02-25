import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";

const DropdownMenu = ({ menuRef, open, setLogoutClicked }) => {
 
  const auth = useSelector(state => state.auth.value);

  return (
    <div ref={menuRef} className={ open ? 'dropdown-menu open' : 'dropdown-menu' }>
      { auth.isAuth ? (
        <>
          <button className='menu-btn'><Link to={'/profile'}>Your account</Link></button>
          <button className='menu-btn' onClick={() => setLogoutClicked(true)}>Log out</button>
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
