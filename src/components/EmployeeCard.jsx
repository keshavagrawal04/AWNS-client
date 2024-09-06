import {Text, View, Image, TouchableOpacity} from "react-native";
import React, {useState} from "react";
import images from "../assets/images";
import icons from "../assets/icons";
import CustomAlert from "./CustomAlert";
import {useDeleteUserMutation} from "../services/api/user";
import DeleteModal from "./DeleteModal";

const EmployeeCard = ({employee, isSelected}) => {
  const [isDelete, setIsDelete] = useState(false);
  const [showAlert, setShowAlert] = useState({visible: false});
  const [deleteEmployee] = useDeleteUserMutation();

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

  return (
    <View
      className={`rounded-lg px-5 py-8 ${
        isSelected
          ? "border-2 border-primary bg-[#bad0ff33]"
          : "border-2 border-white bg-white"
      }`}>
      <View className="flex flex-row gap-2 overflow-hidden mb-2">
        {employee?.profileImage ? (
          <Image
            source={{uri: employee?.profileImage}}
            className="w-[50px] h-[50px] rounded-full"
            resizeMode="contain"
          />
        ) : (
          <Image
            source={images.profile}
            className="w-[50px] h-[50px] rounded-full"
            resizeMode="contain"
          />
        )}
        <View className="border-b border-light-gray w-full pb-1">
          <Text className="text-black font-poppins-bold text-xl">
            {employee?.name}
          </Text>
          <Text className="text-gray font-poppins-medium">
            {employee?.additionalInformation?.department}
          </Text>
        </View>
      </View>
      <View className="mt-3">
        <View className="flex flex-row gap-4">
          <Text className="text-black font-poppins-bold">Email</Text>
          <View className="flex flex-row justify-center">
            <Image className="w-[20px] h-[20px]" source={icons.emailGray} />
            <Text className="text-gray font-poppins-medium">
              {"   "}
              {employee.email}
            </Text>
          </View>
        </View>
        <View className="flex flex-row gap-4 pt-2">
          <Text className="text-black font-poppins-bold text-sm">Mob. </Text>
          <View className="flex flex-row items-center">
            <Image className="w-[20px] h-[20px]" source={icons.callGray} />
            <Text className="text-gray font-poppins-medium">
              {"   "}
              +91 {employee.mobileNumber}
            </Text>
          </View>
        </View>
      </View>
      <View className="flex flex-row items-center space-x-3 absolute bottom-5 right-4">
        <TouchableOpacity
          className="border border-red rounded-full p-1"
          onPress={() => {
            setIsDelete(true);
          }}>
          <Image className="w-[20px] h-[20px]" source={icons.trash} />
        </TouchableOpacity>
      </View>
      <DeleteModal
        visible={isDelete}
        title={employee.name}
        handleClose={() => {
          setIsDelete(false);
        }}
        handleYes={handleDelete}
      />
      <CustomAlert
        visible={showAlert.visible}
        handleClose={showAlert.handleClose}
        type={showAlert.type}
        message={showAlert.message}
      />
    </View>
  );
};

export default EmployeeCard;
