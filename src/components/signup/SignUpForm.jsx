import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiHide } from "react-icons/bi";
import { FcGoogle, FcCheckmark, FcCancel, FcInfo } from "react-icons/fc";
import { useDispatch } from 'react-redux';
import { setAuth } from '../../features/auth/auth';
import { initAxios } from '../../api/axios';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';
 
const SignUpForm = () => {
  const userRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [name, setName] = useState('');
  const [validName, setValidName] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);

  const [password, setPassword] = useState('');
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmValid, setConfirmValid] = useState(false);
  const [confirmPwdFocus, setConfirmPwdFocus] = useState(false);

  const [showPwd, setShowPwd] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setEmailValid(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidName(USER_REGEX.test(name));
  }, [name]);

  useEffect(() => {
    setPasswordValid(PWD_REGEX.test(password));
    setConfirmValid(password === confirmPassword && passwordValid);
  }, [password, confirmPassword]);

  const handleSubmit = async () => {
    // emailValid && validName && passwordValid && confirmValid ? alert('You have signed up!') : alert('Please, follow all the instructions.');
    if (emailValid && validName && passwordValid && confirmValid) {
      try {
        const response = await initAxios.post(REGISTER_URL, JSON.stringify({
          name,
          email,
          password
        }), {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        });
        console.log(JSON.stringify(response?.data));
        const accessToken = response?.data?.accessToken;
        dispatch(setAuth({ isAuth: true, accessToken }));
        setEmail('');
        setName('');
        setConfirmPassword('');
        setPassword('');
        setPasswordValid(false);
        navigate('/');
      } catch (err) {
        if (!err?.response) {
          setErrMsg('No Server Response');
        } else if (err.response?.status === 400) {
          setErrMsg('Missing Username or Password');
        } else if (err.response?.status === 401) {
          setErrMsg('Unauthorized');
        } else {
          setErrMsg('Login Failed');
        }
      }
    }
  };

  return (
    <div className='signup-form-container'>
      <h2>Sign up</h2>
      <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="email">Email</label>
        <div className="wrapper">
          <input
            className='email-input'
            ref={userRef}
            autoComplete='off'
            id='email'
            type="text"
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={emailValid ? "false" : "true"}
            aria-describedby='emailnote'
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
          />
          {emailValid ? <FcCheckmark className='check-mark' /> : <FcCancel className='forbidden-mark' />}
          <p id="emailnote" className={emailFocus && email && !emailValid ? "instructions" : "offscreen"}>
            <FcInfo className='info-icon' />
            Ensure that the input follows <br />
            the standard email format: "localpart@domain.tld".
          </p>
        </div>
        <label htmlFor="name">Name</label>
        <div className="wrapper">
          <input
            className='name-input'
            autoComplete='off'
            id='name'
            type="text"
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={validName ? "false" : "true"}
            aria-describedby='namenote'
            onFocus={() => setNameFocus(true)}
            onBlur={() => setNameFocus(false)}
          />
          {validName ? <FcCheckmark className='check-mark' /> : <FcCancel className='forbidden-mark' />}
          <p id="namenote" className={nameFocus && name && !validName ? "instructions" : "offscreen"}>
            <FcInfo className='info-icon' />
            4 to 24 characters.<br />
            Must begin with a letter.<br />
            Letters, numbers, underscores, hyphens allowed.
          </p>
        </div>
        <label htmlFor="create-password">Create Password</label>
        <div className="wrapper">
          <input
            id='create-password'
            className='pwd-input'
            autoComplete='off'
            type='password'
            placeholder='Create password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setPasswordFocus(true)}
            onBlur={() => setPasswordFocus(false)}
            aria-describedby='pwdnote'
          />
          {passwordValid ? <FcCheckmark className='check-mark' /> : <FcCancel className='forbidden-mark' />}
          <p id="pwdnote" className={passwordFocus && !passwordValid ? "instructions" : "offscreen"}>
            <FcInfo className='info-icon' />
            8 to 24 characters.<br />
            Must include uppercase and lowercase letters, a number and a special character.<br />
            Allowed special characters: 
            <span aria-label="exclamation mark">!</span>
            <span aria-label="at symbol">@</span>
            <span aria-label="hashtag">#</span>
            <span aria-label="dollar sign">$</span>
            <span aria-label="percent">%</span>
          </p>
        </div>
        <label htmlFor="confirm-password">Confirm Password</label>
        <div className='wrapper'>
          <input
            id='confirm-password'
            className='pwd-input'
            autoComplete='off'
            type={showPwd ? 'text' : 'password'}
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onFocus={() => setConfirmPwdFocus(true)}
            onBlur={() => setConfirmPwdFocus(false)}
            aria-describedby='confirmnote'
          />
          <BiHide
            className='show-pwd-icon'
            onClick={() => setShowPwd(prev => !prev)}
          />
          {confirmValid ? <FcCheckmark className='check-mark' /> : <FcCancel className='forbidden-mark' />}
          <p id="confirmnote" className={confirmPwdFocus && !confirmValid ? "instructions" : "offscreen"}>
            <FcInfo className='info-icon' />
            Must match the first password input field.
          </p>
        </div>
        
        <button className='submit-btn' onClick={handleSubmit}>Sign up</button>
      </form>
      <p className='navigation-label'>Already have an account?
        <span><Link className='link' to={'/login'}>Login</Link></span>
      </p>
      <p className='or-label'>Or</p>
      <button className='google-btn'>
        <FcGoogle className='google-icon'/>
        Login with Google
      </button>
    </div>
  )
};

export default SignUpForm;
