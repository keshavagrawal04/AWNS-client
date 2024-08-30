import React from "react";
import {View, Text, StyleSheet} from "react-native";
import {Dropdown} from "react-native-element-dropdown";

const CustomSelectField = ({
  placeholder,
  id,
  formik,
  data,
  label,
  required = false,
  inputStyles = "",
}) => {
  return (
    <View>
      {label && (
        <Text className="text-black font-poppins-medium">
          {label}
          {required && <Text className="text-red-500"> *</Text>}
        </Text>
      )}
      <Dropdown
        className={`border border-gray px-5 rounded-md py-4 ${inputStyles}`}
        placeholderStyle={styles.placeholder}
        selectedTextStyle={styles.selectedText}
        itemTextStyle={styles.itemText}
        data={data}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={formik.values[id]}
        onChange={item => formik.setFieldValue(id, item.value)}
      />
      {formik.touched[id] && formik.errors[id] ? (
        <Text className="h-6 text-red-700 text-md font-poppins-medium">
          {formik.errors[id]}
        </Text>
      ) : (
        <Text className="h-6" />
      )}
    </View>
  );
};

export default CustomSelectField;

const styles = StyleSheet.create({
  placeholder: {
    color: "#CDCDE0",
    fontFamily: "Poppins-Regular",
    fontSize: 14,
  },
  selectedText: {
    color: "black",
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
  itemText: {
    color: "black",
    fontFamily: "Poppins-Regular",
    fontSize: 14,
  },
});
