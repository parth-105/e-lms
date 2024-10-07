import StudentAssignmentView from '@/component/assignment/StudentAssignmentView'
import React from 'react'

const page = ({params}) => {
  return (
    <div>
      <h1>{params.id}</h1>
      <StudentAssignmentView 
      assignmentid={params.id}
      title="ass"
      description="ass" 
      questionFileUrl="https://firebasestorage.googleapis.com/v0/b/e-learniing-5e7ee.appspot.com/o/pdfs%2Fe-learning.pdf?alt=media&token=68fae3cd-c54f-4598-b1eb-64bd68d6a6a1" />
    </div>
  )
}

export default page
