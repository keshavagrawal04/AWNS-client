import * as Yup from "yup";

export const meetingSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  meetingLink: Yup.string()
    .url("Invalid URL format")
    .required("Meeting link is required"),
  date: Yup.string().required("Date is required"),
  time: Yup.string().required("Time is required"),
  purpose: Yup.string().required("Purpose is required"),
});
