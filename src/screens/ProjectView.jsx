import {Text, TouchableOpacity, Image, View, ScrollView} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useNavigation} from "@react-navigation/native";
import icons from "../assets/icons";
import {
  CustomAlert,
  CustomButton,
  EmployeeAssignModal,
  Loader,
} from "../components";
import {useRoute} from "@react-navigation/native";
import {useState} from "react";
import {
  useDeleteProjectMutation,
  useGetProjectQuery,
} from "../services/api/project";
import DeleteModal from "../components/DeleteModal";

const ProductView = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [isDelete, setIsDelete] = useState(false);
  const [deleteData, setDeleteData] = useState({});
  const [deleteProject] = useDeleteProjectMutation();
  const {id} = route.params;
  const {data: projectData, isLoading: isGetLoading} = useGetProjectQuery(id);
  const [showAlert, setShowAlert] = useState({visible: false});
  const [isAssign, setIsAssign] = useState(false);

  if (isGetLoading) return <Loader />;

  const handleEmployeeAssign = () => {
    setIsAssign(true);
  };

  const handleDelete = async id => {
    try {
      setIsDelete(false);
      const {data, error} = await deleteProject(id);
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
    <SafeAreaView>
      <View className="flex justify-between flex-row px-4 items-center pt-5">
        <TouchableOpacity
          className="flex flex-row items-center"
          onPress={() => {
            navigation.navigate("Projects");
          }}>
          <Image
            source={icons.backArrow}
            className="w-7 h-7"
            resizeMethod="contain"
          />
          <Text className="text-black text-3xl font-ubuntu-bold ml-2">
            {projectData?.project?.name}
          </Text>
        </TouchableOpacity>
        <View className="flex flex-row items-center justify-center gap-2 my-auto">
          <TouchableOpacity
            className="border border-red rounded-full p-1"
            onPress={() => {
              setDeleteData({
                title: projectData?.project?.name,
                id: projectData?.project._id,
              });
              setIsDelete(true);
            }}>
            <Image className="w-[20px] h-[20px]" source={icons.trash} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("UpdateProject", {
                id: projectData?.project?._id,
              });
            }}
            className="h-[35px] w-[35px] rounded-full border border-primary p-2">
            <Image source={icons.edit} className="h-full w-full" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView className="px-5">
        <View className="flex flex-row items-center mt-8">
          <Text className="w-1/2 text-black text-xl font-poppins-medium">
            PROJECT NAME :
          </Text>
          <Text className="w-2/3 text-primary text-lg font-poppins-medium">
            {projectData?.project?.name}
          </Text>
        </View>
        <View className="flex flex-row items-center mt-2">
          <Text className="w-1/2 text-light-gray text-xl font-poppins-medium">
            STATUS :
          </Text>
          <Text
            className={`${
              projectData?.project.status === "Completed"
                ? "bg-green-light text-green"
                : "bg-info-light text-info"
            } rounded-full px-3 py-1 font-poppins-medium my-auto`}>
            {projectData?.project?.status}
          </Text>
        </View>
        <View className="flex flex-row items-center mt-2">
          <Text className="w-1/2 text-light-gray text-xl font-poppins-medium">
            STARTING DATE :
          </Text>
          <Text className="w-2/3 text-black text-lg font-poppins-medium">
            {projectData?.project?.startingDate}
          </Text>
        </View>
        <View className="flex flex-row items-center mt-2">
          <Text className="w-1/2 text-light-gray text-xl font-poppins-medium">
            ENDING DATE :
          </Text>
          <Text className="w-2/3 text-black text-lg font-poppins-medium">
            {projectData?.project?.endingDate}
          </Text>
        </View>
        <View className="flex flex-row items-center mt-2">
          <Text className="w-1/2 text-light-gray text-xl font-poppins-medium">
            FRONTEND :
          </Text>
          <Text className="w-2/3 text-black text-lg font-poppins-medium">
            {projectData?.project?.frontend}
          </Text>
        </View>
        <View className="flex flex-row items-center mt-2">
          <Text className="w-1/2 text-light-gray text-xl font-poppins-medium">
            BACKEND :
          </Text>
          <Text className="w-2/3 text-black text-lg font-poppins-medium">
            {projectData?.project?.backend}
          </Text>
        </View>
        <View className="mt-10">
          <Text className="text-black text-xl font-poppins-medium">
            ABOUT PROJECT :
          </Text>
          <Text className="text-light-gray text-lg mt-3 font-poppins-medium">
            {projectData?.project?.aboutProject}
          </Text>
        </View>
        <View className="mt-10">
          <Text className="text-black text-xl font-poppins-medium">
            WORKING EMPLOYEES :
          </Text>
        </View>
        <View>
          <CustomButton
            title="+ Assign Employees"
            handleOnPress={handleEmployeeAssign}
            containerStyles={"py-4 rounded-full mt-6"}
          />
        </View>
      </ScrollView>
      <DeleteModal
        title={deleteData?.title || " "}
        visible={isDelete}
        handleClose={() => {
          setIsDelete(false);
        }}
        handleYes={() => {
          handleDelete(deleteData?.id);
        }}
      />
      <CustomAlert
        visible={showAlert.visible}
        handleClose={showAlert.handleClose}
        type={showAlert.type}
        message={showAlert.message}
      />
      <EmployeeAssignModal
        visible={isAssign}
        handleClose={() => {
          setIsAssign(false);
        }}
        handleYes={handleEmployeeAssign}
      />
    </SafeAreaView>
  );
};

export default ProductView;
