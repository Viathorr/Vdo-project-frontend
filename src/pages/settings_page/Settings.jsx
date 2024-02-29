import { useEffect, useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { LuUpload, LuSave } from "react-icons/lu";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { TiUserDeleteOutline } from "react-icons/ti";
import { useSelector, useDispatch } from 'react-redux';
import { setUser, removeUser } from '../../features/auth/user';
import { removeAuth } from '../../features/auth/auth';
import './Settings.css';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PHONE_NUM_REGEX = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const API_URL = '/user';

const Settings = () => {
  const user = useSelector(state => state.user.value);
  const dispatch = useDispatch();
  const [imgFile, setImgFile] = useState(null);
  const [name, setName] = useState(user.name);
  const [country, setCountry] = useState(user.country ? user.country : '');
  const [phoneNum, setPhoneNum] = useState(user.phoneNumber ? user.phoneNumber : '');
  const [profileImage, setProfileImage] = useState(user.profileImage ? user.profileImage : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png');
  const [currPassword, setCurrPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [phoneNumValid, setPhoneNumValid] = useState(true);
  const [nameValid, setNameValid] = useState(true);
  const [currPwdValid, setCurrPwdValid] = useState(true);
  const [newPwdValid, setNewPwdValid] = useState(false);
  const [showPwds, setShowPwds] = useState({ curr: false, new: false });
  const [pwdFocus, setPwdFocus] = useState(false);
  const axiosJWT = useAxiosPrivate();

  useEffect(() => {
    if (phoneNum) {
      setPhoneNumValid(PHONE_NUM_REGEX.test(phoneNum));
    } else {
      setPhoneNumValid(true);
    }
  }, [phoneNum]);

  useEffect(() => {
    if (!name) {
      console.log('name is empty');
      setNameValid(false);
    } else {
      setNameValid(true);
    }
  }, [name]);

  useEffect(() => {
    if (!PWD_REGEX.test(newPassword)) {
      setNewPwdValid(false);
    } else {
      setNewPwdValid(true);
    }
  }, [newPassword]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setImgFile(selectedFile);
    setProfileImage(URL.createObjectURL(selectedFile));
    // dispatch(setUser({ ...user, profileImage: (URL.createObjectURL(selectedFile)) }));
    console.log('image file:', imgFile);
  };

  const handleSaveChanges = async () => {
    setCurrPwdValid(false);
  };

  const handleDeleteAcc = async () => {

  };

  const handlePwdChange = async () => {
    if (currPassword && newPassword && newPwdValid && currPassword !== newPassword) {
      try {
      const res = await axiosJWT.put(`${API_URL}/change-password`, { currPassword, newPassword });
        if (res.data.message === 'Success') {
          setCurrPassword('');
          setNewPassword('');
          setCurrPwdValid(true);
          console.log("Success");
      }
    } catch (err) {
      console.log(err.message);
      if (err.response.data === 'Passwords do not match.') {
        setCurrPwdValid(false);
        return;
      }
    }
    }
  };

  return (
    <section className='settings-container'>
      <main>
        <div className='settings-header'>
          <h1>Your Profile</h1>
          <p className='subheader'>These settings allow you to customise your personal details.</p>
        </div>
        <div className='info-container'>
          <div className='personal-info-container'>
            <div className='info'>
              <h2>Personal information</h2>
              <div className='inputs-container'>
                <div className='input-div name-div'>
                  <label htmlFor="full-name">Full name</label>
                  <input
                    id='full-name'
                    type="text"
                    value={name}
                    placeholder='Name'
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <div className='info-msg' hidden={nameValid ? true : false}>Name can't be empty.</div>
                </div>
                <div className='input-div email-div'>
                  <label htmlFor="email">Email address</label>
                  <input
                    id='email'
                    type="email"
                    value={user.email}
                    placeholder='Email'
                    disabled
                  />
                  <div className='info-msg'>You can't change your email.</div>
                </div>
                <div className='input-div'>
                  <label htmlFor="country">Country</label>
                  <input
                    id='country'
                    type="text"
                    value={country}
                    placeholder='Country'
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>
                <div className='input-div phone-num-div'>
                  <label htmlFor="phone-num">Phone number</label>
                  <input
                    id='phone-num'
                    type="tel"
                    value={phoneNum}
                    placeholder='Phone number'
                    onChange={(e) => setPhoneNum(e.target.value)}
                  />
                  <div className='info-msg' hidden={phoneNumValid ? true : false}>Please enter a valid phone number.<br/>Num of digits: 10-12</div>
                </div>
              </div>
            </div>
            <div className='info'>
              <h2>Password</h2>
              <div className='inputs-container'>
                <div className='input-div'>
                  <label htmlFor="curr-pwd">Current password</label>
                  <div className='wrapper'>
                    <input
                      id='curr-pwd'
                      type={showPwds.curr ? 'text' : 'password'}
                      onChange={(e) => setCurrPassword(e.target.value)}
                      value={currPassword}
                      placeholder='Current password'
                    />
                    <MdOutlineRemoveRedEye
                      className='icon'
                      onClick={() => setShowPwds(prev => ({ ...prev, curr: !prev.curr }))}
                    />
                    <div className='info-msg' hidden={currPwdValid ? true : false}>Wrong password.</div>
                  </div>
                </div>
                <div className='input-div'>
                  <label htmlFor="new-pwd">New password</label>
                  <div className='wrapper new-pwd'>
                    <input
                      id='new-pwd'
                      type={showPwds.new ? 'text' : 'password'}
                      onChange={(e) => setNewPassword(e.target.value)}
                      value={newPassword}
                      onFocus={() => setPwdFocus(true)}
                      onBlur={() => setPwdFocus(false)}
                      autoComplete='off'
                      placeholder='New password'
                    />
                    <MdOutlineRemoveRedEye
                      className='icon'
                      onClick={() => setShowPwds(prev => ({ ...prev, new: !prev.new }))}
                    />
                    <div className={ (!newPwdValid && pwdFocus) ? 'info-msg' : 'offscreen'} >8 to 24 characters.<br />
            Must include uppercase and lowercase letters, a number and a special character.<br />
            Allowed special characters: 
            <span aria-label="exclamation mark">!</span>
            <span aria-label="at symbol">@</span>
            <span aria-label="hashtag">#</span>
            <span aria-label="dollar sign">$</span>
            <span aria-label="percent">%</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='profile-image-container'>
            <h2>Profile image</h2>
            <p className='subheader'>Image must be at least 500x500px and no larger than 5mb</p>
            <img src={profileImage ? profileImage : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'} alt="profile-image" />
            <button className='image-btn'><LuUpload className='icon'/><label htmlFor="file" style={{ cursor: 'pointer'}}>Choose image</label></button>
            <input id='file' type="file" onChange={(e) => handleFileChange(e)} hidden accept='image/png, image/jpg, image/jpeg'/>
          </div>
        </div>
        <div className='btns-container'>
          <button className='change-pwd-btn' onClick={handlePwdChange}>Change password</button>
          <button className='delete-btn' onClick={handleDeleteAcc}><TiUserDeleteOutline className='icon' />Delete account</button>
          <button className='save-btn' onClick={handleSaveChanges}><LuSave className='icon'/>Save changes</button>
        </div>
      </main>
    </section>
  )
}

export default Settings
