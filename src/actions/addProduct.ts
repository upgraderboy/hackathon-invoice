"use server";
import { db } from "@/config/db";
import { AddProductSchema } from "@/schemas";
import * as z from "zod";
export const addProduct = async (values: z.infer<typeof AddProductSchema>)=>{
  const validatedFields = AddProductSchema.safeParse(values);
  if(!validatedFields.data) return {
    error: "Invalid Product!"
  }
  const {id, product_name, quantity, price, category} = validatedFields.data;
  if(!id) return {
    error: "Invalid ID!"
  }
  const existingId = await db.product.findFirst({
    where: {
      id: validatedFields.data.id
    }
  });
  if(existingId) return {
    error: "ID Already Exist!",
  }
  let in_stock: boolean;
  if(quantity > 0) in_stock = true;
  else in_stock = false;
  const productAdded = await db.product.create({
    data: {
      id, product_name, quantity, in_stock, price, category
    }
  })
  if(!productAdded) return {
    error: "Error Returned!"
  }
  return {
    success: "Item successfully added!"
  };
}