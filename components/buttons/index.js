import React from 'react';
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ArrowLeftIcon,
  ArrowLeftWhiteIcon,
  ScanIcon,
  UserIcon,
} from '../../constant/icons';
import styles from '../../styles/button';

const ButtonLoading = ({styles}) => {
  return (
    <TouchableOpacity className={styles}>
      <ActivityIndicator size="small" color="#ffffff" />
    </TouchableOpacity>
  );
};

const ButtonBack = ({navigation}) => {
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image source={ArrowLeftIcon} />
    </TouchableOpacity>
  );
};

const ButtonBackProfile = ({navigation}) => {
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image className="w-8 h-8" source={ArrowLeftWhiteIcon} />
    </TouchableOpacity>
  );
};

const ButtonScan = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image source={ScanIcon} style={styles.buttonScan} />
    </TouchableOpacity>
  );
};

const ButtonProfile = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image source={UserIcon} style={styles.buttonProfile} />
    </TouchableOpacity>
  );
};

const ButtonLogin = ({title, onPress, buttonStyles, textStyles}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={buttonStyles}>
        <Text style={textStyles}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const ButtonLg = ({title, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View className="bg-theme rounded-md p-4">
        <Text className="text-white text-xl text-center font-semibold">{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const ButtonXs = ({title}) => {
  return (
    <View style={styles.buttonXs}>
      <Text className="text-white text-sm text-center font-medium">{title}</Text>
    </View>
  );
};

export {
  ButtonBack,
  ButtonBackProfile,
  ButtonLg,
  ButtonLoading,
  ButtonLogin,
  ButtonProfile,
  ButtonScan,
  ButtonXs
};

