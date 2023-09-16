import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";
import { writeFile, unlink } from "fs/promises";
import path from "path";
import cloudinary from "@/libs/cloudinary";

export async function GET() {
  try {
    const response = await conn.query("SELECT * FROM products");
    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    return new Response(error.sqlMessage, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.formData();

    if (
      !data.get("name") ||
      !data.get("price") ||
      !data.get("description") ||
      !data.get("image") ||
      !data.get("category_id")
    )
      return new Response("Todos los campos son obligatorios", { status: 400 });

    // converting image to buffer to upload to cloudinary
    const bytes = await data.get("image").arrayBuffer();
    const buffer = Buffer.from(bytes);

    // uploading image to cloudinary
    const response = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ resource_type: "image" }, async (error, result) => {
          if (error) reject(error);
          resolve(result);
        })
        .end(buffer);
    });
    console.log(response);
    // saving data into database
    const res = await conn.query("INSERT INTO products SET ?", {
      name: data.get("name"),
      price: data.get("price"),
      description: data.get("description"),
      category_id: data.get("category_id"),
      image: response.secure_url,
      cloudinary_id: response.public_id,
    });

    return NextResponse.json({
      success: true,
      message: "Producto creado exitosamente",
    });
  } catch (error) {
    console.log(error);
    return new Response(error.sqlMessage, { status: 500 });
  }
}
