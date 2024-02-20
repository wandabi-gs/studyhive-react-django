import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation, useQuery } from 'react-query'
import { groupsQuery, userGroupsQuery } from '../../query/chat'
import Loader from '../Loader'

function GroupChats() {

  const [groups, setGroups] = useState([])
  const { isLoading: groupsLoading } = useQuery('groups', groupsQuery, {
    onSuccess: (data) => {
      setGroups(data)
    },
    onError: (error) => {
      console.log(error)
    }
  })


  const [userGroups, setUserGroups] = useState([])
  const { isLoading: userGroupsLoading } = useQuery('user-groups', userGroupsQuery, {
    onSuccess: (data) => {
      setUserGroups(data)
    },
    onError: (error) => {
      console.log(error)
    }
  })

  const { isLoading: joiningGroup } = useMutation('join-group')

  if (groupsLoading || userGroupsLoading) {
    return <Loader />
  }
  return (
    <div>
      <div className="mb-3 flex justify-between">
        <h3 className='text-2xl text-indigo-400'>Study Groups</h3>
        <Link to='/create-group' className='bg-indigo-500 text-white rounded-full px-5 py-2'>Create Group</Link>
      </div>
      <hr />
      <div className="flex flex-wrap mt-3">
        {userGroups.map((group, index) => (
          <div className='basis-1/4 p-3 flex flex-col' key={index}>
            <div className='border p-2 rounded-lg flex-grow flex flex-col justify-between'>
              <div>
                <p className='uppercase font-semibold text-indigo-200'>{group.name}</p> 
                <p className='text-base'>{group.description}</p>
              </div>

              <div className='mt-4'>
                <h3>Interests</h3>
                <div className="mt-1 flex flex-wrap">
                  {group.interests.map((interest, index) => {
                    if (index < 5) {
                      return (
                        <Link to={`/interest/${interest.uid}`} key={index} className='min-w-fit bg-indigo-500 text-white rounded-full px-3 py-1 mr-2 mb-2'>{interest.name}</Link>
                      )
                    }
                  })}
                </div>
              </div>

              <div>
                <hr className='mt-2' />
                <div className='flex justify-between mt-3'>
                  {group.private ? <p>Private Group</p> :
                    <Link to={`/group-chat/${group.uid}`} className='bg-indigo-500 text-white rounded-full px-3 py-1'>View Group</Link>
                  }
                  <button className='bg-green-600 text-white rounded-full px-3 py-1'>Join {group.private ? "Request" : "Group"}</button>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GroupChats