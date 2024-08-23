import {View, Text} from 'react-native';
import React from 'react';
import {CustomButton} from '../components';
import {useNavigation} from '@react-navigation/native';

const Welcome = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Welcome</Text>
      <CustomButton
        title="Login"
        handleOnPress={() => {
          navigation.navigate('/Login');
        }}
      />
    </View>
  );
};

export default Welcome;
