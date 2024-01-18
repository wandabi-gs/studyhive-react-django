import React, { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { profileQuery } from '../query/user';
import useThemeStore from '../store/theme'
import { TogglePrivate, changePassword } from '../mutation/user';
import { useNavigate } from 'react-router-dom';

function Settings() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const is_authenticated = useThemeStore((state) => state.IsAuthenticated)

  const [profile, setProfile] = useState()

  const [email, setEmail] = useState("")

  const { isLoading: profileLoading } = useQuery("user-profile", profileQuery, {
    onSuccess: (data) => {
      setProfile(data)
      setEmail(data?.email)
    },
  })

  const [passwords, setPasswords] = useState({
    current_password: "",
    new_password: "",
  })

  const { current_password, new_password } = passwords;
  const ChangePassword = (name) => (event) => {
    setPasswords({ ...passwords, [name]: event.target.value })
  }

  const { mutate: change_password_mutation } = useMutation(changePassword, {
    onSuccess: (data) => {
      if(!data.success){
        setPasswordError(data.error.message)
      }else{
        navigate("/logout")
      }
    },
    onError: (data) => {
      setPasswordError("An error occured.Try again later")
    }
  })

  const change_password = (event) => {
    event.preventDefault();
    setPasswordError(null)
    change_password_mutation({oldPassword : current_password, newPassword:new_password})
  }
  
  const { mutate: toggleVisisbiltyMutation } = useMutation(TogglePrivate)

  const ToggleVisibility = (event) => {
    toggleVisisbiltyMutation();
  }

  const [passwordError, setPasswordError] = useState(null)
  useEffect(() => {
    queryClient.invalidateQueries('user-profile')
  }, [is_authenticated])

  return (
    <div className="flex justify-center">
      <div className='basis-1/3'>
        {profile && (
          <div>
            <div className='rounded p-3'>
              <div>
                <h3 className="text-xl font-semibold mt-5 mb-2">Profile Information</h3>
                <hr className="my-3 border-black dark:border-white" />
                <div className="control">
                  <input type="text" autoComplete='off' readOnly defaultValue={profile?.username} id="username" className="select-none profile-input" />
                </div>

                <div className="control">
                  <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} id="email" className="profile-input" />
                </div>

                <div className="control">
                  <button className="form-button">Update Profile</button>
                </div>
              </div>
            </div>

            <div className='rounded p-3'>
              <h3 className="text-xl font-semibold mt-5 mb-2">Privacy Settings</h3>
              <hr className="my-3 border-black dark:border-white" />
              <div className="control">

                <label htmlFor="private-account" className="profile-switch-cont">
                  <p className="profile-switch-label">Private Account</p>
                  <input type="checkbox" name="" defaultChecked={profile.private ? true : false} onClick={ToggleVisibility} id="private-account" />
                </label>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={change_password} className='rounded p-3'>
          <h3 className="text-xl font-semibold mt-5 mb-2">Update Password</h3>
          {passwordError && (<p className='m-3 input-error'>{passwordError}</p>)}
          <hr className="my-3 border-black dark:border-white" />
          <div className="control">
            <input type="password" value={current_password} onChange={ChangePassword('current_password')} placeholder='Current Password' id="" className="profile-input" />
          </div>

          <div className="control">
            <input type="password" value={new_password} onChange={ChangePassword('new_password')} placeholder='New Password' id="" className="profile-input" />
          </div>

          <div className="control">
            <button className="form-button">Update Password</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Settings;