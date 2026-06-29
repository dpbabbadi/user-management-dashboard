import { DEPARTMENTS } from "./constants";

export function splitName(fullName = "") {
  const parts = fullName.trim().split(/\s+/);
  const firstName = parts[0] || "";
  const lastName = parts.slice(1).join(" ") || "";
  return { firstName, lastName };
}

export function pickDepartment(id) {
  // Stable default department (so it doesn’t change on re-render)
  return DEPARTMENTS[id % DEPARTMENTS.length];
}

export function normalizeUser(apiUser) {
  const { firstName, lastName } = splitName(apiUser?.name || "");
  return {
    id: apiUser.id,
    firstName,
    lastName,
    email: apiUser.email || "",
    department: pickDepartment(apiUser.id || 0),
  };
}