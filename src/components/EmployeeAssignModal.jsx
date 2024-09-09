import React from "react";
import {Modal, View, Text, TouchableOpacity} from "react-native";
import FloatingLabelMultipleSelectInput from "./FloatingLabelMultipleSelectInput";
import {useFormik} from "formik";
import {useGetEmployeesQuery} from "../services/api/user";

const EmployeeAssignModal = ({visible, handleClose, handleYes}) => {
  const {data: employeesData} = useGetEmployeesQuery(true);

  const employees = Array.isArray(employeesData?.data)
    ? employeesData?.data.map(employee => ({
        label: employee?.name,
        value: employee?._id,
      }))
    : [];

  const formik = useFormik({
    initialValues: {
      employee: [],
    },
    onSubmit: async values => {
      console.log(values);
    },
  });

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}>
      <View className={`flex-1 justify-center items-center bg-black/50`}>
        <View className={`w-80 py-5 px-2 bg-white rounded-2xl shadow-lg`}>
          <View>
            <Text className="text-black font-ubuntu-medium text-center text-xl">
              Assign Employee
            </Text>
            <View className="mt-10">
              <FloatingLabelMultipleSelectInput
                label="Select Employee Name"
                id="employee"
                formik={formik}
                inputStyles={"py-4"}
                data={employees}
              />
            </View>
          </View>
          <View className="flex justify-center gap-2 flex-row mt-3">
            <TouchableOpacity
              className={`bg-[#F3F3F3] py-3 rounded-full px-5`}
              onPress={handleClose}>
              <Text className={`text-gray text-center font-poppins-medium`}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`bg-primary py-3 rounded-full px-8`}
              onPress={handleYes}>
              <Text className={`text-white text-center font-poppins-medium`}>
                Assign
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EmployeeAssignModal;
