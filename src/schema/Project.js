import * as Yup from "yup";

const projectSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  status: Yup.string().required("Status is required"),
  startingDate: Yup.string().required("Starting Date is required"),
  endingDate: Yup.string().required("Ending Date is required"),
  frontend: Yup.string().required("Frontend is required"),
  backend: Yup.string().required("Backend is required"),
  aboutProject: Yup.string().required("About Project is required"),
});

export default projectSchema;
