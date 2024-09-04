import {Text, View, TouchableOpacity, Image} from "react-native";
import {
  FloatingLabelTextInput,
  CustomSelectField,
  FloatingLabelDateInput,
} from "../../../components";
import {additionalInfoSchema} from "../../../schema/Employee";
import {useFormik} from "formik";
import images from "../../../assets/images";
import {
  useUpdateUserMutation,
  useGetUserInfoQuery,
} from "../../../services/api/user";
import React, {useEffect} from "react";
import * as Burnt from "burnt";
import {isEqual} from "lodash";

const AdditionalInformation = ({handleNextTab, handlePrevTab}) => {
  const [updateUser] = useUpdateUserMutation();
  const {data: userData} = useGetUserInfoQuery();

  const employementTypes = [
    {label: "Full Time", value: "Full Time"},
    {label: "Part Time", value: "Part Time"},
  ];

  const formik = useFormik({
    initialValues: {
      linkedIn: "",
      employementType: "",
      joiningDate: "",
      education: "",
      department: "",
    },
    validationSchema: additionalInfoSchema,
    onSubmit: async values => {
      try {
        const hasChanged = !isEqual(
          values,
          userData?.user?.additionalInformation,
        );
        if (!hasChanged) {
          handleNextTab();
          return;
        }

        const {data, error} = await updateUser({
          additionalInformation: {...values},
        });

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
    if (userData?.user?.additionalInformation) {
      Object.keys(userData.user?.additionalInformation).forEach(key => {
        if (key === "joiningDate") {
          formik.setFieldValue(
            key,
            userData.user.additionalInformation[key].split("T")[0],
            false,
          );
        } else {
          formik.setFieldValue(
            key,
            userData.user.additionalInformation[key],
            false,
          );
        }
      });
    }
  }, [userData?.user]);

  return (
    <View className="flex-1 h-[85vh]">
      <Text className="text-center text-primary font-poppins-medium text-lg">
        Additional Information
      </Text>
      <View className="py-5 px-2">
        <FloatingLabelTextInput
          inputStyles={"py-4"}
          label={"LinkedIn"}
          required
          formik={formik}
          id="linkedIn"
        />
        <CustomSelectField
          label={"Employement Type"}
          required
          placeholder={"Employement Type"}
          formik={formik}
          id="employementType"
          data={employementTypes}
        />
        <FloatingLabelDateInput
          inputStyles={"py-4"}
          label={"Joining Date"}
          required
          formik={formik}
          id="joiningDate"
        />
        <FloatingLabelTextInput
          inputStyles={"py-4"}
          label={"Education"}
          required
          formik={formik}
          id="education"
        />
        <FloatingLabelTextInput
          inputStyles={"py-4"}
          label={"Department"}
          required
          formik={formik}
          id="department"
        />
      </View>
      <View className="absolute bottom-0 w-full flex-row justify-evenly px-4">
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

export default AdditionalInformation;
