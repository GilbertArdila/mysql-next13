'use client'
import axios from "axios"
import { useRouter } from "next/navigation"

const Button = ({productId,color,message,action}) => {

    const router = useRouter();

  async function handleOnClick  ()  {
    if (action === "delete") {
      if(confirm("Are you sure?")) {
        await axios.delete(`http://localhost:3000/api/products/${productId}`)
        .catch(err => {
          alert(err)
        })
        router.push('/products')
        router.refresh()
      }
    }
    else if (action === "edit") {
        router.push(`/products/edit/${productId}`)
    }
    }

  return (
    <button 
    className={`bg-${color}-500 hover:bg-${color}-700 py-2 px-3 rounded-lg my-2`}
    onClick={handleOnClick}
    >{message}</button>
  )
}

export default Button