import { GiEntryDoor } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';
import useLogout from '../../hooks/useLogout';

const LogoutPopUp = ({ logoutClicked, setLogoutClicked }) => {
  const logout = useLogout();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    setLogoutClicked(false);
    navigate('/');
  };
 
  return (
    <div className={ logoutClicked ? 'logout-window open' : 'logout-window' }>
      <div className='logout-window-content'>
        <GiEntryDoor className='closing-door-icon'/>
        <p>Oh no! You're leaving...</p>
        <p>Are you sure?</p>
          <div className='buttons-container'>
            <button className='btn no-btn' onClick={() => setLogoutClicked(false)}>No, Just Kidding</button>
            <button className='btn yes-btn' onClick={() => handleLogout()}>Yes, Log Me Out</button>
          </div>
      </div>
    </div>
  )
};

export default LogoutPopUp;
