import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useNavigate } from 'react-router-dom'
import { faUser, faEnvelope, faEye, faEyeSlash, faLock } from '@fortawesome/free-solid-svg-icons'
import { faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons'
import { useMutation } from "react-query";
import { UserLogin } from "../../mutation/user";
import useAuthStore from "../../store/auth";

function Login() {
  const navigate = useNavigate();

  const login = useAuthStore((state) => state.login);

  const [input, setInput] = useState({
    username: "",
    password: ""
  });

  const [error, setError] = useState(null);

  const { username, password } = input;

  const ChangeInput = (name) => (event) => {
    setInput({ ...input, [name]: event.target.value })
  }

  const [passwordShown, setPasswordShown] = useState(false)
  const TogglePassword = (event) => {
    setPasswordShown(!passwordShown)
  }

  const { mutate, isLoading } = useMutation(UserLogin, {
    onSuccess: (data) => {
      login(data)
      navigate('/')
    }, onError: (error) => {
      setError("Invalid login credentials")
    }
  });

  const postForm = (event) => {
    event.preventDefault();
    if (username.trim().length == 0 || password.length == 0) {
      setError("Please fill out all fields")
      return;
    }
    mutate({ "password": password, "email": username });
  }

  return (
    <div className="mt-10 flex justify-center">
      <form className="basis-3/12 p-4" onSubmit={postForm}>
        <div className="">
          <p className='form-header'>Login to Your Acccount</p>
          <p className='text-center'>Don't have an account? <Link className='form-link' to="/register">Sign up</Link></p>
          {error && (<p className='m-3 text-center input-error'>{error}</p>)}
        </div>

        <div className="control mt-5">
          <label htmlFor="username" className="form-label">Email</label>
          <div className="input-control">
            <input type="text" id='username' value={username} onChange={ChangeInput('username')} className="input peer" placeholder='Your email' />
            <FontAwesomeIcon icon={faUser} className='icon-start' />
          </div>
        </div>

        <div className="control">
          <label htmlFor="password" className="form-label">Password</label>
          <div className="input-control">
            <input id='password' type={passwordShown ? "text" : "password"} value={password} onChange={ChangeInput('password')} className="input peer" placeholder='Your password' />
            <FontAwesomeIcon icon={faLock} className='icon-start' />
            <FontAwesomeIcon onClick={TogglePassword} icon={passwordShown ? faEyeSlash : faEye} className='icon-end' />
          </div>
        </div>

        <div className="flex justify-end control">
          <button type="submit" className='form-button'>Login</button>
        </div>

        <div className="control">
          <p className='text-2xl text-center'>Or</p>
        </div>


        <div className="control">
          <button className="social-button">
            <FontAwesomeIcon icon={faGoogle} className='mx-4' />
            Continue with Google
          </button>

          <button className="social-button mt-4">
            <FontAwesomeIcon icon={faGithub} className='mx-4' />
            Continue with Github
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login