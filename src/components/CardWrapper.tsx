"use client";

import { Card, CardContent, CardFooter } from "./ui/card";
interface CardWrapperProps{
  children: React.ReactNode;
}


const CardWrapper = ({children}: CardWrapperProps) => {
  return ( <>
  <Card className="w-full max-h-[100vh] shadow-md overflow-scroll">
    <CardContent className="">{children}</CardContent>
    </Card>

  </> );
}

export default CardWrapper;