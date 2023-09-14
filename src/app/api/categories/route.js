import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";

export async function GET(){
    const response = await conn.query('SELECT * FROM categories');
     return NextResponse.json(response);
    }

export async function POST(request){
    try {
        const {name,description} = await request.json();
    const newCategory = await conn.query('INSERT INTO categories SET ?', {name,description});
    
    return NextResponse.json({
        status: 200,
        id:newCategory.insertId,
        name,
        description
    });
    } catch (error) {
        console.log(error);
        return NextResponse.json({status: 500, message: error.sqlMessage});
        
    }
    }