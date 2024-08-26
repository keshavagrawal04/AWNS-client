import React, {useState, useRef} from "react";
import {View, TextInput} from "react-native";

const OtpInput = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    let newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 3) {
      inputs.current[index + 1].focus();
    }
    if (!text && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleKeyPress = ({nativeEvent}, index) => {
    if (nativeEvent.key === "Backspace" && index > 0 && !otp[index]) {
      inputs.current[index - 1].focus();
    }
  };

  return (
    <View className="flex-row justify-between mx-5">
      {otp.map((digit, index) => (
        <TextInput
          className="border border-[#C5C5C5] rounded-md text-lg w-[68] h-[68]"
          key={index}
          ref={ref => (inputs.current[index] = ref)}
          placeholder="X"
          placeholderTextColor={"#C5C5C5"}
          value={digit}
          onChangeText={text => handleChange(text, index)}
          onKeyPress={event => handleKeyPress(event, index)}
          keyboardType="number-pad"
          maxLength={1}
          textAlign="center"
        />
      ))}
    </View>
  );
};

export default OtpInput;
