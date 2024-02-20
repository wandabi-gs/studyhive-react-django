import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { groupQuery } from '../../query/chat'
import Loader from '../Loader'

function Group() {

  const params = useParams()

  const [group, setGroup] = useState({})

  const { isLoading: groupLoading } = useQuery('group', () => groupQuery(params.pk), {
    onSuccess: (data) => {
      setGroup(data)
    },
    onError: (error) => {
      console.log(error)
    }
  })

  if (groupLoading) {
    return <Loader />
  }

  return (
    <div>
      {Object.keys(group).length > 0 && (
        <div>
          {group?.name}
          
        </div>
      )}
    </div>
  )
}

export default Group