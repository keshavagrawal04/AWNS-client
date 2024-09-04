import {Image, Text, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import icons from "../assets/icons";
import {useNavigation} from "@react-navigation/native";
import {useDeleteMeetingMutation} from "../services/api/meeting";
import DeleteModal from "./DeleteModal";
import CustomAlert from "./CustomAlert";

const MeetingCard = ({
  id = "",
  title,
  link,
  date,
  purpose,
  actions = false,
}) => {
  const navigation = useNavigation();
  const [deleteMeeting] = useDeleteMeetingMutation();
  const [showAlert, setShowAlert] = useState({visible: false});
  const [deleteMeet, setDeleteMeet] = useState(false);

  const handleDelete = async () => {
    try {
      setDeleteMeet(false);
      const {data, error} = await deleteMeeting(id);
      if (data) {
        console.log(data?.message);
        setShowAlert({
          visible: true,
          type: "success",
          message: data?.message,
          handleClose: () => {
            navigation.navigate("Dashboard");
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
    <View className="rounded-xl bg-white p-5 border border-light-gray">
      <View className="flex justify-between flex-row mb-3">
        <Text className="text-lg text-black font-poppins-bold mb-3">
          {title}
        </Text>
        {actions && (
          <View className="flex flex-row gap-2">
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("UpdateMeeting", {id: id});
              }}
              className="h-[35px] w-[35px] rounded-full border border-primary p-2">
              <Image source={icons.edit} className="h-full w-full" />
            </TouchableOpacity>
            <TouchableOpacity
              className="h-[35px] w-[35px] rounded-full border border-red p-2"
              onPress={() => {
                setDeleteMeet(true);
              }}>
              <Image source={icons.trash} className="h-full w-full" />
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View>
        <View className="flex-row items-center">
          <View className="w-1/3">
            <Text className="text-gray font-poppins-medium">LINK</Text>
          </View>
          <View className="w-2/3">
            <Text className="text-primary underline font-poppins-medium">
              {link}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center">
          <View className="w-1/3">
            <Text className="text-gray font-poppins-medium">DATE</Text>
          </View>
          <View className="w-2/3">
            <Text className="text-black font-poppins-medium">{date}</Text>
          </View>
        </View>

        <View className="flex-row items-center">
          <View className="w-1/3">
            <Text className="text-gray font-poppins-medium">PURPOSE</Text>
          </View>
          <View className="w-2/3">
            <Text className="text-black font-poppins-medium">{purpose}</Text>
          </View>
        </View>
      </View>
      <DeleteModal
        title={title}
        visible={deleteMeet}
        handleClose={() => {
          setDeleteMeet(false);
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

export default MeetingCard;
