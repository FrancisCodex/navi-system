
import { ChevronRight, type LucideIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { useLocation } from 'react-router-dom';

export function NavMain({
  items,
}: {
  items: {
    title: string
    url?: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Navigation</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible key={item.title} defaultOpen={item.isActive}>
          <SidebarMenuItem key={item.title}>
          <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip={item.title} asChild>
            <a
              href={item.url}
              className={`flex items-center ${currentPath === item.url ? 'bg-primary text-white font-semibold hover:bg-none' : ''}`}
            >
              {item.icon && <item.icon />}
              <span>{item.title}</span>
            </a>
          </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
          <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <a href={subItem.url}>
                          <span>{subItem.title}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
        </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
