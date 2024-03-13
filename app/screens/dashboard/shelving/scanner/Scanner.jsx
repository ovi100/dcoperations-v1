import React, { useCallback, useState } from 'react';
import { Keyboard, SafeAreaView, Text, TextInput, View } from 'react-native';
import { ButtonBack } from '../../../../../components/buttons';
import { useFocusEffect } from '@react-navigation/native';

const ShelvingScanner = ({ navigation, route }) => {
  const { item } = route.params;
  const [barcode, setBarcode] = useState(null);
  console.log('items', item);

  useFocusEffect(
    useCallback(() => {
      Keyboard.dismiss();
    }, [])
  );

  if (barcode) {
    setTimeout(() => {
      navigation.replace('ShelveArticle', { item });
    }, 1000);
  }

  return (
    <SafeAreaView className="flex-1 bg-white pt-8">
      <View className="flex-1 px-4">
        <View className="screen-header flex-row items-center mb-4">
          <ButtonBack navigation={navigation} />
          <Text className="flex-1 text-lg text-sh text-center font-semibold capitalize">
            scan barcode
          </Text>
        </View>

        <View className="content h-full justify-center">
          <Text className="text-2xl text-sh text-center font-semibold capitalize">
            please scan barcode
          </Text>
          <TextInput
            className="h-12 border-0 text-center mt-3"
            caretHidden={true}
            autoFocus={true}
            value={barcode}
            onChangeText={data => setBarcode(data)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ShelvingScanner;
