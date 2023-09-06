import { NextResponse } from "next/server";


export function GET(){
    return NextResponse.json({ message: "Hello from get by id!" });
    }

export function PUT(){
    return NextResponse.json({ message: "Hello from PUT method" });
    }

export function DELETE(){
    return NextResponse.json({ message: "Hello from DELETE method" });
    }