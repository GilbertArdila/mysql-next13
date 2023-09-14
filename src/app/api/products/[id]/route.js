import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";
import {writeFile,unlink} from 'fs/promises'
import path from "path";
import cloudinary from "@/libs/cloudinary";


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
        const data = await request.formData();

        if(!data.get('name') || !data.get('price') || !data.get('description') ||  !data.get('category_id')) return new Response('Todos los campos son obligatorios', {status: 400})
       
// objeto con los datos actualizados
        const updatedProduct = {
            name: data.get('name'),
            price: data.get('price'),
            description: data.get('description'),
            category_id: data.get('category_id')
      }
      

      // si existe la nueva imagen  
    if(data.get('image')){
        const bytes = await data.get('image').arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filePath = path.join(process.cwd(), 'public', data.get('image').name)
        await writeFile(filePath, buffer);
        const imageUrl = await cloudinary.uploader.upload(filePath);
        //añadimos la imagen al objeto updatedProduct
        updatedProduct.image = imageUrl.secure_url;
         //eliminamos la imagen del servidor
        if(imageUrl){
            await unlink(filePath);
        }
    }
    
     const response = await conn.query('UPDATE products SET ? WHERE id = ?',[updatedProduct,params.id]);
      
      if(response.affectedRows === 0){
        return new Response("Product not found", {status: 404})
      }

      return NextResponse.json({
        success: true,
        message: 'Producto actualizado exitosamente'
      })

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