"use server";

import { db } from "@/config/db";


export const getProducts = async ()=>{
  return await db.product.findMany({}) || []
}