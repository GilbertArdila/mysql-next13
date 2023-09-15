'use client'
import React, { useRef, useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import axios from 'axios'

import Button from '../button'

const form = () => {
  const [product, setProduct] = useState({ name: '', price: 0, description: '', category_id: 1 })
  //state to show the right button depending on the action
  const [isUpdatable, setIsUpdatable] = useState(false);
  // state for storing selected image
  const [file, setFile] = useState(null);
  const form = useRef(null);
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      async function getProduct() {
        const response = await axios.get(`/api/products/${id}`)
        setProduct(response.data)
        setIsUpdatable(true)
      }
      getProduct()

    }

  }, [id])

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', product.price);
    formData.append('description', product.description);
    formData.append('category_id', product.category_id);
    if (file) {
      formData.append('image', file);
    }
    // if id is not present, it means we are creating a new product
    if (!id) {
      const res = await axios.post('/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
     // updating product
    } else {
      const res = await axios.put(`/api/products/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

    }
    form.current.reset()
    router.refresh()
    router.push('/')


  }

  return (

    <form
      className='bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4 mt-8 '
      onSubmit={handleSubmit}
      ref={form}>

      <label htmlFor="name" className='block text-gray-700 text-sm font-bold mb-2'>Name</label>
      <input type="text"
        autoFocus
        className="shadow appearance-none border rounded w-full py-2 px-3 hover:border-2 hover:border-blue-500 text-black" name="name" onChange={handleChange} value={product.name} />


      <label htmlFor="price" className='block text-gray-700 text-sm font-bold mb-2'>Price</label>
      <input type="number" className="shadow appearance-none border rounded w-full py-2 px-3 hover:border-2 hover:border-blue-500 text-black" name="price" onChange={handleChange} value={product.price} />

      <label htmlFor="image" className='block text-gray-700 text-sm font-bold mb-2'>Image</label>
      <input
        type="file"
        className="shadow appearance-none border rounded w-full py-2 px-3 hover:border-2 hover:border-blue-500 text-black"
        onChange={(e) => {
          setFile(e.target.files[0])
        }}
      />


      <label htmlFor="description" className='block text-gray-700 text-sm font-bold mb-2'>Description</label>
      <textarea rows={3} className="shadow appearance-none border rounded w-full py-2 px-3 hover:border-2 hover:border-blue-500 text-black" name="description" onChange={handleChange} value={product.description} />





      <label htmlFor="category_id" className='block text-gray-700 text-sm font-bold mb-2'>Category</label>
      <select className="shadow appearance-none border rounded w-full py-2 px-3 hover:border-2 hover:border-blue-500 text-black" name="category_id" onChange={handleChange} value={product.category_id}>
        <option value={1}>Category 1</option>
        <option value={2}>Category 2</option>
        <option value={3}>Category 3</option>
      </select>

      <Button color='primary' message={isUpdatable ? 'Update' : 'Create'} action={false} />
      
      {file && (
        <img
          className='w-72 md:w-96 mt-6 py-2 px-4 rounded mx-auto'
          src={URL.createObjectURL(file)} alt='imagen' />
      )}

    </form>


  )
}

export default form