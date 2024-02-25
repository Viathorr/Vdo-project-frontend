import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import LogoutPopUp from '../components/logout/LogoutPopUp';
import { useState } from 'react';

const Layout = () => {
  const [ logoutClicked, setLogoutClicked ] = useState(false);
  return (
    <>
      <Navbar setLogoutClicked={setLogoutClicked} />
      <Outlet />
      <LogoutPopUp logoutClicked={logoutClicked} setLogoutClicked={setLogoutClicked}/>
    </>
  )
}

export default Layout
