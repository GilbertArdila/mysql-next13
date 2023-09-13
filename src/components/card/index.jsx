import Link from "next/link"

const Card = ({product}) => {
  return (
    <Link href={`/products/${product.id}`}
        className="bg-white rounded-lg border-gray-800 mb-3 p-4 hover:bg-gray-100 hover:cursor-pointer">
            <h1 className="text-lg font-bold ">{product.name}</h1>
            <p className="text-2xl text-slate-600">{product.description}</p>
            <p>{product.price}</p>
        </Link>
  )
}

export default Card