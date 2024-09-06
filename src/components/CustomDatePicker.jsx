import React, {useState} from "react";
import {TextInput, View, Text, TouchableOpacity, Modal} from "react-native";
import DatePicker from "react-native-modern-datepicker";

const CustomDatePicker = ({
  placeholder,
  id,
  formik,
  type,
  inputclassNames = "",
  label,
  required = false,
}) => {
  const [isPickerVisible, setPickerVisible] = useState(false);

  const handleDateChange = selectedDate => {
    formik.setFieldValue(id, selectedDate);
    setPickerVisible(false);
  };

  return (
    <View className="relative">
      {label && (
        <Text className="text-black font-poppins-medium">
          {label}
          {required && <Text className="text-red-500"> *</Text>}
        </Text>
      )}
      <TouchableOpacity
        onPress={() => setPickerVisible(true)}
        className={`border border-gray rounded-md ${inputclassNames}`}>
        <TextInput
          placeholder={placeholder}
          value={formik.values[id]}
          onChangeText={formik.handleChange(id)}
          placeholderTextColor="#CDCDE0"
          className="p-3 text-black font-poppins-regular text-md"
          editable={false}
          keyboardType={type}
        />
      </TouchableOpacity>
      {formik.touched[id] && formik.errors[id] ? (
        <Text className="h-6 text-red text-md font-poppins-medium">
          {formik.errors[id]}
        </Text>
      ) : (
        <Text className="h-6" />
      )}
      <Modal
        transparent={true}
        animationType="slide"
        visible={isPickerVisible}
        onRequestClose={() => setPickerVisible(false)}>
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="w-4/5 bg-white rounded-lg p-2 shadow-lg">
            <DatePicker
              mode={"calendar"}
              onDateChange={handleDateChange}
              options={{mainColor: "#3470ED"}}
            />
            <TouchableOpacity
              className="bg-primary p-3 rounded-md"
              onPress={() => setPickerVisible(false)}>
              <Text className="text-white font-poppins-medium text-center text-lg">
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CustomDatePicker;
