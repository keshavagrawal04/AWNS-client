import {View} from "react-native";
import {Loader, MeetingCard} from "../../../components";
import React from "react";
import {useGetMeetingsQuery} from "../../../services/api/meeting";

const Meeting = () => {
  const {data: meetingsData, isLoading} = useGetMeetingsQuery();

  if (isLoading) return <Loader />;

  return (
    <View className="mt-10 mx-4">
      {meetingsData?.data?.map(meet => (
        <View key={meet._id} className="mb-4">
          <MeetingCard
            id={meet._id}
            title={meet.title}
            date={meet.date}
            link={meet.meetingLink}
            purpose={meet.purpose}
          />
        </View>
      ))}
    </View>
  );
};

export default Meeting;
