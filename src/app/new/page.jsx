import React from 'react'
import Form from '../form/index.jsx'

const NewPage = () => {
  return (
    <div className='flex flex-col justify-center items-center p-6 text-center'>
        <h2 className='my-8 text-2xl font-bold'>Create new product</h2>
        <Form/>
    </div>
  )
}

export default NewPage