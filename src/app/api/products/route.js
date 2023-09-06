 import { NextResponse } from "next/server";
 import { conn } from "@/libs/mysql";

 export async function GET(){
   const response = await conn.query('SELECT NOW()');
   console.log(response)
    return NextResponse.json({message: 'hello from get'});
 }

 
