import { useEffect, useRef, RefObject } from "react";
import { Input } from "@/components/ui/input";
import { Bell, Search, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import notifications from "@/constants/sample_notif";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function DashNavbar() {
  const searchInputRef: RefObject<HTMLInputElement> = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "/") {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="flex w-full items-center justify-between px-4 md:px-6">
      <div className="flex relative w-full max-w-md md:max-w-sm">
        <div className="flex w-full max-w-md items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input className="h-8" placeholder="Search..." ref={searchInputRef} />
        </div>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                {notifications.length}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.map((notification) => (
              <DropdownMenuItem key={notification.id}>
                <div className="flex flex-col">
                  <span>{notification.message}</span>
                  <span className="text-xs text-muted-foreground">{notification.time}</span>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=32&width=32" />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
        </Button>
      </div>
    </div>
  );
}