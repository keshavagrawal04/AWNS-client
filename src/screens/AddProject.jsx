import {Text, TouchableOpacity, Image, View, ScrollView} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useNavigation} from "@react-navigation/native";
import icons from "../assets/icons";
import {
  CustomAlert,
  CustomButton,
  FloatingLabelDateInput,
  FloatingLabelTextInput,
  FloatingLabelSelectInput,
  Loader,
} from "../components";
import {useFormik} from "formik";
import {useState} from "react";
import projectSchema from "../schema/Project";
import {useAddProjectMutation} from "../services/api/project";

const AddProject = () => {
  const navigation = useNavigation();
  const [addProject, {isLoading}] = useAddProjectMutation();
  const [showAlert, setShowAlert] = useState({visible: false});

  const status = [
    {label: "In Progress", value: "In Progress"},
    {label: "Completed", value: "Completed"},
  ];

  const formik = useFormik({
    initialValues: {
      name: "",
      status: "",
      startingDate: "",
      endingDate: "",
      frontend: "",
      backend: "",
      aboutProject: "",
    },
    validationSchema: projectSchema,
    onSubmit: async values => {
      try {
        const {data, error} = await addProject(values);
        if (data) {
          console.log(data?.message);
          setShowAlert({
            visible: true,
            type: "success",
            message: data?.message,
            handleClose: () => {
              setShowAlert({visible: false});
              navigation.navigate("Projects");
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

  if (isLoading) return <Loader />;

  return (
    <SafeAreaView>
      <View className="flex justify-between flex-row px-4 items-center">
        <TouchableOpacity
          className="flex flex-row items-center pt-5"
          onPress={() => {
            navigation.navigate("Projects");
          }}>
          <Image
            source={icons.backArrow}
            className="w-7 h-7"
            resizeMethod="contain"
          />
          <Text className="text-black text-3xl font-ubuntu-bold ml-2">
            Add Project
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView className="px-4 mt-10 h-full">
        <FloatingLabelTextInput
          id="name"
          label="Name"
          inputStyles={"py-4"}
          formik={formik}
        />
        <FloatingLabelSelectInput
          label="Status"
          id="status"
          formik={formik}
          inputStyles={"py-4"}
          data={status}
        />
        <FloatingLabelDateInput
          id="startingDate"
          label="Starting Date"
          inputStyles={"py-4"}
          formik={formik}
        />
        <FloatingLabelDateInput
          id="endingDate"
          label="Ending Date"
          inputStyles={"py-4"}
          formik={formik}
        />
        <FloatingLabelTextInput
          id="frontend"
          label="Frontend"
          inputStyles={"py-4"}
          formik={formik}
        />
        <FloatingLabelTextInput
          id="backend"
          label="Backend"
          inputStyles={"py-4"}
          formik={formik}
        />
        <FloatingLabelTextInput
          id="aboutProject"
          label="About Project"
          inputStyles={"py-4"}
          formik={formik}
          isTextArea
          numberOfLines={6}
        />
        <CustomButton
          title="ADD"
          handleOnPress={formik.handleSubmit}
          containerStyles={"py-4 rounded-full mt-6"}
        />
        <View className="mb-32" />
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

export default AddProject;
