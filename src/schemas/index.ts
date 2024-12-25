import * as z from "zod";


export const AddProductSchema = z.object({
  id: z.string(),
  product_name: z.string(),
  price: z.coerce.number().min(0.01, "Required Min $1"),
  in_stock: z.boolean().default(true),
  quantity: z.number(),
  barCode: z.string({message: "Generate Bar Code First"}),
  category: z.string()
})
