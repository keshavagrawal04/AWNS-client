import {Text, View, TouchableOpacity, Image} from "react-native";
import {CustomTextInput, CustomDatePicker} from "../../../components";
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
        console.log(hasChanged);
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
        <CustomDatePicker
          id="dateOfBirth"
          label="Date of Birth"
          placeholder="Select your date of birth"
          formik={formik}
          datePickerMode="date"
          required
        />
        <CustomTextInput
          label={"Address"}
          required
          placeholder={"Address"}
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
