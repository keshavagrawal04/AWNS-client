import * as Yup from "yup";

export const employeePersonalInfoSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters long")
    .max(50, "Name cannot exceed 50 characters"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  mobileNumber: Yup.string()
    .required("Mobile number is required")
    .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits"),
  alternateMobileNumber: Yup.string()
    .required("Alternate mobile number is required")
    .matches(
      /^[0-9]{10}$/,
      "Alternate mobile number must be exactly 10 digits",
    ),
  dateOfBirth: Yup.string().required("Date of Birth is required"),
  address: Yup.string()
    .required("Address is required")
    .min(5, "Address must be at least 5 characters long")
    .max(100, "Address cannot exceed 100 characters"),
});

export const additionalInfoSchema = Yup.object({
  linkedIn: Yup.string()
    .url("Must be a valid URL")
    .required("LinkedIn profile is required"),
  employementType: Yup.string()
    .oneOf(["full-time", "part-time", "contract"], "Invalid employment type")
    .required("Employment type is required"),
  joiningDate: Yup.string().required("Joining date is required"),
  education: Yup.string()
    .min(2, "Education must be at least 2 characters")
    .required("Education is required"),
  department: Yup.string()
    .min(2, "Education must be at least 2 characters")
    .required("Department is required"),
});

export const bankDetailsSchema = Yup.object().shape({
  bankName: Yup.string()
    .required("Bank name is required")
    .min(2, "Bank name must be at least 2 characters long")
    .max(50, "Bank name must be less than 50 characters long"),

  branchName: Yup.string()
    .required("Branch name is required")
    .min(2, "Branch name must be at least 2 characters long")
    .max(50, "Branch name must be less than 50 characters long"),

  accountHolderName: Yup.string()
    .required("Account holder name is required")
    .min(2, "Account holder name must be at least 2 characters long")
    .max(50, "Account holder name must be less than 50 characters long"),

  accountNumber: Yup.string()
    .required("Account number is required")
    .matches(/^[0-9]+$/, "Account number must be only digits")
    .min(9, "Account number must be at least 9 digits long")
    .max(18, "Account number must be less than 18 digits long"),

  ifsc: Yup.string()
    .required("IFSC code is required")
    .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code format"),
});
