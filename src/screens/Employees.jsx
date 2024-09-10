import {Text, TouchableOpacity, Image, View, ScrollView} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useNavigation} from "@react-navigation/native";
import icons from "../assets/icons";
import {useState} from "react";
import {useGetEmployeesQuery} from "../services/api/user";
import {EmployeeCard, Loader, Filter} from "../components";

const Employees = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState(true);
  const {data: employeesData, isLoading} = useGetEmployeesQuery(activeTab);
  const [selectedEmployee, setSelectedEmployee] = useState([]);
  const [isFilter, setIsFilter] = useState(false);

  if (isLoading) return <Loader />;

  const handleEmployeeSelect = id => {
    setSelectedEmployee(prevSelected => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter(selectedId => selectedId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  return (
    <SafeAreaView>
      <View className="flex justify-between flex-row px-4 items-center">
        <TouchableOpacity
          className="flex flex-row items-center pt-5"
          onPress={() => {
            navigation.navigate("Dashboard");
          }}>
          <Text className="text-black text-3xl font-ubuntu-bold ml-2">
            Employees
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView className="px-4">
        <View className="w-[100%] rounded-full flex flex-row bg-[#3470ed1a] p-1 mt-4">
          <TouchableOpacity
            className={`w-[50%] ${
              activeTab === true && "bg-primary"
            } rounded-full p-3`}
            onPress={() => {
              setActiveTab(true);
            }}>
            <Text
              className={`text-center font-poppins-medium text-lg ${
                activeTab === true ? "text-white" : "text-black"
              }`}>
              All Employees
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`w-[50%] rounded-full p-3 ${
              activeTab === false && "bg-primary"
            }`}
            onPress={() => {
              setActiveTab(false);
            }}>
            <Text
              className={`text-center font-poppins-medium text-lg ${
                activeTab === false ? "text-white" : "text-black"
              }`}>
              Pending
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex flex-row justify-between items-center">
          <Text className="text-black font-poppins-bold text-xl py-8">
            {employeesData?.data?.length} Employees
          </Text>
          <View className="flex flex-row items-center space-x-2">
            <TouchableOpacity
              onPress={() => {
                setIsFilter(true);
              }}
              className="border border-primary rounded-md px-3 flex flex-row justify-between items-center">
              <Image className="h-[15px] w-[15px]" source={icons.filter} />
              <Text className="text-primary font-poppins-medium text-xl">
                {" "}
                Filter
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{opacity: selectedEmployee?.length >= 1 ? 1 : 0.4}}
              className="border border-red rounded-full p-2">
              <Image
                source={icons.trash}
                className="w-[20px] h-[20px]"
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex flex-column gap-4">
          {employeesData?.data.map((employee, index) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("EmployeeView", {id: employee._id});
              }}
              onLongPress={() => {
                handleEmployeeSelect(employee._id);
              }}
              key={index}>
              <EmployeeCard
                employee={employee}
                isSelected={selectedEmployee.includes(employee._id)}
              />
            </TouchableOpacity>
          ))}
        </View>
        <View className="mb-52" />
      </ScrollView>
      <Filter
        visible={isFilter}
        handleClose={() => {
          setIsFilter(false);
        }}
      />
    </SafeAreaView>
  );
};

export default Employees;
