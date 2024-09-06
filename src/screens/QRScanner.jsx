import {
  PermissionsAndroid,
  Platform,
  Alert,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import {useEffect, useState, useRef} from "react";
import QRCodeScanner from "react-native-qrcode-scanner";
import {SafeAreaView} from "react-native-safe-area-context";
import {useAddAttendanceMutation} from "../services/api/attendance";
import {CustomUserInfo, CustomAlert} from "../components";
import icons from "../assets/icons";

const QRScanner = () => {
  const [data, setData] = useState({});
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [showAlert, setShowAlert] = useState({visible: false});
  const scannerRef = useRef(null);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
    scannerRef?.current.reactivate();
  };

  const [addAttendance] = useAddAttendanceMutation();

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Camera Permission",
          message: "This app needs access to your camera to scan QR codes.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setHasCameraPermission(true);
      } else {
        setHasCameraPermission(false);
        Alert.alert(
          "Permission Denied",
          "Camera permission is required to scan QR codes.",
        );
      }
    } catch (err) {
      console.warn(err);
      setHasCameraPermission(false);
    }
  };

  const handleQRRead = async ({data}) => {
    const currentDate = new Date();

    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    const currentTime = formatter.format(currentDate);

    try {
      const {data: responseData, error} = await addAttendance({
        user: data,
        date: currentDate.toISOString()?.split("T")[0],
        time: currentTime,
      });

      if (responseData) {
        setData(responseData?.user);
        setShowAlert({
          visible: true,
          type: "success",
          message: responseData?.message,
          handleClose: () => {
            setShowAlert({visible: false});
            setModalVisible(true);
          },
        });
      } else if (error) {
        setData(error?.data?.user);
        setShowAlert({
          visible: true,
          type: "error",
          message: error?.data?.message,
          handleClose: () => {
            setShowAlert({visible: false});
            if (!error?.data?.user) {
              setModalVisible(false);
              scannerRef?.current.reactivate();
            }
          },
        });
      }
    } catch (error) {
      Alert.alert("Error", error.message || "Failed to mark attendance.", [
        {
          text: "OK",
          onPress: () => {
            scannerRef.current.reactivate();
          },
        },
      ]);
    }
  };

  useEffect(() => {
    if (Platform.OS === "android") {
      requestCameraPermission();
    } else {
      setHasCameraPermission(true);
    }
  }, []);

  if (!hasCameraPermission) {
    return null;
  }

  return (
    <>
      <SafeAreaView className="flex-1">
        <TouchableOpacity className="flex flex-row items-center px-4 py-5">
          <Text className="text-black text-3xl font-ubuntu-medium ml-2">
            Scan
          </Text>
        </TouchableOpacity>
        <QRCodeScanner
          ref={scannerRef}
          onRead={handleQRRead}
          markerStyle={styles.markerStyle}
          reactivate={false}
          showMarker={true}
        />
        <CustomUserInfo
          visible={modalVisible}
          handleClose={toggleModal}
          user={data}
        />
        <CustomAlert
          visible={showAlert.visible}
          handleClose={showAlert.handleClose}
          type={showAlert.type}
          message={showAlert.message}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  markerStyle: {
    borderColor: "#3470ED",
    borderWidth: 2,
    borderRadius: 10,
    height: 250,
    width: 250,
  },
});

export default QRScanner;
