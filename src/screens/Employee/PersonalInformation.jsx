import {Text, View} from "react-native";
import React from "react";
import {CustomTextInput} from "../../components";
import {useFormik} from "formik";

const PersonalInformation = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      alternateMobileNumber: "",
      mobileNumber: "",
      dateOfBirth: "",
      address: "",
    },
    onSubmit: async () => {},
  });

  return (
    <View>
      <Text className="text-center text-primary font-poppins-medium text-lg">
        Personal Information
      </Text>
      <View className="py-5 px-2">
        <CustomTextInput
          label={"Name"}
          required
          placeholder={"Name"}
          formik={formik}
          id="name"
        />
        <CustomTextInput
          label={"Email Address"}
          required
          placeholder={"Email Address"}
          formik={formik}
          id="email"
        />
        <CustomTextInput
          label={"Mobile Number"}
          required
          placeholder={"Mobile Number"}
          formik={formik}
          id="mobileNumber"
          type="numeric"
        />
        <CustomTextInput
          label={"Alternate Mobile Number"}
          required
          placeholder={"Alternate Mobile Number"}
          formik={formik}
          id="alternateMobileNumber"
          type="numeric"
        />
        <CustomTextInput
          label={"Date of Birth"}
          required
          placeholder={"Date of Birth"}
          formik={formik}
          id="dateOfBirth"
        />
        <CustomTextInput
          label={"Address"}
          required
          placeholder={"Address"}
          formik={formik}
          id="address"
        />
      </View>
    </View>
  );
};

export default PersonalInformation;
