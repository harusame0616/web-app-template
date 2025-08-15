"use server";

import { createServerAction } from "@/lib/server-action/server";

import { logout } from "./logout";

export const logoutAction = createServerAction(logout);
