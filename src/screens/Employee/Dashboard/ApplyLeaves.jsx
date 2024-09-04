import {Text, TouchableOpacity, Image, ScrollView, View} from "react-native";
import React from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import icons from "../../../assets/icons";
import {useNavigation} from "@react-navigation/native";
import {useFormik} from "formik";
import {leaveSchema} from "../../../schema/Employee";
import {
  CustomButton,
  FloatingLabelDateInput,
  FloatingLabelTextInput,
} from "../../../components";

const ApplyLeaves = () => {
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: {title: "", date: "", reason: ""},
    validationSchema: leaveSchema,
    onSubmit: () => {},
  });

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
            id={"TITLE"}
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
    </SafeAreaView>
  );
};

export default ApplyLeaves;
