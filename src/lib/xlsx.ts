import { data } from "@/data/products";
import xlsx, {IJsonSheet} from "json-as-xlsx"
export function downloadToExcel(){
  const columns: IJsonSheet[] = [
    {
      sheet: "Product",
      columns: [
        {
          label: "Product ID",
          value: "product_id"
        },
        {
          label: "Product Name",
          value: "product_name"
        },
        {
          label: "Product Quantity",
          value: "quantity"
        },
        {
          label: "Product Price",
          value: "price"
        },
        {
          label: "Available",
          value: "in_stock"
        },
        {
          label: "Time",
          value: (row)=> new Date(row.time as Date).toLocaleDateString()
        },
      ],
      content: data
    }
  ];
  const settings = {
    fileName: "Product List"
  }
  xlsx(columns, settings)
}