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
    .oneOf(["Full Time", "Part Time"], "Invalid employment type")
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

export const leaveSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  date: Yup.string().required("Date is required"),
  reason: Yup.string().required("Reason is required"),
});

export const profileSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  mobileNumber: Yup.string()
    .matches(/^[0-9]+$/, "Mobile number must be only digits")
    .min(10, "Mobile number must be at least 10 digits")
    .required("Mobile number is required"),
  alternateMobileNumber: Yup.string()
    .matches(/^[0-9]+$/, "Alternate mobile number must be only digits")
    .min(10, "Alternate mobile number must be at least 10 digits")
    .required("Alternate mobile number is required"),
  address: Yup.string().required("Address is required"),
  dateOfBirth: Yup.string().required("Date of Birth is required"),
  profileImage: Yup.string().required("Profile image URL is required"),
  additionalInformation: Yup.object()
    .shape({
      linkedIn: Yup.string()
        .url("Invalid URL format")
        .required("LinkedIn URL is required"),
      employementType: Yup.string().required("Employment Type is required"),
      joiningDate: Yup.string().required("Joining Date is required"),
      education: Yup.string().required("Education is required"),
      department: Yup.string().required("Department is required"),
    })
    .required("Additional Information is required"),
  bankDetails: Yup.object()
    .shape({
      bankName: Yup.string().required("Bank name is required"),
      branchName: Yup.string().required("Branch name is required"),
      accountHolderName: Yup.string().required(
        "Account holder name is required",
      ),
      ifsc: Yup.string().required("IFSC code is required"),
      accountNumber: Yup.string()
        .matches(/^[0-9]+$/, "Account number must be only digits")
        .required("Account number is required"),
    })
    .required("Bank Details are required"),
});
