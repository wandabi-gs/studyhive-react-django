import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { userConnections } from '../../query/user'

function Connections() {

  const [connections, setConnections] = useState([])

  const { isLoading } = useQuery("connections", userConnections, {
    onSuccess : (data) =>{
      console.log(data)
    }
  })

  return (
    <div>Connections</div>
  )
}

export default Connections