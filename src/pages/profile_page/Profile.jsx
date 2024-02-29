import useAxiosFetch from '../../hooks/useAxiosFetch';
import './Profile.css';
import { FcOk, FcClock, FcCollaboration } from "react-icons/fc";
import { useSelector } from 'react-redux';

const Profile = () => {
  const user = useSelector(state => state.user.value);
  const userInfo = {
    completedTodos: 23,
    askedQuestions: 4,
    leftTodos: 7
  };

  return (
    <section className='profile-container'>
      <div className='profile-header'></div>
      <div className='profile-header-content'>
        <div className='profile-img-container'>
          <img src={user.profileImage ? user.profileImage : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'} alt="profile-image" />
          <div className='online'></div>
        </div>
        <div className='user-info-container'>
          <h2>{user.name}</h2>
          <p>{user.country}</p>
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
        <div className='activity-stats'>
          <h1>Your activity chart</h1>
        </div>
      </div>
    </section>
  )
};

export default Profile;
