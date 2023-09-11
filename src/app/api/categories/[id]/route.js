import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";

export async function GET(request,{params}){
    try {
        const category = await conn.query('SELECT * FROM categories WHERE id = ?',params.id);  
        if(category.length === 0){
            return NextResponse.json({status: 404, message: "Category not found"});
        }
        return NextResponse.json(category[0]);
        
    } catch (error) {
        return new Response(error.sqlMessage, {status: 500})
        
    }
    }

export async function PUT(request,{params}){
    try {
        const data = await request.json();
        const updatedCategory = await conn.query('UPDATE categories SET ?', [data,params.id]);
        if(updatedCategory.affectedRows === 0){
            return new Response("Category not found", {status: 404})
        }
         const category = await conn.query('SELECT * FROM categories WHERE id = ?',params.id);
        return NextResponse.json(category[0]);

    } catch (error) {
        return new Response(error.sqlMessage, {status: 500})
    }
    }

export async  function DELETE(request,{params}){
    try {
        const deletedCategory = await conn.query('DELETE FROM categories WHERE id = ?',[params.id]);
        if(deletedCategory.affectedRows === 0){
            return new Response("Category not found", {status: 404})
        }
        
        return new Response(null, {status: 204})
    } catch (error) {
        return new Response(error.sqlMessage, {status: 500})
    }
    }