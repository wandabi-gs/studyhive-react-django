import React from 'react'
import { useParams } from 'react-router-dom'

function Category() {

    const params = useParams();

  return (
    <div>Category : {params.pk}</div>
  )
}

export default Category