import React from 'react'
import DataTable from "@/components/data-table";
import { columns } from './columns';
import { getProducts } from '@/actions/getProducts';



const Product = async () => {
  const data = await getProducts();
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
export default Product;