import {TextInput, View, Text} from "react-native";
import React from "react";

const CustomTextInput = ({
  placeholder,
  id,
  formik,
  type,
  inputStyles,
  label,
  required = false,
}) => {
  return (
    <View>
      {label && (
        <Text className="text-black font-poppins-medium">
          {label}
          {required && <Text className="text-red-500"> *</Text>}
        </Text>
      )}
      <TextInput
        placeholder={placeholder}
        value={formik.values[id]}
        onChangeText={formik.handleChange(id)}
        placeholderTextColor="#CDCDE0"
        className={`border border-gray focus:border-primary text-black font-poppins-regular px-5 rounded-md text-md ${inputStyles}`}
        style={{textAlignVertical: "center"}}
        keyboardType={type}
      />
      {formik.touched[id] && formik.errors[id] ? (
        <Text className="h-[22px] text-red-700 text-md font-poppins-medium">
          {formik.errors[id]}
        </Text>
      ) : (
        <Text className="h-[22px]" />
      )}
    </View>
  );
};

export default CustomTextInput;
