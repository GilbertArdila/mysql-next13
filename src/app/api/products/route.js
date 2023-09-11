 import { NextResponse } from "next/server";
 import { conn } from "@/libs/mysql";

 export async function GET(){
   const response = await conn.query('SELECT * FROM products');
   console.log(response)
    return NextResponse.json(response);
 }

 
export async function POST(request){
  try {
    const {name,description,price,image,category_id} = await request.json();
  const newProduct = await conn.query('INSERT INTO products SET ?', {name,description,price,image,category_id});
  console.log(newProduct);
  return NextResponse.json({
    status: 200,
    id:newProduct.insertId,
    name,
    description,
    price,
    image,
    category_id
  });
  } catch (error) {
    console.log(error);
    return NextResponse.json({status: 500, message: error.sqlMessage});
    
  }
}