import {Text, View} from "react-native";
import React from "react";
import {CustomTextInput} from "../../components";
import {useFormik} from "formik";

const BankDetails = () => {
  const formik = useFormik({
    initialValues: {
      bankName: "",
      branchName: "",
      accountHolderName: "",
      accountNumber: "",
      ifsc: "",
    },
    onSubmit: async () => {},
  });

  return (
    <View>
      <Text className="text-center text-primary font-poppins-medium text-lg">
        Bank Details
      </Text>
      <View className="py-5 px-2">
        <CustomTextInput
          label={"Bank Name"}
          required
          placeholder={"Bank Name"}
          formik={formik}
          id="bankName"
        />
        <CustomTextInput
          label={"Branch Name"}
          required
          placeholder={"Branch Name"}
          formik={formik}
          id="branchName"
        />
        <CustomTextInput
          label={"Account Holder Name"}
          required
          placeholder={"Account Holder Name"}
          formik={formik}
          id="accountHolderName"
        />
        <CustomTextInput
          label={"Account Number"}
          required
          placeholder={"Account Number"}
          formik={formik}
          id="accountNumber"
        />
        <CustomTextInput
          label={"IFSC Code"}
          required
          placeholder={"IFSC Code"}
          formik={formik}
          id="ifsc"
        />
      </View>
    </View>
  );
};

export default BankDetails;
