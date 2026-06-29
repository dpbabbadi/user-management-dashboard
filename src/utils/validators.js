export function validateUser(values) {
  const errors = {};

  if (!values.firstName?.trim()) errors.firstName = "First name is required";
  if (!values.lastName?.trim()) errors.lastName = "Last name is required";

  if (!values.email?.trim()) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Invalid email format";
  }

  if (!values.department?.trim()) errors.department = "Department is required";

  return errors;
}