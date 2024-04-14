import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { FcGoogle } from "react-icons/fc";
import { initAxios } from '../../api/axios';
import { useDispatch } from 'react-redux';
import { setAuth } from '../../features/auth/auth';

const LOGIN_URL = '/auth';

const LoginForm = () => {
  const userRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const handleSubmit = async () => {
    if (email && password) {
      try {
        const response = await initAxios.post(LOGIN_URL, {
          email,
          password
        }, { withCredentials: true });
        const accessToken = response?.data?.accessToken;
        dispatch(setAuth({ isAuth: true, accessToken }));
        setEmail('');
        setPassword('');
        navigate(from, { replace: true });
      } catch (err) {
        console.log('Error:', err);
        if (!err?.response) {
          setErrMsg('No Server Response');
        } else if (err.response?.status === 400) {
          setErrMsg('Missing Email or Password.');
        } else if (err.response?.status === 401) {
          setErrMsg('Wrong Email or Password');
        } else {
          setErrMsg('Login Failed');
        }
      }
    }
  };

  return (
    <div className='login-form-container'>
      <h2>Login</h2>
      <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="email">Email</label>
        <input
          ref={userRef}
          className='email-input'
          required
          autoComplete='off'
          id='email'
          type="text"
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /> 
        <label htmlFor="password">Password</label>
        <div className='wrapper'>
          <input
            id='password'
            className='pwd-input'
            required
            autoComplete='off'
            type={showPwd ? 'text' : 'password'}
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {showPwd ? 
          <VscEyeClosed
            className='show-pwd-icon'
            onClick={() => setShowPwd(prev => !prev)}
            /> :
          <VscEye
            className='show-pwd-icon'
            onClick={() => setShowPwd(prev => !prev)}
            />
          }
        </div>
        <button className='submit-btn' onClick={handleSubmit}>Login</button>
      </form>
      <p className='navigation-label'>Don't have an account?
        <span><Link className='link' to={'/signup'}>Signup</Link></span>
      </p>
      {/* <p className='or-label'>Or</p>
      <button className='google-btn'>
        <FcGoogle className='google-icon'/>
        Login with Google
      </button> */}
    </div>
  )
};

export default LoginForm;
