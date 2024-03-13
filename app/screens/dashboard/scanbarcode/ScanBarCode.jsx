import React, {useState} from 'react';
import {SafeAreaView, Text, TextInput, View} from 'react-native';
import {ButtonBack} from '../../../../components/buttons';

const ScanBarCode = ({navigation, route}) => {
  const {screen, item} = route.params;
  const [barcode, setBarcode] = useState(null);
  console.log('screen', screen, typeof screen);
  console.log('items', item);

  if (barcode) {
    setTimeout(() => {
      navigation.push(screen, {item});
    }, 1000);
  }

  return (
    <SafeAreaView className="flex-1 bg-white pt-14">
      <View className="flex-1 px-4">
        <View className="screen-header flex-row items-center mb-4">
          <ButtonBack navigation={navigation} />
          <Text className="flex-1 text-lg text-sh text-center font-semibold capitalize">
            scan barcode
          </Text>
        </View>
        <View className="content">
          <TextInput
            className="h-12 text-center mb-3"
            autoFocus={true}
            value={barcode}
            onChangeText={data => setBarcode(data)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ScanBarCode;
