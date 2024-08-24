import React from 'react'

const page = ({params}) => {
  return (
    <div>
      <h1>{params.videoid}</h1>
    </div>
  )
}

export default page