"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Product } from "@/data/products";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit, MoreHorizontal, Trash } from "lucide-react";

export const columns: ColumnDef<Product>[] = [
  {
    id: 'Select',
    header: ({ table }) => {
      return (<Checkbox checked={table.getIsAllPageRowsSelected()} className="outline outline-1" onCheckedChange={(value) => {
        table.toggleAllPageRowsSelected(!!value)
      }} />)
    },
    cell: ({ row }) => {
      return (<Checkbox checked={row.getIsSelected()} className="outline outline-1" onCheckedChange={(value) => {
        row.toggleSelected(!!value)
      }} />)
    },
    accessorKey: "id",
    enableSorting: false,
    enableHiding: false
  },
  {
    header: ({ column }) => {
      return (
        <Button variant={"ghost"} onClick={() => {
          column.toggleSorting(column.getIsSorted() === "asc")
        }}>
          Product ID <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    accessorKey: "id",
  },
  {
    header: ({ column }) => {
      return (
        <Button variant={"ghost"} onClick={() => {
          column.toggleSorting(column.getIsSorted() === "asc")
        }}>
          Product Name <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    accessorKey: "product_name"
  },
  {
    header: ({ column }) => {
      return (
        <Button variant={"ghost"} onClick={() => {
          column.toggleSorting(column.getIsSorted() === "asc")
        }}>
          Price <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    accessorKey: "price"
  },
  {
    header: ({ column }) => {
      return (
        <Button variant={"ghost"} onClick={() => {
          column.toggleSorting(column.getIsSorted() === "asc")
        }}>
          Quantity <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    accessorKey: "quantity"
  },
  {
    header: ({ column }) => {
      return (
        <Button variant={"ghost"} onClick={() => {
          column.toggleSorting(column.getIsSorted() === "asc")
        }}>
          Available <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    accessorKey: "in_stock"
  },
  // {
  //   header: ({ column }) => {
  //     return (
  //       <Button variant={"ghost"} onClick={() => {
  //         column.toggleSorting(column.getIsSorted() === "asc")
  //       }}>
  //         Time <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     )
  //   },
  //   accessorKey: "time",
  //   cell: ({ row }) => {
  //     const time = row.getValue("time");
  //     const formatted = new Date(time as string).toLocaleDateString()
  //     return <div className="font-medium">{formatted}</div>
  //   }
  // },
  {
    id: "Actions",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <MoreHorizontal />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => {
              navigator.clipboard.writeText(product.id.toString() + " , " + product.product_name.toString() + " , " + product.price.toString() + " , " + product.quantity.toString() + " , " + product.in_stock.toString())
            }}>
              Copy Product
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Trash /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  },
];