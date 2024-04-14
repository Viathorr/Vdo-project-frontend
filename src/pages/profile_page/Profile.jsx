import useAxiosFetch from '../../hooks/useAxiosFetch';
import './Profile.css';
import { useEffect, useState } from 'react';
import { FcOk, FcClock, FcCollaboration } from "react-icons/fc";
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../features/auth/user';

const Profile = () => {
  const { data, isLoading, fetchError } = useAxiosFetch('/user');
  const user = useSelector(state => state.user.value);
  const [userInfo, setUserInfo] = useState({
    completedTodos: 0,
    askedQuestions: 0, 
    leftTodos: 0
  })
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUser({ ...user, name: data.name, country: data.country, email: data.email, phoneNumber: data.phoneNum, profileImage: data.profilePicture }));
    setUserInfo(prev => ({ ...prev, completedTodos: data.completedTodos, leftTodos: data.leftTodos, askedQuestions: data.askedQuestions }));
  }, [data, dispatch]);

  return (
    <section className='profile-container'>
      {isLoading && <p>Loading...</p>}
      {!isLoading && fetchError && <p style={{ color: 'red' }}>{fetchError}</p>}
      {!isLoading && !fetchError && 
        <>
          <div className='profile-header'></div>
          <div className='profile-header-content'>
            <div className='profile-img-container'>
              <img src={user.profileImage ? user.profileImage : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'} alt="profile-image" />
              <div className='online'></div>
            </div>
            <div className='user-info-container'>
              <h2>{user.name}</h2>
              <p>{user.country ? user.country : 'Somewhere In Neverland'}</p>
            </div>
          </div>
          <div className='activity-info-container'>
            <div className='stats-container'>
              <div className='stats-div'>
                <h3>Left todos <FcClock className='icon' /></h3>
                <p>{ userInfo.leftTodos } </p>
              </div>
              <div className='stats-div'>
                <h3>Completed todos <FcOk className='icon' /></h3>
                <p>{userInfo.completedTodos} </p>
              </div>
              <div className='stats-div'>
                <h3>Asked questions <FcCollaboration className='icon' /></h3>
                <p>{userInfo.askedQuestions}</p>
              </div>
            </div>
          </div>
        </>
      }
    </section>
  )
};

export default Profile;
