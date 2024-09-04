import {Text, TouchableOpacity, Image, View, ScrollView} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useNavigation} from "@react-navigation/native";
import icons from "../assets/icons";
import {
  CustomAlert,
  CustomButton,
  FloatingLabelDateInput,
  FloatingLabelTextInput,
  FloatingLabelTimeInput,
  Loader,
} from "../components";
import {useFormik} from "formik";
import {meetingSchema} from "../schema/Meeting";
import {useRoute} from "@react-navigation/native";
import {
  useGetMeetingQuery,
  useUpdateMeetingMutation,
} from "../services/api/meeting";
import {useEffect, useState} from "react";

const UpdateMeeting = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {id} = route.params;
  const {data: meetingData, isLoading: isGetLoading} = useGetMeetingQuery(id);
  const [updateMeeting, {isLoading}] = useUpdateMeetingMutation();
  const [showAlert, setShowAlert] = useState({visible: false});

  const formik = useFormik({
    initialValues: {
      title: "",
      meetingLink: "",
      date: "",
      time: "",
      purpose: "",
    },
    validationSchema: meetingSchema,
    onSubmit: async values => {
      try {
        const payload = {
          data: values,
          id: id,
        };
        const {data, error} = await updateMeeting(payload);
        if (data) {
          console.log(data?.message);
          setShowAlert({
            visible: true,
            type: "success",
            message: data?.message,
            handleClose: () => {
              setShowAlert({visible: false});
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
    },
  });

  useEffect(() => {
    if (meetingData?.meeting) {
      formik.setValues({...meetingData?.meeting});
    }
  }, [meetingData?.meeting]);

  if (isLoading || isGetLoading) return <Loader />;

  return (
    <SafeAreaView>
      <View className="flex justify-between flex-row px-4 items-center">
        <TouchableOpacity
          className="flex flex-row items-center pt-5"
          onPress={() => {
            navigation.navigate("Dashboard");
          }}>
          <Image
            source={icons.backArrow}
            className="w-7 h-7"
            resizeMethod="contain"
          />
          <Text className="text-black text-3xl font-ubuntu-bold ml-2">
            Update Meet
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView className="px-4 mt-20 h-full">
        <FloatingLabelTextInput
          id="title"
          label="Meet Name"
          inputStyles={"py-4"}
          formik={formik}
        />
        <FloatingLabelTextInput
          id="meetingLink"
          label="Meet Link"
          inputStyles={"py-4"}
          formik={formik}
        />
        <FloatingLabelDateInput
          id="date"
          label="Date"
          inputStyles={"py-4"}
          formik={formik}
        />
        <FloatingLabelTimeInput
          id="time"
          label="Time"
          inputStyles={"py-4"}
          formik={formik}
        />
        <FloatingLabelTextInput
          id="purpose"
          label="Purpose"
          inputStyles={"py-4"}
          formik={formik}
          isTextArea
          numberOfLines={6}
        />
        <CustomButton
          title="Update"
          handleOnPress={formik.handleSubmit}
          containerStyles={"py-4 rounded-full mt-6"}
        />
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

export default UpdateMeeting;
