import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faEnvelope, faEye, faEyeSlash, faLock } from '@fortawesome/free-solid-svg-icons'
import { useMutation } from "react-query";
import { UserRegister } from "../../mutation/user";
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate()

    const [errors, setErrors] = useState({
        e_username: null,
        e_email: null,
        e_password: null
    })

    const { e_username, e_email, e_password } = errors;

    const [input, setInput] = useState({
        username: "",
        email: "",
        password: ""
    });

    const { username, email, password } = input;

    const ChangeInput = (name) => (event) => {
        setInput({ ...input, [name]: event.target.value })
    }

    const [passwordShown, setPasswordShown] = useState(false)
    const TogglePassword = (event) => {
        setPasswordShown(!passwordShown)
    }


    const { mutate } = useMutation(UserRegister, {
        onError: (error) => {
            console.log(error)
        },
        onSuccess: (response) => {
            if (response?.success) {
                navigate("/login")
            } else {
                var b_error = response.error;
                if (b_error.field == "username") {
                    setErrors({ e_username: b_error.message })
                } else if (b_error.field == "email") {
                    setErrors({ e_email: b_error.message })
                } else {
                    setErrors({ e_password: b_error.message })
                }
            }
        }
    });

    const postForm = (event) => {
        event.preventDefault();
        setErrors({ e_email: null, e_password: null, e_username: null })
        mutate({ "password": password, "email": email, "username": username });
    }

    return (
        <div className="mt-10 flex justify-center">
            <form className="basis-3/12 p-4" onSubmit={postForm}>
                <div className="">
                    <p className='form-header'>Create Acccount</p>
                    <p className='text-center'>Already have an account? <Link className='form-link' to="/login">Sign in</Link></p>
                </div>

                <div className="control mt-5">
                    <label htmlFor="username" className="form-label">Username</label>
                    <div className="input-control">
                        <input id='username' type="text" value={username} onChange={ChangeInput('username')} className="input peer" placeholder='Your name' />
                        <FontAwesomeIcon icon={faUser} className='icon-start' />
                    </div>
                    {e_username && (<p className='input-error'>{e_username}</p>)}
                </div>

                <div className="control">
                    <label htmlFor="email" className="form-label">Email</label>
                    <div className="input-control">
                        <input id='email' type="text" value={email} onChange={ChangeInput('email')} className="input peer" placeholder='Your email' />
                        <FontAwesomeIcon icon={faEnvelope} className='icon-start' />
                    </div>
                    {e_email && (<p className='input-error'>{e_email}</p>)}
                </div>

                <div className="control">
                    <label htmlFor="password" className="form-label">Password</label>
                    <div className="input-control">
                        <input id='password' type={passwordShown ? "text" : "password"} value={password} onChange={ChangeInput('password')} className="input peer" placeholder='Your password' />
                        <FontAwesomeIcon icon={faLock} className='icon-start' />
                        <FontAwesomeIcon onClick={TogglePassword} icon={passwordShown ? faEyeSlash : faEye} className='icon-end' />
                    </div>
                    {e_password && (<p className='input-error'>{e_password}</p>)}
                </div>

                <div className="flex justify-end">
                    <button type="submit" className='form-button'>Create Account</button>
                </div>
            </form>
        </div>
    )
}

export default Register