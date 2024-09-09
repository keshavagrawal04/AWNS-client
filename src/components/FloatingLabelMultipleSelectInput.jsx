import React, {useRef, useState, useEffect} from "react";
import {View, Text, Animated, StyleSheet, TouchableOpacity} from "react-native";
import {MultiSelect} from "react-native-element-dropdown";
import {getIn} from "formik";

const FloatingLabelMultipleSelectInput = ({
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
    if (getIn(formik.values, id)?.length > 0) return;
    transformAnimation(-10);
    animatedBorderColor(1);
    setIsFocused(false);
  };

  useEffect(() => {
    if (getIn(formik.values, id)?.length > 0) {
      handleOnFocus();
    } else {
      handleOnBlur();
    }
  }, [getIn(formik.values, id)]);

  const handleSelect = selectedItem => {
    formik.setFieldValue(id, selectedItem);
  };

  const renderItem = item => (
    <View style={styles.item}>
      <Text style={styles.selectedTextStyle}>{item.label}</Text>
    </View>
  );

  return (
    <View style={{marginBottom: 16}}>
      <Animated.View
        style={[styles.container, {borderColor: borderColorAnimation}]}>
        <Animated.View
          style={[styles.labelContainer, {transform: [{translateY: transY}]}]}>
          <Animated.Text
            style={{
              color: labelColorAnimation,
              backgroundColor: "white",
              paddingHorizontal: 4,
            }}>
            {label}
          </Animated.Text>
        </Animated.View>

        <MultiSelect
          style={[styles.dropdown, inputStyles]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={Array.isArray(data) ? data : []}
          labelField="label"
          valueField="value"
          placeholder=""
          value={formik.values[id] || []}
          onChange={selectedItems => {
            formik.setFieldValue(
              id,
              selectedItems.map(item => item?.value),
            );
          }}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          renderItem={renderItem}
          renderSelectedItem={(item, unSelect) => (
            <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
              <View style={styles.selectedStyle}>
                <Text style={styles.textSelectedStyle}>{item.label}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </Animated.View>

      {formik.touched[id] && formik.errors[id] ? (
        <Text style={styles.errorText}>{formik.errors[id]}</Text>
      ) : (
        <Text style={{height: 24}} />
      )}
    </View>
  );
};

export default FloatingLabelMultipleSelectInput;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  labelContainer: {
    position: "absolute",
    left: 12,
    top: 12,
    backgroundColor: "white",
    paddingHorizontal: 4,
    zIndex: 1,
  },
  dropdown: {
    height: 50,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "gray",
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    backgroundColor: "white",
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 8,
  },
});
