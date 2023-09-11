 import { NextResponse } from "next/server";
 import { conn } from "@/libs/mysql";

 export async function GET(){
  try {
    const response = await conn.query('SELECT * FROM products');
    console.log(response)
     return new Response(JSON.stringify(response), {status: 200})
  } catch (error) {
    return new Response(error.sqlMessage, {status: 500})
  }
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
    return new Response(error.sqlMessage, {status: 500})
    
  }
}