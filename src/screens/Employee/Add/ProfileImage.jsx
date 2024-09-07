import React, {useEffect, useState} from "react";
import {Text, View, StyleSheet, Image, TouchableOpacity} from "react-native";
import {CustomButton} from "../../../components";
import icons from "../../../assets/icons";
import images from "../../../assets/images";
import ImagePicker from "react-native-image-crop-picker";
import {useNavigation} from "@react-navigation/native";
import {
  useUpdateProfileImageMutation,
  useGetUserInfoQuery,
} from "../../../services/api/user";

const ProfileImage = ({handleNextTab}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [updateProfileImage] = useUpdateProfileImageMutation();
  const {data: userData} = useGetUserInfoQuery();
  const navigation = useNavigation();

  useEffect(() => {
    if (userData?.user?.profileImage) {
      setIsImageSelected(true);
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
        setSelectedImage(base64Image);
        setIsImageSelected(true);
      })
      .catch(error => {
        console.error("Error picking image: ", error);
      });
  };

  const handleImageUpload = async () => {
    if (!isImageSelected) return;

    if (!selectedImage) return handleNextTab();

    try {
      const {data, error} = await updateProfileImage({
        profileImage: selectedImage,
      });

      if (error) {
        Burnt.alert({
          title: error?.data?.message,
          preset: "error",
        });
        console.log(error.data.message);
      } else if (data) {
        Burnt.alert({
          title: data.message,
          preset: "done",
        });
        console.log(data?.message);
        handleNextTab();
      }
    } catch (error) {}
  };

  return (
    <View className="h-[85vh]">
      <Text className="text-center text-primary font-poppins-medium text-lg">
        Profile Image
      </Text>
      <View className="p-5">
        <View
          className="h-[220px] flex justify-center w-full rounded-lg"
          style={styles.dashedBorder}>
          {selectedImage ? (
            <Image
              source={{uri: selectedImage}}
              className="m-auto w-full h-full"
              resizeMode="contain"
            />
          ) : userData?.user?.profileImage ? (
            <Image
              source={{uri: userData.user.profileImage}}
              className="m-auto w-full h-full"
              resizeMode="contain"
              onError={error =>
                console.log(
                  "Failed to load profile image",
                  error.nativeEvent.error,
                )
              }
            />
          ) : (
            <Image
              source={icons.upload}
              className="w-[28px] h-[28px] m-auto"
              resizeMode="contain"
            />
          )}
        </View>
        {!isImageSelected ? (
          <Text className="text-red-600 text-center font-poppins-medium mt-1 text-md">
            Profile image is required
          </Text>
        ) : (
          <Text className="mt-1" />
        )}
        <View className="px-16">
          <Text className="text-center text-black font-poppins-medium mt-2 text-lg">
            or
          </Text>
          <CustomButton
            containerStyles={"mt-4 rounded-full py-3"}
            title={"Browse"}
            handleOnPress={handleChooseGalleryImage}
          />
        </View>
      </View>
      <View className="w-full absolute flex flex-row justify-evenly p-4 bottom-0">
        <TouchableOpacity
          className={`border border-gray bg-[#EBEBEB] rounded-full px-8 py-2`}
          onPress={() => {
            navigation.navigate("EmployeeAdd");
          }}>
          <Text
            className={`text-gray text-center my-auto text-xl font-poppins-medium`}>
            <Image
              source={images.prevArrow}
              className="w-[22px] h-[18px]"
              resizeMethod="contain"
            />{" "}
            Back
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`bg-primary flex justify-center rounded-full px-8 py-3`}
          onPress={handleImageUpload}>
          <Text
            className={`text-white text-center my-auto text-xl font-poppins-medium`}>
            Next{" "}
            <Image
              source={images.nextArrow}
              className="w-[22px] h-[18px]"
              resizeMethod="contain"
            />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileImage;

const styles = StyleSheet.create({
  dashedBorder: {
    borderWidth: 2,
    borderColor: "gray",
    borderStyle: "dashed",
  },
});
