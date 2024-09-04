import {Text, TouchableOpacity, Image, ScrollView, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import icons from "../../../assets/icons";
import {useNavigation} from "@react-navigation/native";
import {
  useGetUserInfoQuery,
  useUpdateUserMutation,
} from "../../../services/api/user";
import ImagePicker from "react-native-image-crop-picker";
import {
  CustomAlert,
  CustomButton,
  FloatingLabelDateInput,
  FloatingLabelTextInput,
  Loader,
} from "../../../components";
import {useFormik} from "formik";
import {profileSchema} from "../../../schema/Employee";
import {useEffect, useState} from "react";
import images from "../../../assets/images";

const UpdateProfile = () => {
  const navigation = useNavigation();
  const {data: userData, isLoading} = useGetUserInfoQuery();
  const [updateProfile, {isLoading: isUpdateLoading}] = useUpdateUserMutation();
  const [showAlert, setShowAlert] = useState({visible: false});

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobileNumber: "",
      alternateMobileNumber: "",
      address: "",
      dateOfBirth: "",
      profileImage: "",
      additionalInformation: {
        linkedIn: "",
        employementType: "",
        joiningDate: "",
        education: "",
        department: "",
      },
      bankDetails: {
        bankName: "",
        branchName: "",
        accountHolderName: "",
        ifsc: "",
        accountNumber: "",
      },
      role: "employee",
    },
    validationSchema: profileSchema,
    onSubmit: async values => {
      try {
        const {data, error} = await updateProfile(values);
        if (data) {
          console.log(data?.message);
          setShowAlert({
            visible: true,
            type: "success",
            message: data?.message,
            handleClose: () => {
              setShowAlert({visible: false});
              navigation.navigate("Profile");
            },
          });
        } else {
          console.log(error.data.message);
          setShowAlert({
            visible: true,
            type: "error",
            message: error?.data?.message,
            handleClose: () => {
              setShowAlert({visible: false});
            },
          });
        }
      } catch (error) {
        console.log(error.message);
      }
    },
  });

  useEffect(() => {
    if (userData?.user) {
      const {
        name,
        email,
        mobileNumber,
        alternateMobileNumber,
        address,
        dateOfBirth,
        profileImage,
        additionalInformation,
        bankDetails,
      } = userData.user;

      formik.setValues({
        name: name || "",
        email: email || "",
        mobileNumber: mobileNumber || "",
        alternateMobileNumber: alternateMobileNumber || "",
        address: address || "",
        dateOfBirth: dateOfBirth?.split("T")[0] || "",
        profileImage: profileImage || "",
        additionalInformation: {
          linkedIn: additionalInformation?.linkedIn || "",
          employementType: additionalInformation?.employementType || "",
          joiningDate: additionalInformation?.joiningDate?.split("T")[0] || "",
          education: additionalInformation?.education || "",
          department: additionalInformation?.department || "",
        },
        bankDetails: {
          bankName: bankDetails?.bankName || "",
          branchName: bankDetails?.branchName || "",
          accountHolderName: bankDetails?.accountHolderName || "",
          ifsc: bankDetails?.ifsc || "",
          accountNumber: bankDetails?.accountNumber || "",
        },
      });
    }
  }, [userData?.user]);

  const handleChooseGalleryImage = async () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
      includeBase64: true,
      cropperCircleOverlay: true,
      avoidEmptySpaceAroundImage: true,
      freeStyleCropEnabled: true,
    })
      .then(image => {
        const base64Image = `data:${image.mime};base64,${image.data}`;
        formik.setFieldValue("profileImage", base64Image);
      })
      .catch(error => {
        console.log("Error picking image: ", error);
      });
  };

  if (isLoading || isUpdateLoading) return <Loader />;

  return (
    <SafeAreaView>
      <View className="flex justify-between flex-row px-4 items-center">
        <TouchableOpacity
          className="flex flex-row items-center py-5"
          onPress={() => {
            navigation.navigate("EmployeeDashboard");
          }}>
          <Image
            source={icons.backArrow}
            className="w-7 h-7"
            resizeMethod="contain"
          />
          <Text className="text-black text-3xl font-ubuntu-bold ml-2">
            Update Profile
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView className="px-5">
        <View>
          <Text className="text-primary font-poppins-medium text-2xl">
            Profile Image
          </Text>
          <View className="flex items-center py-8">
            <View className="relative h-[140px] w-[140px] rounded-full border-4 border-primary justify-center items-center overflow-visible">
              {formik.values.profileImage ? (
                <Image
                  source={{uri: formik.values.profileImage}}
                  className="h-full w-full rounded-full"
                  resizeMode="cover"
                />
              ) : (
                <Image
                  source={images.profile}
                  className="h-full w-full rounded-full"
                  resizeMode="cover"
                />
              )}
              <TouchableOpacity
                onPress={handleChooseGalleryImage}
                className="absolute bottom-0 right-0 rounded-full bg-primary p-2 flex items-center justify-center">
                <Image
                  className="w-[20px] h-[20px]"
                  source={icons.editWhite}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View>
          <Text className="text-primary font-poppins-medium text-2xl py-2">
            Personal Details
          </Text>
          <View className="mt-4">
            <FloatingLabelTextInput
              id="name"
              label="Name"
              formik={formik}
              inputStyles={"py-4"}
            />
            <FloatingLabelTextInput
              id="email"
              label="Email"
              formik={formik}
              inputStyles={"py-4"}
            />
            <FloatingLabelTextInput
              id="mobileNumber"
              label="Mobile Number"
              formik={formik}
              inputStyles={"py-4"}
            />
            <FloatingLabelTextInput
              id="alternateMobileNumber"
              label="Alternate Mobile Number"
              formik={formik}
              inputStyles={"py-4"}
            />
            <FloatingLabelDateInput
              id="dateOfBirth"
              label="Date of Birth"
              formik={formik}
              inputStyles={"py-4"}
            />
            <FloatingLabelTextInput
              id="address"
              label="Address"
              formik={formik}
              inputStyles={"py-4"}
              isTextArea
              numberOfLines={6}
            />
          </View>
        </View>

        {/* Additional Information */}
        <View>
          <Text className="text-primary font-poppins-medium text-2xl py-4">
            Additional Details
          </Text>
          <View className="mt-4">
            <FloatingLabelTextInput
              id="additionalInformation.linkedIn"
              label="LinkedIn"
              formik={formik}
              inputStyles={"py-4"}
            />
            <FloatingLabelTextInput
              id="additionalInformation.employementType"
              label="Employment Type"
              formik={formik}
              inputStyles={"py-4"}
            />
            <FloatingLabelDateInput
              id="additionalInformation.joiningDate"
              label="Joining Date"
              formik={formik}
              inputStyles={"py-4"}
            />
            <FloatingLabelTextInput
              id="additionalInformation.education"
              label="Education"
              formik={formik}
              inputStyles={"py-4"}
            />
            <FloatingLabelTextInput
              id="additionalInformation.department"
              label="Department"
              formik={formik}
              inputStyles={"py-4"}
            />
          </View>
        </View>

        {/* Bank Information */}
        <View>
          <Text className="text-primary font-poppins-medium text-xl py-4">
            Bank Details
          </Text>
          <View className="mt-4">
            <FloatingLabelTextInput
              id="bankDetails.bankName"
              label="Bank Name"
              formik={formik}
              inputStyles={"py-4"}
            />
            <FloatingLabelTextInput
              id="bankDetails.branchName"
              label="Branch Name"
              formik={formik}
              inputStyles={"py-4"}
            />
            <FloatingLabelTextInput
              id="bankDetails.accountHolderName"
              label="Account Holder Name"
              formik={formik}
              inputStyles={"py-4"}
            />
            <FloatingLabelTextInput
              id="bankDetails.ifsc"
              label="IFSC"
              formik={formik}
              inputStyles={"py-4"}
            />
            <FloatingLabelTextInput
              id="bankDetails.accountNumber"
              label="Account Number"
              formik={formik}
              inputStyles={"py-4"}
            />
          </View>
        </View>
        <CustomButton
          title={"Save"}
          containerStyles={"py-3 rounded-full"}
          handleOnPress={formik.handleSubmit}
        />
        <View className="h-10px mt-28"></View>
      </ScrollView>
      <CustomAlert
        visible={showAlert.visible}
        handleClose={showAlert.handleClose}
        type={showAlert.type}
        message={showAlert.message}
      />
    </SafeAreaView>
  );
};

export default UpdateProfile;
