import * as v from "valibot";
export const Role = {
  Admin: { value: "admin", label: "管理者" },
  General: { value: "general", label: "一般" },
} as const;

export type Role = (typeof Role)[keyof typeof Role]["value"];

export const roleSchema = v.picklist(
  Object.values(Role).map((role) => role.value),
);

export function getRoleLabel(role: Role) {
  switch (role) {
    case Role.Admin.value:
      return Role.Admin.label;
    case Role.General.value:
      return Role.General.label;
    default:
      throw new Error(`不明なロール：${role satisfies never}`);
  }
}

export type User = {
  userId: string;
  name: string;
  email: string;
  role: Role;
};
