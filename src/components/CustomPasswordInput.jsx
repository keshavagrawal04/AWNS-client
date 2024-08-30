import {View, TextInput, TouchableOpacity, Text, Image} from "react-native";
import React, {useState} from "react";
import images from "../assets/images";

const CustomPasswordInput = ({placeholder, id, formik}) => {
  const [isPasswordToggle, setIsPasswordToggle] = useState(true);

  return (
    <View className="relative">
      <TextInput
        placeholder={placeholder}
        value={formik.values[id]}
        onChangeText={formik.handleChange(id)}
        placeholderTextColor="#CDCDE0"
        className={`border border-gray focus:border-primary text-black font-poppins-regular px-5 py-4 rounded-lg text-md mt-2`}
        style={{textAlignVertical: "center"}}
        secureTextEntry={isPasswordToggle}
      />
      <TouchableOpacity
        className="absolute top-[25px] right-3"
        onPress={() => {
          setIsPasswordToggle(prev => !prev);
        }}>
        {!isPasswordToggle ? (
          <Image source={images.eye} className="w-6 h-6" />
        ) : (
          <Image source={images.eyeSlash} className="w-6 h-6" />
        )}
      </TouchableOpacity>
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

export default CustomPasswordInput;
