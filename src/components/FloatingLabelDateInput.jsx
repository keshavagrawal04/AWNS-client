import {
  StyleSheet,
  TextInput,
  Animated,
  Easing,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from "react-native";
import React, {useEffect, useRef, useState} from "react";
import DatePicker from "react-native-modern-datepicker";
import {getIn} from "formik";

const FloatingLabelDateInput = ({
  label,
  labelColor = "black",
  duration = 200,
  id,
  formik,
  inputStyles,
}) => {
  const [isPickerVisible, setPickerVisible] = useState(false);
  const inputRef = useRef(null);

  const transY = useRef(new Animated.Value(0)).current;
  const borderWidth = useRef(new Animated.Value(1)).current;

  const borderColor = borderWidth.interpolate({
    inputRange: [1, 2],
    outputRange: ["#C5C5C5", "#3470ED"],
  });

  const labelColorAnimation = borderWidth.interpolate({
    inputRange: [1, 2],
    outputRange: ["gray", labelColor],
  });

  const labelBackgroundColor = borderWidth.interpolate({
    inputRange: [1, 2],
    outputRange: ["#F4F5F7", "#F4F5F7"],
  });

  const transformAnimation = toValue => {
    Animated.timing(transY, {
      toValue,
      duration,
      useNativeDriver: true,
      easing: Easing.ease,
    }).start();
  };

  const animatedBorderWidth = toValue => {
    Animated.timing(borderWidth, {
      toValue,
      duration,
      useNativeDriver: false,
      easing: Easing.ease,
    }).start();
  };

  const animationStyle = {
    transform: [{translateY: transY}],
  };

  const handleOnFocus = (initial = false) => {
    transformAnimation(-27.5);
    animatedBorderWidth(2);
    if (!initial) setPickerVisible(true);
  };

  const handleOnBlur = () => {
    if (getIn(formik.values, id)?.toString()) return;
    transformAnimation(0);
    animatedBorderWidth(1);
  };

  const handleDateChange = selectedDate => {
    formik.setFieldValue(id, selectedDate);
    setPickerVisible(false);
  };

  useEffect(() => {
    if (getIn(formik.values, id)) {
      handleOnFocus(true);
    } else {
      handleOnBlur();
    }
  }, [getIn(formik.values, id)]);

  return (
    <>
      <Animated.View
        style={[styles.container, {borderWidth: 1, borderColor: borderColor}]}>
        <Animated.View style={[styles.animatedStyle, animationStyle]}>
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
        <TouchableOpacity
          onPress={() => {
            setPickerVisible(true);
            handleOnFocus();
          }}>
          <TextInput
            editable={false}
            ref={inputRef}
            blurOnSubmit
            autoCapitalize={`none`}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            value={getIn(formik.values, id)?.toString()}
            onChangeText={handleDateChange}
            className={`text-black font-poppins-regular px-5 rounded-md text-sm ${inputStyles}`}
          />
        </TouchableOpacity>
      </Animated.View>
      {getIn(formik.touched, id) && getIn(formik.errors, id) ? (
        <Text className="h-[22px] text-red text-md font-poppins-medium">
          {getIn(formik.errors, id)}
        </Text>
      ) : (
        <Text className="h-[22px]" />
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
              onPress={() => {
                setPickerVisible(false);
                inputRef?.current?.blur();
              }}>
              <Text className="text-white font-poppins-medium text-center text-lg">
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default FloatingLabelDateInput;

const styles = StyleSheet.create({
  container: {
    marginTop: 3,
    backgroundColor: "#F4F5F7",
    borderRadius: 8,
    width: "100%",
    alignSelf: "center",
  },
  animatedStyle: {
    top: "30%",
    left: 15,
    position: "absolute",
    borderRadius: 90,
    zIndex: 10,
  },
});
