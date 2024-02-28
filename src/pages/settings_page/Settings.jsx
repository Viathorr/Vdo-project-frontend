import { useState } from 'react';
import { LuUpload, LuSave } from "react-icons/lu";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { TiUserDeleteOutline } from "react-icons/ti";
import './Settings.css'

const Settings = () => {
  const [user, setUser] = useState({
    name: 'Min Viathor',
    email: 'theuseful13@gmail.com',
    country: 'Japan',
    profileImage: 'https://cdn.imgchest.com/files/e4gdcverzr4.png',
    phoneNumber: ''
  });

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
                <div className='input-div'>
                  <label htmlFor="full-name">Full name</label>
                  <input id='full-name' type="text" value={user.name} placeholder='Name' onChange={(e) => setUser(prev => ({ ...prev, name: e.target.value }))} required/>
                </div>
                <div className='input-div email-div'>
                  <label htmlFor="email">Email address</label>
                  <input id='email' type="email" value={user.email} placeholder='Email' disabled />
                  <div className='info-msg'>You can't change your email.</div>
                </div>
                <div className='input-div'>
                  <label htmlFor="country">Country</label>
                  <input id='country' type="text" value={user.country} placeholder='Country' onChange={(e) => setUser(prev => ({ ...prev, country: e.target.value }))}/>
                </div>
                <div className='input-div'>
                  <label htmlFor="phone-num">Phone number</label>
                  <input id='phone-num' type="tel" value={user.phoneNumber} placeholder='Phone number' onChange={(e) => setUser(prev => ({ ...prev, phoneNumber: e.target.value }))} />
                </div>
              </div>
            </div>
            <div className='info'>
              <h2>Password</h2>
              <div className='inputs-container'>
                <div className='input-div'>
                  <label htmlFor="curr-pwd">Current password</label>
                  <div className='wrapper'>
                    <input id='curr-pwd' type="password" placeholder='Current password' />
                    <MdOutlineRemoveRedEye className='icon'/>
                  </div>
                </div>
                <div className='input-div'>
                  <label htmlFor="new-pwd">New password</label>
                  <div className='wrapper'>
                    <input id='new-pwd' type="password" placeholder='New password' />
                    <MdOutlineRemoveRedEye className='icon'/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='profile-image-container'>
            <h2>Profile image</h2>
            <p className='subheader'>Image must be at least 500x500px and no larger than 5mb</p>
            <img src={user.profileImage ? user.profileImage : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'} alt="profile-image" />
            <button className='image-btn'><LuUpload className='icon'/><label htmlFor="file" style={{ cursor: 'pointer'}}>Choose image</label></button>
            <input id='file' type="file" accept='image/png, image/jpg, image/jpeg' style={{ display: 'none'}}/>
          </div>
        </div>
        <div className='btns-container'>
          <button className='delete-btn'><TiUserDeleteOutline className='icon' />Delete account</button>
          <button className='save-btn'><LuSave className='icon'/>Save changes</button>
        </div>
      </main>
    </section>
  )
}

export default Settings
