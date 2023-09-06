 import { NextResponse } from "next/server";

 export function GET(){
    return NextResponse.json({ message: "Hello from the API!" });
 }

 export function POST(){
    return NextResponse.json({ message: "Hello from POST method" });
 }
