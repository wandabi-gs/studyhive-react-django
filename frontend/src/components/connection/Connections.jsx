import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { acceptConnectionMutation, addConnectionMutation, removeConnectionMutation, revokeConnectionMutation } from '../../mutation/user';
import { profileQuery, recommendedUsers, userConnections } from '../../query/user'
import { MEDIA_URL } from '../../backend'
import { Link } from 'react-router-dom'
import Loader from '../Loader';

function Connections() {
  const queryClient = useQueryClient()
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  const [loading, setLoading] = useState(false)

  const [connections, setConnections] = useState([])
  const { isLoading: connectionLoading } = useQuery("connections", userConnections, {
    onSuccess: (data) => {
      setConnections(data)
    },
  })

  const [profile, setProfile] = useState()

  const { isLoading: profileLoading } = useQuery("user-profile", profileQuery, {
    onSuccess: (data) => {
      setProfile(data)
    }
  })

  const [users, setUsers] = useState([])
  const { isLoading } = useQuery("recommended-users", recommendedUsers, {
    onSuccess: (data) => {
      setUsers(data)
    }
  })

  const { mutate: AddConnectionMutation } = useMutation(addConnectionMutation, {
    onSuccess: (data) => {
      console.log(data)
      queryClient.invalidateQueries("connections")
    }
  })

  const addconnection = (uid) => async (event) => {
    setLoading(true)
    await sleep(1500)
    AddConnectionMutation(uid)
    setLoading(false)
  }

  const { mutate: RemoveConnectionMutation } = useMutation(removeConnectionMutation, {
    onSuccess: (data) => {
      console.log(data)
      queryClient.invalidateQueries("connections")
    }
  })

  const remove_connection = (uid) => async (event) => {
    setLoading(true)
    await sleep(1500)
    RemoveConnectionMutation(uid)
    setLoading(false)
  }

  const { mutate: AcceptConnectionMutation } = useMutation(acceptConnectionMutation, {
    onSuccess: (data) => {
      console.log(data)
      queryClient.invalidateQueries("connections")
    }
  })

  const acceptConnection = (uid) => async (event) => {
    setLoading(true)
    await sleep(1500)
    AcceptConnectionMutation(uid)
    setLoading(false)
  }

  const { mutate: RevokeConnectionMutation } = useMutation(revokeConnectionMutation, {
    onSuccess: (data) => {
      console.log(data)
      queryClient.invalidateQueries("connections")
    }
  })

  const revokeConnection = (uid) => async (event) => {
    setLoading(true)
    await sleep(1500)
    RevokeConnectionMutation(uid)
    setLoading(false)
  }

  if (loading || isLoading || profileLoading || connectionLoading) return (<Loader />)

  return (
    <div>
      <p className='text-2xl'>My Connections</p>
      <div className='flex flex-wrap'>
        {connections.length > 0 ? connections.map((connection, index) => {
          const uconnection = profile.uid == connection.user.uid ? connection.connection : connection.user
          return (
            <div key={index} className='p-4 basis-1/3 flex flex-col justify-stretch'>
              <div className="border-2 border-indigo-500 p-3 rounded-lg flex-grow">
                <div className="flex justify-between">
                  <img src={`${MEDIA_URL}/${uconnection.image}`} alt="" className='w-40 rounded-full' />
                  <div className="flex flex-col justify-center ml-4">
                    <p className='mb-2 text-indigo-300'>{connection.connectionStatus.toLowerCase()}</p>
                    <p>{uconnection.username}</p>
                    <p>{uconnection.email}</p>
                    <p className='font-semibold'>{uconnection.private ? "private" : "public"} account</p>
                    {connection.connectionStatus.toLowerCase() == "pending" ?
                      <div>
                        {connection.connection.uid == profile.uid ?
                          <div className="flex justify-between mt-3">
                            <button onClick={acceptConnection(connection.uid)} className='profile-link text-green-400 mr-3'>accept</button>
                            <button onClick={revokeConnection(connection.uid)} className='profile-link text-red-400 ml-3'>revoke</button>
                          </div>
                          :
                          
                          <button onClick={remove_connection(connection.uid)} className='profile-link w-full mt-3 text-red-400 mr-3'>cancel</button>
                        }
                      </div>
                      : ""
                    }
                  </div>
                </div>
              </div>
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
                      <Link to={'/user/' + user.uid} className='profile-link mr-3'>view</Link>
                      <button onClick={addconnection(user.uid)} className='profile-link ml-3'>request</button>
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