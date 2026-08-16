import React from 'react'
import { useParams } from 'react-router-dom'

function Products() {
  let {slug} = useParams()

  return (
    <div>{slug}</div>
  )
}

export default Products
