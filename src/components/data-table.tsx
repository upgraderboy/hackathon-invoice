"use client";
import React, { useEffect, useState } from 'react'
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from './ui/button';
import { Input } from './ui/input';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from './ui/dropdown-menu';
import { ModeToggle } from './ui/ModeToggle';
import { downloadToExcel } from '@/lib/xlsx';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import AddProduct from './AddProducts';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}
export function DataTable<TData, TValue>({
  columns,
  data
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [openProductForm, setOpenProductForm] = useState(false);
  const [openInvoiceForm, setOpenInvoiceForm] = useState(false);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  });
  return (
    <div className='mx-4'>
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="max-w-2xl flex flex-col md:flex-row gap-4 md:gap-0 items-center justify-evenly py-4">
          <Input placeholder="Filter Products" value={table.getColumn('product_name')?.getFilterValue() as string || ""} onChange={(e) => {
            table.getColumn('product_name')?.setFilterValue(e.target.value);
          }} className='max-w-sm outline outline-2 outline-primary' />
          <div className="flex justify-evenly gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={"outline"} className='ml-auto outline outline-2 outline-primary'>
                  Columns
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table.getAllColumns().filter(column => column.getCanHide()).map((column, index) => {
                  return (
                    <DropdownMenuCheckboxItem key={index} className='capitalize' checked={column.getIsVisible()} onCheckedChange={(value: boolean) => {
                      column.toggleVisibility(!!value)
                    }}>
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant={"ghost"} onClick={() => downloadToExcel()} className='outline outline-2 outline-primary'>Export Items</Button>
            <ModeToggle className="outline outline-2 outline-primary" />
          </div>
        </div>
        <div className="flex gap-2">
        <Button variant={"outline"} className='ml-auto outline outline-2 outline-primary' onClick={() => setOpenInvoiceForm(!openInvoiceForm)}>
          Generate Invoice
        </Button>
        <Button variant={"outline"} className='ml-auto outline outline-2 outline-primary' onClick={() => setOpenProductForm(!openProductForm)}>
          Add Product
        </Button>
        </div>
        {openProductForm && (
          <Dialog modal={openProductForm} onOpenChange={() => setOpenProductForm(!openProductForm)} open={openProductForm}>

            <DialogContent className="w-[100vw] h-[90vh]">
              <DialogHeader>
                <DialogTitle>Add Product</DialogTitle>
                <DialogDescription>
                  Add New Product To The Inventory.
                </DialogDescription>
              </DialogHeader>
              <AddProduct />
            </DialogContent>
          </Dialog>
        )}
        {openInvoiceForm && (
          <Dialog modal={openInvoiceForm} onOpenChange={() => setOpenInvoiceForm(!openInvoiceForm)} open={openInvoiceForm}>

            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Generate Invoice</DialogTitle>
                <DialogDescription>
                  Generate Invoice for Customer
                </DialogDescription>
              </DialogHeader>
              <AddProduct />
            </DialogContent>
          </Dialog>
        )}
      </div>
      <div className="rounded-md border outline outline-1 outline-primary">
        <Table >
          <TableHeader>
            {table.getHeaderGroups().map(
              (headerGroup, index) => {
                return (
                  <TableRow key={index}>
                    {headerGroup.headers.map((header, index) => {
                      return (
                        <TableHead key={index} className='text-center'>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                )
              }
            )}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow key={index}>
                  {row.getVisibleCells().map((cell, index) => (
                    <TableCell className='text-center' key={index}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>
                  No Products
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-center gap-4 space-x-2 py-2">
        <Button variant={"secondary"} size={"sm"} onClick={() => {
          table.previousPage()
        }} disabled={!table.getCanPreviousPage()}>
          Prev
        </Button>
        <Button variant={"outline"} size={"sm"} onClick={() => {
          table.nextPage()
        }} disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div>
      <div className="flex-1 text-md text-muted-foreground text-center mt-4">
        {table.getFilteredSelectedRowModel().rows.length} of {' '}
        {table.getFilteredRowModel().rows.length} row{table.getFilteredRowModel().rows.length > 1 ? "s" : ""} selected
      </div>
    </div>
  )
}
export default DataTable;