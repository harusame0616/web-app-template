import {
  AtSign,
  ChevronsUpDownIcon,
  LockKeyholeIcon,
  LogOutIcon,
  User,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import UserImage from "./user.png";

const items = [
  {
    title: "ユーザー一覧",
    url: "/admin/users",
    icon: User,
  },
];

export function SideMenu() {
  const { name, email } = { name: "山田 太郎", email: "y.taro@example.com" };
  return (
    <Sidebar>
      <SidebarHeader>Admin</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menus</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="grid grid-cols-[1fr_auto] items-center">
              <UserMiniProfile name={name} email={email} />
              <ChevronsUpDownIcon />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mb-2 ml-1 max-w-64" side="right">
            <DropdownMenuLabel>
              <UserMiniProfile name={name} email={email} />
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LockKeyholeIcon />
              パスワード更新
            </DropdownMenuItem>
            <DropdownMenuItem>
              <AtSign />
              メールアドレス更新
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOutIcon />
              ログアウト
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

type UserMiniProfileProps = {
  name: string;
  email: string;
};
function UserMiniProfile({ name, email }: UserMiniProfileProps) {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-2 items-center">
      <Avatar>
        <Image src={UserImage} alt={""} />
        <AvatarFallback>{name.at(1)}</AvatarFallback>
      </Avatar>
      <div className="grid grid-rows-2 font-normal">
        <div className="truncate ">{name}</div>
        <div className="truncate text-muted-foreground">{email}</div>
      </div>
    </div>
  );
}
