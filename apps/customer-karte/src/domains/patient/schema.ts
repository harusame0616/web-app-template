import * as v from "valibot";

export const customerSchema = v.object({
  aliasId: v.string(),
  id: v.string(),
  name: v.string(),
  age: v.number(),
  gender: v.optional(v.picklist(["male", "female", "other"]), "other"),
  medicalHistory: v.optional(v.string(), ""),
  currentIllness: v.optional(v.string(), ""),
  medications: v.optional(v.string(), ""),
  doctorInfo: v.optional(v.string(), ""),
  emergencyContact: v.optional(v.string(), ""),
  createdAt: v.date(),
  updatedAt: v.date(),
});

export type Customer = v.InferOutput<typeof customerSchema>;
