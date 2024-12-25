"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { FormInput, Home, Sheet } from "lucide-react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Separator } from "./separator";

const sideItems = [
  {
    name: "Home",
    url: '/',
    icon: Home
  },
  {
    name: "Add Product",
    url: '/add-products',
    icon: FormInput
  },
  {
    name: "All Products",
    url: '/products',
    icon: Sheet
  },
  {
    name: "Generate Invoice",
    url: '/generate-invoice',
    icon: Home
  },
]
export function AppSidebar() {
  const location = usePathname();
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
    <SidebarGroup>
      <SidebarGroupLabel className="h-10 flex justify-center items-center"><Image src="/logo.svg" width={100} height={100} alt="Logo Img" /></SidebarGroupLabel>
      <Separator />
      <SidebarGroupContent>
        <SidebarMenu>
          {sideItems.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild>
                <a href={item.url} className={location === `${item.url}` ? "bg-primary text-white" : ""}>
                  <item.icon />
                  <span>{item.name}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
