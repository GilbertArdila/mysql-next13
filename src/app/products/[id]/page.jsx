import axios from "axios"

async function fetchProduct(id) {
    const { data } = await axios.get(`http://localhost:3000/api/products/${id}`);
    return data;
}

async function Item({ params }) {
    const product = await fetchProduct(params.id);

    return (
        <section className="flex justify-center item-center">
            <div className="flex flex-col bg-white rounded-lg border-gray-800 mb-3 p-6 text-black">
                <h1 className="text-2xl font-bold ">{product.name}</h1>
                <p >Name: {product.description}</p>
                <p className="text-lg text-slate-600">{product.description}</p>
                <p >$ {product.price}</p>
                <p>Category: {product.category_id}</p>
                <button className="bg-red-500 hover:bg-red-700 py-2 px-3 rounded-lg my-2">delete</button>
                <button className="bg-yellow-500 hover:bg-yellow-700 py-2 px-3 rounded-lg">edit</button>
            </div>
            </section>
    )
}

export default Item