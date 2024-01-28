import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { recommendedUsers, userConnections } from '../../query/user'
import { MEDIA_URL } from '../../backend'
import { Link } from 'react-router-dom'

function Connections() {
  const [loading, setLoading] = useState(false)

  const [connections, setConnections] = useState([])
  const {} = useQuery("connections", userConnections, {
    onSuccess : (data) =>{
      setConnections(data)
    },
  })

  const [users, setUsers] = useState([])
  const { isLoading } = useQuery("recommended-users", recommendedUsers, {
    onSuccess: (data) => {
      setUsers(data)
    }
  })

  return (
    <div>
    <p className='text-2xl'>My Connections</p>
      <div>
        {connections.length > 0 ? connections.map((connection, index) => {
          return (
            <div key={index} className='p-4 basis-1/3'>
              {connection.uid}
            </div>
          )
        }) : 
          <div>
            Add connections to interact with like-minded individuals
          </div>
        }
      </div>

      <div className="mt-6">
        <p className='text-2xl'>Recommended Users</p>
        <div className='flex flex-wrap'>
          {users.map((user, index) => (
            <div key={index} className='p-4 basis-1/3'>
              <div className="border-2 border-indigo-500 p-3 rounded-lg">
                <div className="flex justify-between">
                  <img src={`${MEDIA_URL}/${user.image}`} alt="" className='w-40 rounded-full' />
                  <div className="flex flex-col justify-center ml-4">
                    <p>{user.username}</p>
                    <p>{user.email}</p>
                    <p className='font-semibold'>{user.private ? "private" : "public"} account</p>
                    <div className="flex justify-between mt-3">
                      <Link to="" className='profile-link'>view</Link>
                      <button className='profile-link'>request</button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Connections