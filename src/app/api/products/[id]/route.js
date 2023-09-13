import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";

export async function GET(request,{params}){
    try {
        const product = await conn.query('SELECT * FROM products WHERE id = ?',params.id);  
        if(product.length === 0){
            return NextResponse.json({status: 404, message: "Product not found"});
        }
        return NextResponse.json(product[0]);
        
    } catch (error) {
        return new Response(error.sqlMessage, {status: 500})
        
    }
    }

export async function PUT(request,{params}){
    try {
        const data = await request.json();
        const updatedProduct = await conn.query('UPDATE products SET ? WHERE id = ?', [data,params.id]);
        if(updatedProduct.affectedRows === 0){
            return new Response("Product not found", {status: 404})
        }
         const product = await conn.query('SELECT * FROM products WHERE id = ?',params.id);
        return NextResponse.json(product[0]);

    } catch (error) {
        return new Response(error.sqlMessage, {status: 500})
    }
    }

export async  function DELETE(request,{params}){
    try {
        const deletedProduct = await conn.query('DELETE FROM products WHERE id = ?',params.id);
        if(deletedProduct.affectedRows === 0){
            return new Response("Product not found", {status: 404})
        }
        
        return new Response(null, {status: 204})
    } catch (error) {
        return new Response(error.sqlMessage, {status: 500})
    }
    }