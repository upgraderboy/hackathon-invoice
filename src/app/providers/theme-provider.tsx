"use client"

import {useEffect, useState} from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider  attribute="class" defaultTheme="system" enableSystem>{children}</NextThemesProvider>
}
