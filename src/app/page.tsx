"use client";
import React from 'react';
import { useBarcode } from 'next-barcode';
import Image from 'next/image';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';

function App() {

  return (
    <MaxWidthWrapper className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Your Own for high-quality{" "}<span className={"text-primary"}>Invoice Generator</span>.</h1>
    <p className="mt-6 text-lg max-w-prose text-muted-foreground">Welcome to InVoice Hub. Every item on our platform is verified by our team to ensure our highest quality standards.</p>
    <div className="flex flex-col sm:flex-row gap-4 mt-6">
      <Link href="/products" className={buttonVariants()}>Browse Trending</Link>
      <Button variant={"ghost"}>Our quality promise &rarr;</Button>
    </div>
    {/* TODO: List products */}
    </MaxWidthWrapper>
  )
};

export default App;