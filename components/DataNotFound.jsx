import React from 'react';
import {Image, Text, View} from 'react-native';
import {InfoIcon} from '../constant/icons';

const DataNotFound = ({message}) => {
  return (
    <View
      className="w-full h-64 bg-white rounded-bl-lg rounded-br-lg justify-center border-t-[6px] border-blue-500"
      style={{
        elevation: 3,
        shadowColor: '#000',
      }}>
      <Image source={InfoIcon} className="w-24 h-24 mx-auto mb-3" />
      <Text className="text-lg text-black text-center">{message}</Text>
    </View>
  );
};

export default DataNotFound;
