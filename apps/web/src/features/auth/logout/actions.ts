"use server";

import { createServerAction } from "@workspace/libs/server-action/server";

import { logout } from "./logout";

export const logoutAction = createServerAction(logout);
