import LottieView from 'lottie-react-native';
import React from 'react';
import { Text, View } from 'react-native';
import lottieReadyForShelving from '../../assets/lottie/readyForShelving.json';

const ReadyForShelving = () => {
  return (
    <View className="w-full h-[90%] justify-center">
      <LottieView
        source={lottieReadyForShelving}
        className="w-56 h-56 mx-auto"
        autoPlay
        loop
      />
      <Text className="text-blue-800 text-lg text-center font-semibold font-mono mt-5">All articles are ready for shelving</Text>
    </View>
  );
};

export default ReadyForShelving;
