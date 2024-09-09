import React, {useRef, useState, useEffect} from "react";
import {View, Text, Animated, TouchableOpacity, StyleSheet} from "react-native";
import {Dropdown} from "react-native-element-dropdown";
import {getIn} from "formik";

const FloatingLabelSelectInput = ({
  label,
  labelColor = "black",
  duration = 200,
  id,
  formik,
  data,
  inputStyles = "",
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const transY = useRef(new Animated.Value(0)).current;
  const borderColor = useRef(new Animated.Value(1)).current;
  const borderWidth = useRef(new Animated.Value(1)).current;

  const borderColorAnimation = borderColor.interpolate({
    inputRange: [1, 2],
    outputRange: ["#C5C5C5", "#3470ED"],
  });

  const labelColorAnimation = borderColor.interpolate({
    inputRange: [1, 2],
    outputRange: ["gray", labelColor],
  });

  const transformAnimation = toValue => {
    Animated.timing(transY, {
      toValue,
      duration,
      useNativeDriver: true,
    }).start();
  };

  const labelBackgroundColor = borderWidth.interpolate({
    inputRange: [1, 2],
    outputRange: ["#F4F5F7", "#F4F5F7"],
  });

  const animatedBorderColor = toValue => {
    Animated.timing(borderColor, {
      toValue,
      duration,
      useNativeDriver: false,
    }).start();
  };

  const handleOnFocus = () => {
    transformAnimation(-24);
    animatedBorderColor(2);
    setIsFocused(true);
  };

  const handleOnBlur = () => {
    if (getIn(formik.values, id)) return;
    transformAnimation(-10);
    animatedBorderColor(1);
    setIsFocused(false);
  };

  useEffect(() => {
    if (getIn(formik.values, id)) {
      handleOnFocus();
    } else {
      handleOnBlur();
    }
  }, [getIn(formik.values, id)]);

  return (
    <View className="mb-2">
      <Animated.View
        className={`border ${
          isFocused ? "border-blue-500" : "border-gray-300"
        } bg-gray-100 rounded-md`}
        style={{borderColor: borderColorAnimation}}>
        <Animated.View
          className={`absolute left-3 ${
            isFocused ? "top-1/4 text-blue-500" : "top-1/2 text-gray-500"
          } bg-gray-100 px-1`}
          style={{transform: [{translateY: transY}]}}>
          <Animated.Text
            style={{
              color: labelColorAnimation,
              fontFamily: "Poppins-Medium",
              backgroundColor: labelBackgroundColor,
              paddingHorizontal: 4,
            }}>
            {label}
          </Animated.Text>
        </Animated.View>
        <Dropdown
          className={`px-5 rounded-md ${inputStyles}`}
          selectedTextStyle={styles.selectedText}
          itemTextStyle={styles.itemText}
          placeholder=""
          data={data}
          labelField="label"
          valueField="value"
          value={formik.values[id] || " "}
          onChange={item => formik.setFieldValue(id, item.value)}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
        />
      </Animated.View>
      {formik.touched[id] && formik.errors[id] ? (
        <Text className="text-red font-poppins-medium text-sm mt-1">{formik.errors[id]}</Text>
      ) : (
        <Text className="h-6" />
      )}
    </View>
  );
};

export default FloatingLabelSelectInput;

const styles = StyleSheet.create({
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
