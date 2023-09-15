import axios from "axios"
import Card from "@/components/card";

async function fetchProducts  ()  {
  const {data} = await axios.get(`${process.env.BASE_URL}/api/products`);
    return data;
}

async function products  ()  {
    const products =await fetchProducts();
    

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 text-black p-2">
         {products.map((product) => (
          <Card product={product} key={product.id} />
        ))}


    </div>
  )
}

export default products