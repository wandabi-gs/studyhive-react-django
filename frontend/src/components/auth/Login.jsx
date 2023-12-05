import React from 'react'

function Login() {
  return (
    <div className="mt-10 flex justify-center">
        <div className="shadow bg-white basis-3/12 rounded-md">
            <div className="p-4 -mb-4">
                <p>Login</p>
                <p>Login to access your account</p>
            </div>
            <hr className='hr'/>
            <div className="control">
                <input type="text" className="input" />
            </div>
        </div>
    </div>
  )
}

export default Login