import {Text, View, TouchableOpacity, Image} from "react-native";
import {
  FloatingLabelTextInput,
  CustomDatePicker,
  FloatingLabelDateInput,
} from "../../../components";
import {useFormik} from "formik";
import images from "../../../assets/images";
import {employeePersonalInfoSchema} from "../../../schema/Employee";
import {
  useUpdateUserMutation,
  useGetUserInfoQuery,
} from "../../../services/api/user";
import React, {useEffect} from "react";
import * as Burnt from "burnt";
import {isEqual} from "lodash";

const PersonalInformation = ({handleNextTab, handlePrevTab}) => {
  const [updateUser] = useUpdateUserMutation();
  const {data: userData} = useGetUserInfoQuery();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      alternateMobileNumber: "",
      mobileNumber: "",
      dateOfBirth: "",
      address: "",
    },
    validationSchema: employeePersonalInfoSchema,
    onSubmit: async values => {
      try {
        const hasChanged = !isEqual(values, userData?.user);
        if (!hasChanged) {
          handleNextTab();
          return;
        }

        const {data, error} = await updateUser(values);

        if (error) {
          Burnt.alert({
            title: error?.data?.message,
            preset: "error",
          });
          console.log(error.data.message);
        } else if (data) {
          Burnt.alert({
            title: data.message,
            preset: "done",
          });
          console.log(data?.message);
          handleNextTab();
        }
      } catch (error) {}
    },
  });

  useEffect(() => {
    if (userData?.user) {
      Object.keys(userData.user).forEach(key => {
        if (key === "dateOfBirth") {
          formik.setFieldValue(key, userData.user[key].split("T")[0], false);
        } else {
          formik.setFieldValue(key, userData.user[key], false);
        }
      });
    }
  }, [userData?.user]);

  return (
    <View>
      <Text className="text-center text-primary font-poppins-medium text-lg">
        Personal Information
      </Text>
      <View className="py-5 px-2">
        <FloatingLabelTextInput
          label={"Name"}
          required
          formik={formik}
          id="name"
          inputStyles={"py-4"}
        />
        <FloatingLabelTextInput
          inputStyles={"py-4"}
          label={"Email Address"}
          required
          formik={formik}
          id="email"
        />
        <FloatingLabelTextInput
          inputStyles={"py-4"}
          label={"Mobile Number"}
          required
          formik={formik}
          id="mobileNumber"
          type="numeric"
        />
        <FloatingLabelTextInput
          label={"Alternate Mobile Number"}
          inputStyles={"py-4"}
          required
          formik={formik}
          id="alternateMobileNumber"
          type="numeric"
        />
        <FloatingLabelDateInput
          id="dateOfBirth"
          label="Date of Birth"
          formik={formik}
          inputStyles={"py-4"}
          required
        />
        <FloatingLabelTextInput
          inputStyles={"py-4"}
          label={"Address"}
          required
          formik={formik}
          id="address"
        />
      </View>
      <View className="w-full flex flex-row justify-evenly px-4">
        <TouchableOpacity
          className={`border border-gray bg-[#EBEBEB] rounded-full px-8 py-2`}
          onPress={handlePrevTab}>
          <Text
            className={`text-gray text-center my-auto text-xl font-poppins-medium`}>
            <Image
              source={images.prevArrow}
              className="w-[22px] h-[18px]"
              resizeMethod="contain"
            />{" "}
            Back
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`bg-primary flex justify-center rounded-full px-8 py-3`}
          onPress={formik.handleSubmit}>
          <Text
            className={`text-white text-center my-auto text-xl font-poppins-medium`}>
            Next{" "}
            <Image
              source={images.nextArrow}
              className="w-[22px] h-[18px]"
              resizeMethod="contain"
            />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PersonalInformation;
