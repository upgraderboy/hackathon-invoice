"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddProductSchema } from "@/schemas";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { addProduct } from "@/actions/addProduct";
import { useBarcode } from 'next-barcode';
import { FormError } from "./FormErr";
import { FormSuccess } from "./FormSuccess";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ChangeEvent, useRef, useState, useTransition } from "react";
import { Button } from "./ui/button";
import CardWrapper from "./CardWrapper";
import MoneyInput from "./ui/money-input";


const AddProduct = () => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [websiteDomain, setWebsiteDomain] = useState('')
  const [isPending, startTransition] = useTransition();
  const barcodeRef = useRef('');
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const form = useForm<z.infer<typeof AddProductSchema>>({
    resolver: zodResolver(AddProductSchema),
    defaultValues: {
      id: "",
      product_name: "",
      price: 0,
      quantity: 1, // Add default value
      in_stock: true,
      barCode: ""
    },
  })

  const { inputRef } = useBarcode({
    value: form.watch("id") || 'bar-code',
    options: {
      background: 'white',
    }
  });

  const onSubmit = (values: z.infer<typeof AddProductSchema>) => {
    console.log(values);
    setError("");
    setSuccess("");
    startTransition(() => {
      addProduct(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    })
  }

  return (
    <CardWrapper>
      <Form {...form}>
        <form onSubmit={form.handleSubmit((e) => onSubmit(e))} className="space-y-6 mx-auto">
          <div className="max-h-[90vh] space-y-4">
            <div className="flex gap-2 flex-col md:flex-row">
              <FormField control={form.control} name="id" render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Product ID (unique)</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Grocery Item" type="text" disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }} />
              <FormField control={form.control} name="product_name" render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Grocery Item" type="text" disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }} />
            </div>
            <div className="flex gap-2 flex-col md:flex-row">
            <MoneyInput
              form={form}
              label="Price"
              name="price"
              placeholder="Enter Price of Product"
            />
            <FormField control={form.control} name="quantity" render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value === '' ? undefined : Number(value));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }} />
            </div>
            <FormField control={form.control} name="category" render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Select {...field} onValueChange={(value) => field.onChange(value)} value={field.value}>
                      <SelectTrigger className="w-[180px]" disabled={isPending}>
                        <SelectValue placeholder="Item Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Food">Food</SelectItem>
                        <SelectItem value="Wear">Wear</SelectItem>
                        <SelectItem value="Grocery">Grocery</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }} />

            <div className="flex items-center justify-center">
              <img ref={inputRef} />
            </div>


          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full">{isPending ? "Loading" : "Add Product"}</Button>
        </form>
      </Form>
    </CardWrapper>);
}

export default AddProduct;