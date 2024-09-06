import {useDeleteUserMutation, useGetUserByIdQuery} from "../services/api/user";
import {Text, TouchableOpacity, Image, ScrollView, View} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";
import {CustomButton, Loader, ProjectCard} from "../components";
import {useApproveAnEmployeeQuery} from "../services/api/user";
import {SafeAreaView} from "react-native-safe-area-context";
import DeleteModal from "../components/DeleteModal";
import React, {useState} from "react";
import images from "../assets/images";
import icons from "../assets/icons";

const EmployeeView = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {id} = route.params;
  const [isApproved, setIsApproved] = useState(false);
  const {data: userData, isLoading, refetch} = useGetUserByIdQuery(id);
  const [isDelete, setIsDelete] = useState(false);
  const [deleteEmployee] = useDeleteUserMutation();
  const {data, isLoading: isEmployeeApproveLogin} = useApproveAnEmployeeQuery(
    id,
    {skip: isApproved},
  );

  const handleDelete = async () => {
    try {
      setIsDelete(false);
      const {data, error} = await deleteEmployee(employee._id);
      if (data) {
        console.log(data?.message);
        setShowAlert({
          visible: true,
          type: "success",
          message: data?.message,
          handleClose: () => {
            setShowAlert({visible: false});
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
  };

  const handleApprove = () => {
    setIsApproved(false);
    refetch();
  };

  if (isLoading || isEmployeeApproveLogin) return <Loader />;

  return (
    <SafeAreaView>
      {/* Header with back button and title */}
      <View className="flex justify-between flex-row px-4 items-center">
        <TouchableOpacity
          className="flex flex-row items-center py-5"
          onPress={() => {
            navigation.navigate("Dashboard");
          }}>
          <Image
            source={icons.backArrow}
            className="w-7 h-7"
            resizeMethod="contain"
          />
          <Text className="text-black text-3xl font-ubuntu-bold ml-2">
            Employee View
          </Text>
        </TouchableOpacity>
        <View className="flex flex-row items-center gap-2">
          <TouchableOpacity
            onPress={() => {
              setIsDelete(true);
            }}
            className="border border-red rounded-full p-2">
            <Image
              source={icons.trash}
              className="w-[20px] h-[20px]"
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* EmployeeView and Department Section */}
      <ScrollView className="px-6 pt-6 h-full">
        <View className="flex flex-row gap-3">
          {userData?.user?.profileImage ? (
            <Image
              source={{uri: userData?.user?.profileImage}}
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
              {userData?.user?.name}
            </Text>
            <View className="flex flex-row gap-2 items-center">
              <Text className="text-black font-poppins-medium">Department</Text>
              <Text className="bg-[#5a2adc33] text-black text-center px-2 py-1 rounded-full font-poppins-medium">
                {userData?.user?.additionalInformation?.department}
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
              {userData?.user?.additionalInformation?.employementType}
            </Text>
          </View>

          {/* EmployeeView Information */}
          <View className="space-y-4">
            {/* Full name */}
            <View className="flex flex-row border-b border-light-gray pb-3">
              <Text className="w-[140px] text-gray font-poppins-medium">
                FULL NAME
              </Text>
              <Text className="w-2/3 text-black font-poppins-medium">
                {userData?.user?.name}
              </Text>
            </View>

            {/* Email */}
            <View className="flex flex-row border-b border-light-gray pb-3">
              <Text className="w-[140px] text-gray font-poppins-medium">
                EMAIL
              </Text>
              <Text className="w-2/3 text-black font-poppins-medium">
                {userData?.user?.email}
              </Text>
            </View>

            {/* Phone */}
            <View className="flex flex-row border-b border-light-gray pb-3">
              <Text className="w-[140px] text-gray font-poppins-medium">
                PHONE
              </Text>
              <Text className="w-2/3 text-black font-poppins-medium">
                {userData?.user?.mobileNumber}
              </Text>
            </View>

            {/* Alternate Phone */}
            <View className="flex flex-row border-b border-light-gray pb-3">
              <Text className="w-[140px] text-gray font-poppins-medium">
                ALTERNATE PHONE
              </Text>
              <Text className="w-2/3 text-black font-poppins-medium">
                {userData?.user?.alternateMobileNumber}
              </Text>
            </View>

            {/* Date of Birth */}
            <View className="flex flex-row border-b border-light-gray pb-3">
              <Text className="w-[140px] text-gray font-poppins-medium">
                DATE OF BIRTH
              </Text>
              <Text className="w-2/3 text-black font-poppins-medium">
                {userData?.user?.dateOfBirth?.split("T")[0]}
              </Text>
            </View>

            {/* Address */}
            <View className="flex flex-row pb-3">
              <Text className="w-[140px] text-gray font-poppins-medium">
                ADDRESS
              </Text>
              <Text className="w-2/3 text-black font-poppins-medium">
                {userData?.user?.address}
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

          {/* EmployeeView Information */}
          <View className="space-y-4">
            {/* Full name */}
            <View className="flex flex-row border-b border-light-gray pb-3">
              <Text className="w-[140px] text-gray font-poppins-medium">
                LINKEDIN
              </Text>
              <Text className="w-2/3 text-black font-poppins-medium">
                {userData?.user?.additionalInformation?.linkedIn}
              </Text>
            </View>

            {/* Email */}
            <View className="flex flex-row border-b border-light-gray pb-3">
              <Text className="w-[140px] text-gray font-poppins-medium">
                JOINING DATE
              </Text>
              <Text className="w-2/3 text-black font-poppins-medium">
                {
                  userData?.user?.additionalInformation?.joiningDate?.split(
                    "T",
                  )[0]
                }
              </Text>
            </View>

            {/* Phone */}
            <View className="flex flex-row border-b border-light-gray pb-3">
              <Text className="w-[140px] text-gray font-poppins-medium">
                EDUCATION
              </Text>
              <Text className="w-2/3 text-black font-poppins-medium">
                {userData?.user?.additionalInformation?.education}
              </Text>
            </View>

            {/* Alternate Phone */}
            <View className="flex flex-row border-b border-light-gray pb-3">
              <Text className="w-[140px] text-gray font-poppins-medium">
                DEPARTMENT
              </Text>
              <Text className="w-2/3 text-black font-poppins-medium">
                {userData?.user?.additionalInformation?.department}
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
                {userData?.user?.bankDetails?.bankName}
              </Text>
            </View>

            {/* Branch Name */}
            <View className="flex flex-row border-b border-light-gray pb-3">
              <Text className="w-[140px] text-gray font-poppins-medium">
                BRANCH NAME
              </Text>
              <Text className="w-2/3 text-black font-poppins-medium">
                {userData?.user?.bankDetails?.branchName}
              </Text>
            </View>

            {/* Account Holder */}
            <View className="flex flex-row border-b border-light-gray pb-3">
              <Text className="w-[140px] text-gray font-poppins-medium">
                ACCOUNT HOLDER
              </Text>
              <Text className="w-2/3 text-black font-poppins-medium">
                {userData?.user?.bankDetails?.accountHolderName}
              </Text>
            </View>

            {/* Account Number */}
            <View className="flex flex-row border-b border-light-gray pb-3">
              <Text className="w-[140px] text-gray font-poppins-medium">
                ACCOUNT NUMBER
              </Text>
              <Text className="w-2/3 text-black font-poppins-medium">
                {userData?.user?.bankDetails?.accountNumber}
              </Text>
            </View>
            {/* IFSC CODE */}
            <View className="flex flex-row border-b border-light-gray pb-3">
              <Text className="w-[140px] text-gray font-poppins-medium">
                IFSC CODE
              </Text>
              <Text className="w-2/3 text-black font-poppins-medium">
                {userData?.user?.bankDetails?.ifsc}
              </Text>
            </View>
          </View>
        </View>
        {userData?.user?.isVerified ? (
          <View>
            <View className="my-5">
              <Text className="text-black font-poppins-medium text-2xl">
                Project Details
              </Text>
            </View>
            <View>
              <ProjectCard
                name={"Marble Galaxy"}
                date={"Sep,23 2024"}
                technology={"React JS"}
              />
              <ProjectCard
                name={"Marble Galaxy"}
                date={"Sep,23 2024"}
                technology={"React JS"}
              />
            </View>
            <View className="py-4 mb-4">
              <CustomButton
                title={"+ Assign New Project"}
                containerStyles={"rounded-full py-4"}
              />
            </View>
          </View>
        ) : (
          <View className="flex flex-row gap-2 justify-evenly py-5">
            <TouchableOpacity
              className={`border border-gray w-[45%] bg-[#EBEBEB] rounded-full px-8 py-2`}>
              <Text
                className={`text-gray text-center my-auto text-xl font-poppins-medium`}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`bg-primary flex w-[45%] justify-center rounded-full px-8 py-3`}
              onPress={handleApprove}>
              <Text
                className={`text-white text-center my-auto text-xl font-poppins-medium`}>
                Approve
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <View className="mb-24"></View>
      </ScrollView>
      <DeleteModal
        visible={isDelete}
        title={userData?.user?.name}
        handleClose={() => {
          setIsDelete(false);
        }}
        handleYes={handleDelete}
      />
    </SafeAreaView>
  );
};

export default EmployeeView;
