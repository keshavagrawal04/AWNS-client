import React, {useState} from "react";
import {Text, TouchableOpacity, View, ScrollView, Image} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {Filter, Loader} from "../components";
import icons from "../assets/icons";
import {useNavigation} from "@react-navigation/native";
import {useGetProjectsQuery} from "../services/api/project";

const Department = () => {
  const {data: projectsData, isLoading} = useGetProjectsQuery();
  const [isFilter, setIsFilter] = useState(false);
  const navigation = useNavigation();

  const departments = [
    {id: 1, name: "Frontend", counts: 15},
    {id: 2, name: "Backend", counts: 7},
    {id: 3, name: "UI/UX", counts: 2},
    {id: 4, name: "Testing", counts: 8},
    {id: 5, name: "Marketing", counts: 17},
    {id: 6, name: "Intern", counts: 1},
  ];

  if (isLoading) return <Loader />;

  return (
    <SafeAreaView className="flex-1 px-4">
      <View className="flex-row justify-between items-center py-4">
        <Text className="text-2xl text-black font-poppins-bold">
          Department
        </Text>
      </View>

      <ScrollView>
        <View className="flex flex-row flex-wrap justify-between mt-5">
          {departments.map(department => (
            <View
              key={department.id}
              className="bg-white rounded-lg p-4 mb-4"
              style={{
                width: "48%",
              }}>
              <Text className="text-lg text-gray font-poppins-medium pb-3">
                {department.name}
              </Text>
              <Text className="text-3xl text-primary font-poppins-bold">
                +{department.counts}
              </Text>
            </View>
          ))}
        </View>
        <View>
          <View className="flex flex-row justify-between items-center">
            <Text className="text-black font-poppins-bold text-2xl">
              Projects
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Projects");
              }}>
              <Text className="font-poppins-medium text-primary text-lg">
                View All
              </Text>
            </TouchableOpacity>
          </View>
          <View className="mt-4">
            {projectsData?.data?.map(project => (
              <View
                key={project._id}
                className="flex flex-row justify-between bg-white rounded-lg px-4 py-5 mb-4">
                <View>
                  <Text className="text-black font-poppins-bold text-xl">
                    {project.name}
                  </Text>
                  <Text
                    className={`${
                      project.status === "Completed"
                        ? "text-green"
                        : "text-info"
                    } font-poppins-medium`}>
                    {project?.status}
                  </Text>
                </View>
                <TouchableOpacity
                  className="flex justify-center"
                  onPress={() => {
                    navigation.navigate("ProductView", {id: project?._id});
                  }}>
                  <Image
                    className="w-[25px] h-[25px]"
                    source={icons.arrowRight}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <Filter visible={isFilter} handleClose={() => setIsFilter(false)} />
    </SafeAreaView>
  );
};

export default Department;
