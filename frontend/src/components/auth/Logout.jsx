import React, { useEffect } from 'react'
import useAuthStore from "../../store/auth";
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate()

    // window.location.reload();

    const logout = useAuthStore((state) => state.logout)

    useEffect(() => {
        logout();
        navigate("/")
    }, [])

  return (
    <div>Logging out .....</div>
  )
}

export default Logout