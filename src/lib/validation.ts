import type { UserPayload } from "../types/auth";

export type StaffValidationErrors = Partial<Record<keyof UserPayload, string>>;
export function addStaffValidation(payload: UserPayload | any) {
  const errors: StaffValidationErrors = {};

  // Basic validations
  if (!payload.name?.trim()) {
    errors.name = "Full name is required.";
  }

  if (!payload.role?.trim()) {
    errors.role = "Team Role is required.";
  }

  // Email validation
  if (payload.email?.trim().length > 3) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      errors.email = "Invalid email format.";
    }
  }

  // Description validation (max 200 characters)
  // if (payload.desc && payload.desc.length > 200) {
  //   errors.desc = "Description must be 200 characters or fewer.";
  // }

  return errors;
}
