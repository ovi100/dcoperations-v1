import LottieView from 'lottie-react-native';
import React from 'react';
import { Text, View } from 'react-native';
import lottieServer from '../../assets/lottie/server.json';

const ServerError = ({ message }) => {
  return (
    <View className="w-full h-[90%] justify-center">
      <LottieView
        source={lottieServer}
        className="w-72 h-72 mx-auto"
        autoPlay
        loop
      />
      <Text className="text-red-500 text-lg text-center font-semibold font-mono">{message}</Text>
    </View>
  );
};

export default ServerError;
