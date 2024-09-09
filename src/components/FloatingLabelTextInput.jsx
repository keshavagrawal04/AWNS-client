  import {
    StyleSheet,
    TextInput,
    Animated,
    TouchableOpacity,
    Easing,
    Image,
    Text,
  } from "react-native";
  import React, {useEffect, useRef, useState} from "react";
  import images from "../assets/images";
  import {getIn} from "formik";

  const FloatingLabelTextInput = ({
    label,
    labelColor = "black",
    duration = 200,
    id,
    formik,
    type = "default",
    inputStyles,
    isTextArea = false,
    numberOfLines = undefined,
    isPassword = false,
  }) => {
    const [isPasswordToggle, setIsPasswordToggle] = useState(isPassword);
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

    const handleOnFocus = () => {
      if (isTextArea) {
        transformAnimation(-20);
      } else {
        transformAnimation(-27.5);
      }
      animatedBorderWidth(2);
    };

    const handleOnBlur = () => {
      if (getIn(formik.values, id)?.toString()) return;
      transformAnimation(0);
      animatedBorderWidth(1);
    };

    useEffect(() => {
      if (getIn(formik.values, id)) {
        handleOnFocus();
      } else {
        handleOnBlur();
      }
    }, [getIn(formik.values, id)]);

    return (
      <>
        <Animated.View
          style={[
            styles.container,
            {borderWidth: 1, borderColor: borderColor, marginTop: 5},
          ]}>
          <Animated.View
            style={[
              styles.animatedStyle,
              animationStyle,
              {top: isTextArea ? "8%" : "30%"},
            ]}>
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
          <TextInput
            editable={true}
            blurOnSubmit
            autoCapitalize={`none`}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            value={getIn(formik.values, id)?.toString()}
            onChangeText={formik.handleChange(id)}
            className={`text-black font-poppins-regular px-5 rounded-md text-sm ${inputStyles}`}
            style={{textAlignVertical: `${isTextArea ? "top" : "center"}`}}
            keyboardType={type}
            multiline={isTextArea}
            numberOfLines={numberOfLines}
            secureTextEntry={isPasswordToggle}
          />
          {isPassword && (
            <TouchableOpacity
              className="absolute top-[16px] right-3"
              onPress={() => {
                setIsPasswordToggle(prev => !prev);
              }}>
              {!isPasswordToggle ? (
                <Image source={images.eye} className="w-6 h-6" />
              ) : (
                <Image source={images.eyeSlash} className="w-6 h-6" />
              )}
            </TouchableOpacity>
          )}
        </Animated.View>
        {getIn(formik.touched, id) && getIn(formik.errors, id) ? (
          <Text className="h-[22px] text-red text-md font-poppins-medium">
            {getIn(formik.errors, id)}
          </Text>
        ) : (
          <Text className="h-[22px]" />
        )}
      </>
    );
  };

  export default FloatingLabelTextInput;

  const styles = StyleSheet.create({
    container: {
      marginTop: 3,
      backgroundColor: "#F4F5F7",
      borderRadius: 8,
      width: "100%",
      alignSelf: "center",
    },
    animatedStyle: {
      left: 15,
      position: "absolute",
      borderRadius: 90,
      zIndex: 10,
    },
  });
