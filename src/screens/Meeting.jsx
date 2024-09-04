import {Text, TouchableOpacity, Image, View, ScrollView} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useNavigation} from "@react-navigation/native";
import icons from "../assets/icons";
import {Loader, MeetingCard} from "../components";
import {useGetMeetingsQuery} from "../services/api/meeting";

const Meeting = () => {
  const navigation = useNavigation();
  const {data: meetingsData, isLoading} = useGetMeetingsQuery();

  if (isLoading) return <Loader />;

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
            Meeting
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView className="px-4 mt-5 h-full">
        {meetingsData?.data?.map(meet => (
          <View key={meet._id} className="mb-4">
            <MeetingCard
              id={meet._id}
              title={meet.title}
              date={meet.date.split("T")[0]}
              link={meet.meetingLink}
              purpose={meet.purpose}
              actions
            />
          </View>
        ))}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AddMeeting");
          }}
          className="absolute w-[50px] h-[50px] rounded-full bg-primary right-0 top-full">
          <Image
            source={icons.add}
            className="w-full h-full"
            resizeMode="contain"
          />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Meeting;
