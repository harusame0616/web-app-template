import * as v from "valibot";

export const Role = {
  Admin: { value: "admin", label: "管理者" },
  Operator: { value: "operator", label: "オペレーター" },
  Viewer: { value: "viewer", label: "閲覧者" },
} as const;

export type Role = (typeof Role)[keyof typeof Role]["value"];

export const roleSchema = v.picklist(
  Object.values(Role).map((role) => role.value),
);
