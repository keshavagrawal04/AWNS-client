import {View, Text, Image} from "react-native";
import images from "../../../assets/images";

const PendingApproval = () => {
  return (
    <View className="px-5 flex-1 justify-center">
      <View>
        <Image
          source={images.pendingApproval}
          className="w-[360px] h-[400px]"
          resizeMethod="contain"
        />
      </View>
      <View className="mt-8">
        <Text className="text-primary text-center text-2xl font-ubuntu-bold">
          Access Pending Approval
        </Text>
        <Text className="text-gray text-center font-poppins-medium text-sm mt-2">
          Your access to the dashboard is currently pending approval by the
          admin. Please check back later or contact your administrator for
          further assistance.
        </Text>
      </View>
    </View>
  );
};

export default PendingApproval;
