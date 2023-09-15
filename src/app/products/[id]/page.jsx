import axios from "axios";
import Image from "next/image";


import Button from "@/components/button";

async function fetchProduct(id) {
    const { data } = await axios.get(`http://localhost:3000/api/products/${id}`);
    return data;
}

async function Item({ params }) {
    const product = await fetchProduct(params.id);
    
    if (product.status === 404) {
        return <div>product not found</div>
    }

    return (

        <section className="flex justify-center item-center w-full h-full mt-10 ">
            <div className="flex flex-col bg-white rounded-lg border-gray-800 mb-3 p-6 text-black">
                <h1 className="text-2xl font-bold ">{product.name}</h1>
                <p >Name: {product.description}</p>
                <p className="text-lg text-slate-600">{product.description}</p>
                <p >$ {product.price}</p>
                <p>Category: {product.category_id}</p>
                <Image src={product.image} alt={product.name} width={'200'} height={'200'} className="w-full h-80 object-fit mb-3 border-2 border-blue-500 rounded-lg" />
                <Button productId={product.id} color="danger" message="delete" action={'delete'}/>
                <Button productId={product.id} color="warning" message="edit" action={'edit'} />
            </div>
            </section>
    )
}

export default Item