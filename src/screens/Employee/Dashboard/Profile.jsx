import {Text, TouchableOpacity, Image, ScrollView, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import icons from "../../../assets/icons";
import {useNavigation} from "@react-navigation/native";
import {useGetUserInfoQuery} from "../../../services/api/user";
import {Loader, LogoutModal} from "../../../components";
import images from "../../../assets/images";
import {useAuth} from "../../../hooks";
import React, {useState} from "react";

const Profile = () => {
  const navigation = useNavigation();
  const {data: userData, isLoading} = useGetUserInfoQuery();
  const {logout} = useAuth();
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const {user} = userData;

  if (isLoading) return <Loader />;

  return (
    <SafeAreaView>
      {/* Header with back button and title */}
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
            Profile
          </Text>
        </TouchableOpacity>
        <View className="flex flex-row items-center gap-2">
          <TouchableOpacity
            className="border border-primary rounded-full p-2"
            onPress={() => {
              navigation.navigate("UpdateProfile");
            }}>
            <Image
              source={icons.edit}
              className="w-[20px] h-[20px]"
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            className="rounded-md p-2 flex flex-row bg-[#ed2e2e1a] items-center justify-center"
            onPress={() => {
              setIsLogoutModalVisible(true);
            }}>
            <Image
              source={icons.logout}
              className="w-[20px] h-[20px] my-auto"
              resizeMode="contain"
            />
            <Text className="text-red font-poppins-medium ml-1">Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Profile and Department Section */}
      <ScrollView className="px-6 pt-6 h-full">
        <View className="flex flex-row gap-3">
          {user?.profileImage ? (
            <Image
              source={{uri: user?.profileImage}}
              className="w-[72px] h-[72px] rounded-full"
              resizeMethod="contain"
            />
          ) : (
            <Image
              source={images.profile}
              className="w-[62px] h-[62px] rounded-full"
              resizeMethod="contain"
            />
          )}
          <View className="flex justify-center">
            <Text className="text-black font-poppins-medium text-xl pb-2">
              {user?.name}
            </Text>
            <View className="flex flex-row gap-2 items-center">
              <Text className="text-black font-poppins-medium">Department</Text>
              <Text className="bg-[#5a2adc33] text-black text-center px-2 py-1 rounded-full font-poppins-medium">
                {user?.department}
              </Text>
            </View>
          </View>
        </View>

        {/* Personal Details Section */}
        <View className="mt-8 rounded-lg bg-white px-4 py-5 shadow-sm">
          <View className="flex flex-row justify-between items-center mb-4">
            <Text className="text-black font-poppins-medium text-lg">
              Personal Details
            </Text>
            <Text className="font-poppins-medium text-md text-green bg-[#03d15533] px-4 py-1 rounded-full">
              {user?.additionalInformation?.employementType}
            </Text>
          </View>

          {/* Profile Information */}
          <View className="space-y-4">
            {/* Full name */}
            <View className="flex flex-row border-b border-light-gray pb-3">
              <Text className="w-[140px] text-gray font-poppins-medium">
                FULL NAME
              </Text>
              <Text className="w-2/3 text-black font-poppins-medium">
                {user?.name}
              </Text>
            </View>

            {/* Email */}
            <View className="flex flex-row border-b border-light-gray pb-3">
              <Text className="w-[140px] text-gray font-poppins-medium">
                EMAIL
              </Text>
              <Text className="w-2/3 text-black font-poppins-medium">
                {user?.email}
              </Text>
            </View>

            {/* Phone */}
            <View className="flex flex-row border-b border-light-gray pb-3">
              <Text className="w-[140px] text-gray font-poppins-medium">
                PHONE
              </Text>
              <Text className="w-2/3 text-black font-poppins-medium">
                {user?.mobileNumber}
              </Text>
            </View>

            {/* Alternate Phone */}
            <View className="flex flex-row border-b border-light-gray pb-3">
              <Text className="w-[140px] text-gray font-poppins-medium">
                ALTERNATE PHONE
              </Text>
              <Text className="w-2/3 text-black font-poppins-medium">
                {user?.alternateMobileNumber}
              </Text>
            </View>

            {/* Date of Birth */}
            <View className="flex flex-row border-b border-light-gray pb-3">
              <Text className="w-[140px] text-gray font-poppins-medium">
                DATE OF BIRTH
              </Text>
              <Text className="w-2/3 text-black font-poppins-medium">
                {user?.dateOfBirth.split("T")[0]}
              </Text>
            </View>

            {/* Address */}
            <View className="flex flex-row pb-3">
              <Text className="w-[140px] text-gray font-poppins-medium">
                ADDRESS
              </Text>
              <Text className="w-2/3 text-black font-poppins-medium">
                {user?.address}
              </Text>
            </View>
          </View>
        </View>

        {/* Additional Details Section */}
        <View className="mt-4 rounded-lg bg-white px-4 py-5 shadow-sm">
          <View className="mb-4">
            <Text className="text-black font-poppins-medium text-lg">
              Additional Details
            </Text>
          </View>

          {/* Profile Information */}
          <View className="space-y-4">
            {/* Full name */}
            <View className="flex flex-row border-b border-light-gray pb-3">
              <Text className="w-[140px] text-gray font-poppins-medium">
                LINKEDIN
              </Text>
              <Text className="w-2/3 text-black font-poppins-medium">
                {user?.additionalInformation?.linkedIn}
              </Text>
            </View>

            {/* Email */}
            <View className="flex flex-row border-b border-light-gray pb-3">
              <Text className="w-[140px] text-gray font-poppins-medium">
                JOINING DATE
              </Text>
              <Text className="w-2/3 text-black font-poppins-medium">
                {user?.additionalInformation?.joiningDate.split("T")[0]}
              </Text>
            </View>

            {/* Phone */}
            <View className="flex flex-row border-b border-light-gray pb-3">
              <Text className="w-[140px] text-gray font-poppins-medium">
                EDUCATION
              </Text>
              <Text className="w-2/3 text-black font-poppins-medium">
                {user?.additionalInformation?.education}
              </Text>
            </View>

            {/* Alternate Phone */}
            <View className="flex flex-row border-b border-light-gray pb-3">
              <Text className="w-[140px] text-gray font-poppins-medium">
                DEPARTMENT
              </Text>
              <Text className="w-2/3 text-black font-poppins-medium">
                {user?.additionalInformation?.department}
              </Text>
            </View>
          </View>
        </View>

        {/* Bank Details Section */}
        <View className="mt-4 rounded-lg bg-white px-4 py-5 shadow-sm">
          <View className="mb-4">
            <Text className="text-black font-poppins-medium text-lg">
              Bank Details
            </Text>
          </View>

          <View className="space-y-4">
            {/* Bank name */}
            <View className="flex flex-row border-b border-light-gray pb-3">
              <Text className="w-[140px] text-gray font-poppins-medium">
                BANK NAME
              </Text>
              <Text className="w-2/3 text-black font-poppins-medium">
                {user?.bankDetails?.bankName}
              </Text>
            </View>

            {/* Branch Name */}
            <View className="flex flex-row border-b border-light-gray pb-3">
              <Text className="w-[140px] text-gray font-poppins-medium">
                BRANCH NAME
              </Text>
              <Text className="w-2/3 text-black font-poppins-medium">
                {user?.bankDetails?.branchName}
              </Text>
            </View>

            {/* Account Holder */}
            <View className="flex flex-row border-b border-light-gray pb-3">
              <Text className="w-[140px] text-gray font-poppins-medium">
                ACCOUNT HOLDER
              </Text>
              <Text className="w-2/3 text-black font-poppins-medium">
                {user?.bankDetails?.accountHolderName}
              </Text>
            </View>

            {/* Account Number */}
            <View className="flex flex-row border-b border-light-gray pb-3">
              <Text className="w-[140px] text-gray font-poppins-medium">
                ACCOUNT NUMBER
              </Text>
              <Text className="w-2/3 text-black font-poppins-medium">
                {user?.bankDetails?.accountNumber}
              </Text>
            </View>
            {/* IFSC CODE */}
            <View className="flex flex-row border-b border-light-gray pb-3">
              <Text className="w-[140px] text-gray font-poppins-medium">
                IFSC CODE
              </Text>
              <Text className="w-2/3 text-black font-poppins-medium">
                {user?.bankDetails?.ifsc}
              </Text>
            </View>
          </View>
        </View>
        <View className="mb-24"></View>
      </ScrollView>
      <LogoutModal
        visible={isLogoutModalVisible}
        handleClose={() => {
          setIsLogoutModalVisible(prev => !prev);
        }}
        handleYes={() => {
          setIsLogoutModalVisible(prev => !prev);
          logout();
          navigation.navigate("Login");
        }}
      />
    </SafeAreaView>
  );
};

export default Profile;
