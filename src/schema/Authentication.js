import * as Yup from "yup";

export const signupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&]/,
      "Password must contain at least one special character",
    ),

  name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters long")
    .max(50, "Name cannot exceed 50 characters"),

  mobileNumber: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),

  role: Yup.string()
    .required("Role is required")
    .oneOf(["admin", "employee", "guest"], "Invalid role"),
});
