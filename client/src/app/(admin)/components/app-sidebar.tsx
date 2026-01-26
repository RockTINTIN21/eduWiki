"use client";

import {Calendar, ChevronUp, Home, Inbox, Search, Settings, User2} from "lucide-react"

import {
  Sidebar,
  SidebarContent, SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel, SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {useAppSelector} from "@/lib/store/store";
import {authSlice} from "@/lib/store/auth/auth.slice";
import {Skeleton} from "@/components/ui/skeleton";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {API_UPLOADS_URL} from "@/lib/api";

const items = [
  {
    title: "Главная",
    url: "/dashboard",
    icon: Home,
  },
]

const administrationItems = [
  {
    title: "Страны",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Университеты",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Программы",
    url: "#",
    icon: Search,
  },
  {
    title: "Пользователи",
    url: "#",
    icon: Settings,
  },
  {
    title: "Тикеты",
    url: "#",
    icon: Settings,
  },
]

const statisticsItems = [
  {
    title: "Статистика",
    url: "#",
    icon: Inbox,
  },
]


export function AppSidebar() {

  const user = useAppSelector((state) => state[authSlice.name].user)

  return (
    <Sidebar>
      <SidebarHeader>

      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>

          <SidebarGroupLabel>Администрирование</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {administrationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>

          <SidebarGroupLabel>Статистика</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {statisticsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                {user ?
                  <SidebarMenuButton>
                    <Avatar className="w-8 h-8 text-white">
                      <AvatarImage
                        src={`${API_UPLOADS_URL}/${user.avatarUrl}`}
                        alt={user.username}
                      />
                      <AvatarFallback>{user.username[0] + user.username[1]}</AvatarFallback>
                    </Avatar>

                    {user.username}
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                  :
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-4 w-28" />
                    </div>
                  </div>
                }

                {/*<div className="flex items-center gap-4">*/}
                {/*  <Skeleton className="h-12 w-12 rounded-full" />*/}
                {/*  <div className="space-y-2">*/}
                {/*    <Skeleton className="h-4 w-32" />*/}
                {/*    <Skeleton className="h-4 w-28" />*/}
                {/*  </div>*/}
                {/*</div>*/}

              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

    </Sidebar>
  )
}