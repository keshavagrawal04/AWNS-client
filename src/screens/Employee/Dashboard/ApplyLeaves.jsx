import {Text, TouchableOpacity, Image, ScrollView, View} from "react-native";
import React, {useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import icons from "../../../assets/icons";
import {useNavigation} from "@react-navigation/native";
import {useFormik} from "formik";
import {leaveSchema} from "../../../schema/Employee";
import {
  CustomAlert,
  CustomButton,
  FloatingLabelDateInput,
  FloatingLabelTextInput,
  Loader,
} from "../../../components";
import {useApplyLeaveMutation} from "../../../services/api/leave";
import {useAuth} from "../../../hooks";

const ApplyLeaves = () => {
  const navigation = useNavigation();
  const {user} = useAuth();
  const [applyLeave, {isLoading}] = useApplyLeaveMutation();
  const [showAlert, setShowAlert] = useState({visible: false});

  const formik = useFormik({
    initialValues: {title: "", date: "", reason: ""},
    validationSchema: leaveSchema,
    onSubmit: async values => {
      try {
        const payload = {
          user: user.id,
          ...values,
        };
        const {data, error} = await applyLeave(payload);
        if (data) {
          console.log(data?.message);
          setShowAlert({
            visible: true,
            type: "success",
            message: data?.message,
            handleClose: () => {
              setShowAlert({visible: false});
              navigation.navigate("Leaves");
            },
          });
        } else {
          console.log(error.data.message);
          setShowAlert({
            visible: true,
            type: "error",
            message: error?.data?.message,
            handleClose: () => {
              setShowAlert({visible: false});
            },
          });
        }
      } catch (error) {
        console.log(error.message);
      }
    },
  });

  if (isLoading) return <Loader />;

  return (
    <SafeAreaView>
      <TouchableOpacity
        className="flex flex-row items-center px-4 py-5"
        onPress={() => {
          navigation.navigate("EmployeeDashboard");
        }}>
        <Image
          source={icons.backArrow}
          className="w-7 h-7"
          resizeMethod="contain"
        />
        <Text className="text-black text-3xl font-ubuntu-bold ml-2">
          Apply Leaves
        </Text>
      </TouchableOpacity>
      <ScrollView className="px-6 mt-4">
        <View className="mb-2">
          <FloatingLabelTextInput
            id={"title"}
            label={"Enter Title"}
            formik={formik}
            inputStyles={"py-4"}
          />
        </View>
        <View className="mb-2">
          <FloatingLabelDateInput
            inputStyles={"py-4"}
            id={"date"}
            label={"Select date"}
            formik={formik}
            required
          />
        </View>
        <View className="mb-2">
          <FloatingLabelTextInput
            id={"reason"}
            placeholder={"Reason"}
            formik={formik}
            label={"REASON"}
            required
            inputStyles={"py-4"}
            isTextArea
            numberOfLines={6}
          />
        </View>
        <CustomButton
          title={"Done"}
          containerStyles={"py-4 rounded-full mt-4"}
          handleOnPress={formik.handleSubmit}
        />
      </ScrollView>
      <CustomAlert
        visible={showAlert.visible}
        handleClose={showAlert.handleClose}
        type={showAlert.type}
        message={showAlert.message}
      />
    </SafeAreaView>
  );
};

export default ApplyLeaves;
