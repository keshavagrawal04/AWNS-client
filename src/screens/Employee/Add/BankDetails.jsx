import {Text, View, TouchableOpacity, Image} from "react-native";
import {
  useUpdateUserMutation,
  useGetUserInfoQuery,
} from "../../../services/api/user";
import React, {useEffect} from "react";
import {FloatingLabelTextInput} from "../../../components";
import {useFormik} from "formik";
import images from "../../../assets/images";
import {bankDetailsSchema} from "../../../schema/Employee";
import {isEqual} from "lodash";
import {useNavigation} from "@react-navigation/native";
import * as Burnt from "burnt";

const BankDetails = ({handlePrevTab}) => {
  const [updateUser, {isLoading}] = useUpdateUserMutation();
  const {data: userData} = useGetUserInfoQuery();
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: {
      bankName: "",
      branchName: "",
      accountHolderName: "",
      accountNumber: "",
      ifsc: "",
    },
    validationSchema: bankDetailsSchema,
    onSubmit: async values => {
      try {
        const hasChanged = !isEqual(values, userData?.user?.bankDetails);
        if (!hasChanged) {
          if (userData?.user?.role === "admin") {
            navigation.navigate("Dashboard");
            return;
          }
          if (!userData?.user?.isVerified) {
            navigation.navigate("PendingApproval");
          } else {
            navigation.navigate("EmployeeDashboard");
          }
          return;
        }
        const userRole = userData?.user?.role;
        const {data, error} = await updateUser({
          bankDetails: {...values},
          profileSetup: true,
          isVerified: userRole === "admin" ? true : false,
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
          if (userData?.user?.role === "admin") {
            navigation.navigate("Dashboard");
            return;
          }
          if (!userData?.user?.isVerified) {
            navigation.navigate("PendingApproval");
          } else {
            navigation.navigate("EmployeeDashboard");
          }
        }
      } catch (error) {}
    },
  });

  useEffect(() => {
    if (userData?.user?.bankDetails) {
      Object.keys(userData.user?.bankDetails).forEach(key => {
        formik.setFieldValue(key, userData.user.bankDetails[key], false);
      });
    }
  }, [userData?.user]);

  return (
    <View className="flex-1 h-[85vh]">
      <Text className="text-center text-primary font-poppins-medium text-lg">
        Bank Details
      </Text>
      <View className="py-5 px-2">
        <FloatingLabelTextInput
          inputStyles={"py-4"}
          label={"Bank Name"}
          required
          formik={formik}
          id="bankName"
        />
        <FloatingLabelTextInput
          inputStyles={"py-4"}
          label={"Branch Name"}
          required
          formik={formik}
          id="branchName"
        />
        <FloatingLabelTextInput
          inputStyles={"py-4"}
          label={"Account Holder Name"}
          required
          formik={formik}
          id="accountHolderName"
        />
        <FloatingLabelTextInput
          inputStyles={"py-4"}
          label={"Account Number"}
          required
          formik={formik}
          id="accountNumber"
          type="numeric"
        />
        <FloatingLabelTextInput
          inputStyles={"py-4"}
          label={"IFSC Code"}
          required
          formik={formik}
          id="ifsc"
        />
      </View>
      <View className="absolute bottom-0 w-full flex-row justify-evenly px-4">
        <TouchableOpacity
          className={`border border-gray bg-[#EBEBEB] rounded-full px-8 py-2`}
          onPress={handlePrevTab}
          disabled={isLoading}>
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
          onPress={formik.handleSubmit}
          disabled={isLoading}>
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

export default BankDetails;
