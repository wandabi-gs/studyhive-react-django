import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faEnvelope, faEye, faEyeSlash, faLock } from '@fortawesome/free-solid-svg-icons'
import { user_register } from '../../libs/user';
import { Link } from 'react-router-dom';

function Register() {

    const [input, setInput] = useState({
        username : "",
        email : "",
        password : ""
    });

    const {username, email, password} = input;

    const ChangeInput = (name) =>  (event) => {
        setInput({...input, [name] : event.target.value})
    }

    const [passwordShown, setPasswordShown] = useState(false)
    const TogglePassword = (event) =>{
        setPasswordShown(!passwordShown)
    }

    const postForm = (event) => {
        event.preventDefault();
        user_register(input)
        .then(data => {
            console.log(data)
        })
    }
  return (
    <div className="mt-10 flex justify-center">
    <form className="basis-3/12 p-4" onSubmit={postForm}>
        <div className="">
            <p className='form-header'>Create Acccount</p>
            <p className='text-center'>Already have an account? <Link className='form-link' to="/login">sing in</Link></p>
        </div>
        <div className="control mt-5">
            <input type="text" value={username} onChange={ChangeInput('username')} className="input" placeholder='Your name'/>
            <FontAwesomeIcon icon={faUser} className='icon-start' />
        </div>
        <div className="control">
            <input type="text" value={email} onChange={ChangeInput('email')} className="input" placeholder='Your email'/>
            <FontAwesomeIcon icon={faEnvelope} className='icon-start' />
        </div>
        <div className="control">
            <input type={passwordShown ? "text" : "passwordba"} value={password} onChange={ChangeInput('password')} className="input" placeholder='Your password'/>
            <FontAwesomeIcon icon={faLock} className='icon-start' />
            <FontAwesomeIcon onClick={TogglePassword} icon={passwordShown ? faEyeSlash : faEye} className='icon-end' />
        </div>
        <button type="submit">Create Account</button>
    </form>
</div>
  )
}

export default Register