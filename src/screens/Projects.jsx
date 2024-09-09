import React, {useState} from "react";
import {Text, TouchableOpacity, View, ScrollView, Image} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {Filter, Loader, CustomAlert} from "../components";
import icons from "../assets/icons";
import {useNavigation} from "@react-navigation/native";
import {
  useDeleteProjectMutation,
  useGetProjectsQuery,
} from "../services/api/project";
import DeleteModal from "../components/DeleteModal";

const Projects = () => {
  const [isFilter, setIsFilter] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [deleteData, setDeleteData] = useState({});
  const [deleteProject] = useDeleteProjectMutation();
  const [showAlert, setShowAlert] = useState({visible: false});
  const {data: projectsData, isLoading} = useGetProjectsQuery();

  const navigation = useNavigation();

  if (isLoading) return <Loader />;

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
    <SafeAreaView className="flex-1 px-4">
      <View className="flex-row justify-between items-center py-4">
        <TouchableOpacity
          className="flex flex-row items-center"
          onPress={() => {
            navigation.navigate("Dashboard");
          }}>
          <Image
            source={icons.backArrow}
            className="w-7 h-7"
            resizeMethod="contain"
          />
          <Text className="text-black text-3xl font-ubuntu-bold ml-2">
            Projects
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View className="flex flex-row justify-between mt-2">
          <Text className="text-3xl text-primary font-poppins-bold">
            {projectsData?.data?.length} Projects
          </Text>
          <TouchableOpacity
            onPress={() => {
              setIsFilter(true);
            }}
            className="border border-primary rounded-md px-4 py-1 flex flex-row justify-between items-center">
            <Image className="h-[15px] w-[15px]" source={icons.filter} />
            <Text className="text-primary font-poppins-medium text-xl">
              {" "}
              Filter
            </Text>
          </TouchableOpacity>
        </View>
        <View className="mt-5">
          {projectsData?.data?.map(project => (
            <View
              key={project?._id}
              className="bg-white p-3 rounded-xl px-5 mb-4">
              <View className="flex flex-row justify-between">
                <Text className="text-primary text-xl font-poppins-medium">
                  {project?.name}
                </Text>
                <Text
                  className={`${
                    project.status === "Completed"
                      ? "bg-green-light text-green"
                      : "bg-info-light text-info"
                  } rounded-full px-3 py-1 font-poppins-medium my-auto`}>
                  {project?.status}
                </Text>
              </View>
              <View className="flex flex-row pt-2">
                <Text className="w-1/2 text-light-gray text-md font-poppins-medium">
                  STARING DATE:
                </Text>
                <Text className="w-2/3 text-black font-poppins-medium">
                  {project?.startingDate}
                </Text>
              </View>
              <View className="flex flex-row pt-2">
                <Text className="w-1/2 text-light-gray text-md font-poppins-medium">
                  ENDING DATE:
                </Text>
                <Text className="w-2/3 text-black font-poppins-medium">
                  {project?.endingDate}
                </Text>
              </View>

              <View className="flex flex-row pt-2">
                <Text className="w-1/2 text-light-gray text-md font-poppins-medium">
                  FRONTEND:
                </Text>
                <Text className="w-2/3 text-black font-poppins-medium">
                  {project?.frontend}
                </Text>
              </View>

              <View className="flex flex-row pt-2">
                <Text className="w-1/2 text-light-gray text-md font-poppins-medium">
                  BACKEND:
                </Text>
                <Text className="w-2/3 text-black font-poppins-medium">
                  {project?.backend}
                </Text>
              </View>

              <View className="flex flex-row items-center pt-2 justify-between">
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("ProductView", {id: project?._id});
                  }}>
                  <Text className="text-primary font-poppins-regular text-lg">
                    View More
                  </Text>
                </TouchableOpacity>
                <View className="flex flex-row items-center gap-2">
                  <TouchableOpacity
                    className="border border-red rounded-full p-1"
                    onPress={() => {
                      setDeleteData({title: project?.name, id: project._id});
                      setIsDelete(true);
                    }}>
                    <Image className="w-[20px] h-[20px]" source={icons.trash} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("UpdateProject", {id: project?._id});
                    }}
                    className="h-[35px] w-[35px] rounded-full border border-primary p-2">
                    <Image source={icons.edit} className="h-full w-full" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AddProject");
          }}
          className="absolute w-[50px] h-[50px] rounded-full bg-primary right-0 top-full">
          <Image
            source={icons.add}
            className="w-full h-full"
            resizeMode="contain"
          />
        </TouchableOpacity>
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
      <Filter visible={isFilter} handleClose={() => setIsFilter(false)} />
      <CustomAlert
        visible={showAlert.visible}
        handleClose={showAlert.handleClose}
        type={showAlert.type}
        message={showAlert.message}
      />
    </SafeAreaView>
  );
};

export default Projects;
