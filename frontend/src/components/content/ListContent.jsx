import React from 'react'
import { Link } from 'react-router-dom'

function ListContent() {
  return (
    <div>
      <div className="flex justify-between mb-3">
        <h1 className="text-2xl font-bold">User Content</h1>
        <div>
          <Link to="/user-content/manage" className="btn btn-link">My Content</Link>
        </div>
      </div>
    </div>
  )
}

export default ListContent