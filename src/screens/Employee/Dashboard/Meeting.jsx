import {View} from "react-native";
import {MeetingCard} from "../../../components";
import React from "react";

const Meeting = () => {
  const meetings = [
    {
      id: 1,
      title: "Meet 1",
      date: "12/08/2024",
      link: "https://meet.google.com/zqe-pmgs-sac",
      purpose: "This meeting for the project discussion",
    },
    {
      id: 2,
      title: "Meet 2",
      date: "12/08/2024",
      link: "https://meet.google.com/zqe-pmgs-sac",
      purpose: "This meeting for the project discussion",
    },
  ];

  return (
    <View className="mt-10 mx-4">
      {meetings?.map(meet => (
        <View key={meet.id} className="mb-4">
          <MeetingCard
            title={meet.title}
            date={meet.date}
            link={meet.link}
            purpose={meet.purpose}
          />
        </View>
      ))}
    </View>
  );
};

export default Meeting;
