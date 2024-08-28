import {Text, View} from "react-native";
import React from "react";
import {CustomTextInput} from "../../components";
import {useFormik} from "formik";

const AdditionalInformation = () => {
  const formik = useFormik({
    initialValues: {
      linkedin: "",
      employementType: "",
      joiningDate: "",
      education: "",
    },
    onSubmit: async () => {},
  });

  return (
    <View>
      <Text className="text-center text-primary font-poppins-medium text-lg">
        Additional Information
      </Text>
      <View className="py-5 px-2">
        <CustomTextInput
          label={"LinkedIn"}
          required
          placeholder={"Linkedin"}
          formik={formik}
          id="linkedin"
        />
        <CustomTextInput
          label={"Employement Type"}
          required
          placeholder={"Employement Type"}
          formik={formik}
          id="employementType"
        />
        <CustomTextInput
          label={"Joining Date"}
          required
          placeholder={"Joining Date"}
          formik={formik}
          id="joiningData"
        />
        <CustomTextInput
          label={"Education"}
          required
          placeholder={"education"}
          formik={formik}
          id="education"
        />
      </View>
    </View>
  );
};

export default AdditionalInformation;
