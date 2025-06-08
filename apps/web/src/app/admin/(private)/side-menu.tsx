import {
  AtSign,
  ChevronsUpDownIcon,
  LockKeyholeIcon,
  LogOutIcon,
  User,
} from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";

import { Link } from "@/components/link";
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
import { Skeleton } from "@/components/ui/skeleton";
import { createClient } from "@/lib/supabase/server";

import UserImage from "./user.png";

const items = [
  {
    title: "ユーザー一覧",
    url: "/admin/users",
    icon: User,
  },
];

export async function SideMenuContainer() {
  const supabaseClient = await createClient();
  const getUserResult = await supabaseClient.auth.getUser();
  if (getUserResult.error || !getUserResult.data) {
    redirect("/admin/login");
  }

  const name = getUserResult.data.user.user_metadata.name;
  const email = getUserResult.data.user.email!;

  return <SideMenuPresenter name={name} email={email} />;
}

export function SideMenuPresenter(
  props:
    | {
        skeleton?: false;
        email: string;
        name: string;
      }
    | { skeleton: true },
) {
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
                    <Link href={item.url} className="no-underline">
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
              {props.skeleton ? (
                <UserMiniProfile skeleton />
              ) : (
                <UserMiniProfile name={props.name} email={props.email} />
              )}
              <ChevronsUpDownIcon />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mb-2 ml-1 max-w-64" side="right">
            <DropdownMenuLabel>
              {props.skeleton ? (
                <UserMiniProfile skeleton />
              ) : (
                <UserMiniProfile name={props.name} email={props.email} />
              )}
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
            <Link href="/admin/logout">
              <DropdownMenuItem>
                <LogOutIcon />
                ログアウト
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

type UserMiniProfileProps =
  | { skeleton?: false; name: string; email: string }
  | { skeleton: true };
function UserMiniProfile(props: UserMiniProfileProps) {
  return (
    <div className="grid grid-cols-[auto_1fr] items-center gap-2">
      <Avatar>
        <Image src={UserImage} alt={""} />
        <AvatarFallback>
          {props.skeleton ? "" : props.name.at(0)}
        </AvatarFallback>
      </Avatar>
      <div className="grid grid-rows-2 font-normal">
        <div className="truncate ">
          {props.skeleton ? <Skeleton className="my-1 h-4 w-12" /> : props.name}
        </div>
        <div className="truncate text-muted-foreground">
          {props.skeleton ? (
            <Skeleton className="my-1 h-4 w-24" />
          ) : (
            props.email
          )}
        </div>
      </div>
    </div>
  );
}
