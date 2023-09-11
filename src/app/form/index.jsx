'use client'
import React,{useRef, useState} from 'react'
import axios from 'axios'

const form = () => {
    const [product, setProduct] = useState({name:'',price:0,description:'',image:'',category_id:1})
    const form = useRef(null)

    const handleChange = (e) => {
        setProduct({...product,[e.target.name]:e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await axios.post('/api/products',product)
        form.current.reset()
        console.log(response)
    }
        
  return (
    <form 
    className='bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4 mt-8 '
    onSubmit={handleSubmit}
    ref={form}>
        
            <label htmlFor="name" className='block text-gray-700 text-sm font-bold mb-2'>Name</label>
            <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 hover:border-2 hover:border-blue-500 text-black" name="name" onChange={handleChange} value={product.name} />
        
        
            <label htmlFor="price" className='block text-gray-700 text-sm font-bold mb-2'>Price</label>
            <input type="number" className="shadow appearance-none border rounded w-full py-2 px-3 hover:border-2 hover:border-blue-500 text-black" name="price" onChange={handleChange} value={product.price} />

            <label htmlFor="image" className='block text-gray-700 text-sm font-bold mb-2'>Image</label>
            <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 hover:border-2 hover:border-blue-500 text-black" name="image" onChange={handleChange} value={product.image} />
        
        
            <label htmlFor="description" className='block text-gray-700 text-sm font-bold mb-2'>Description</label>
            <textarea rows={3} className="shadow appearance-none border rounded w-full py-2 px-3 hover:border-2 hover:border-blue-500 text-black" name="description" onChange={handleChange} value={product.description} />
        
        
           
        
       
            <label htmlFor="category_id" className='block text-gray-700 text-sm font-bold mb-2'>Category</label>
            <select className="shadow appearance-none border rounded w-full py-2 px-3 hover:border-2 hover:border-blue-500 text-black" name="category_id" onChange={handleChange} value={product.category_id}>
                <option value={1}>Category 1</option>
                <option value={2}>Category 2</option>
                <option value={3}>Category 3</option>
            </select>

        
       
            <button className="bg-blue-500  hover:bg-blue-700 text-white font-bold w-1/2 mt-6 py-2 px-4 rounded">Save</button>
        
    </form>
  )
}

export default form