import { differenceInYears } from "date-fns";

export function calculateAge(birthday: Date): number {
  return differenceInYears(new Date(), birthday);
}
