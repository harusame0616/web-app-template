import {
  AtSign,
  Building2,
  ChevronsUpDownIcon,
  LockKeyholeIcon,
  User,
  Users,
} from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";

import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@workspace/ui/components/sidebar";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { createClient } from "@/lib/supabase/server";

import { LogoutButton } from "./logout-button";
import { SideMenuLink } from "./side-menu-link";
import UserImage from "./user.png";
import { Role } from "./users/role";

const items = [
  {
    title: "顧客一覧",
    url: "/admin/customers",
    icon: Users,
  },
  {
    title: "事業所一覧",
    url: "/admin/offices",
    icon: Building2,
    adminOnly: true,
  },
  {
    title: "ユーザー一覧",
    url: "/admin/users",
    icon: User,
    adminOnly: true,
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
  const role = getUserResult.data.user.user_metadata.role || Role.Admin.value;

  return <SideMenuPresenter name={name} email={email} role={role} />;
}

export function SideMenuPresenter(
  props:
    | {
        skeleton?: false;
        email: string;
        name: string;
        role: string;
      }
    | { skeleton: true },
) {
  const isAdmin = !props.skeleton && props.role === "admin";
  const menuItems = items.filter((item) => !item.adminOnly || isAdmin);
  return (
    <Sidebar>
      <SidebarHeader>管理メニュー</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <SideMenuLink href={item.url} className="no-underline">
                      <item.icon />
                      <span>{item.title}</span>
                    </SideMenuLink>
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
          <DropdownMenuContent className="mb-2 ml-1 max-w-64">
            <DropdownMenuLabel>
              {props.skeleton ? (
                <UserMiniProfile skeleton />
              ) : (
                <UserMiniProfile name={props.name} email={props.email} />
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <SideMenuLink href="/admin/account/update-password">
                <LockKeyholeIcon />
                パスワード更新
              </SideMenuLink>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <SideMenuLink href="/admin/account/update-email">
                <AtSign />
                メールアドレス更新
              </SideMenuLink>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogoutButton />
            </DropdownMenuItem>
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
          {props.skeleton ? "" : (props.name?.at(0) ?? "no name")}
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
