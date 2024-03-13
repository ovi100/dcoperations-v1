import React, { useEffect } from 'react';
import { DeviceEventEmitter, SafeAreaView, Text, View } from 'react-native';
import { ButtonBack, ButtonLg } from '../../../../components/buttons';
import SunmiPrinter from '../../../../utils/sunmi/printer';
import SunmiScanner from '../../../../utils/sunmi/scanner';


const Print = ({ navigation }) => {
  const { startScan, stopScan } = SunmiScanner;
  const { printerText, lineWrap } = SunmiPrinter;

  useEffect(() => {
    startScan();
    DeviceEventEmitter.addListener('ScanDataReceived', data => {
      console.log(data.code);
    });

    return () => {
      stopScan();
      DeviceEventEmitter.removeAllListeners('ScanDataReceived');
    };
  }, []);

  const printReceipt = () => {
    lineWrap(5);
    printerText('DC print receipt\n');
    printerText('*************************\n');
    printerText('Receipt printed');
    lineWrap(5);
  };
  return (
    <SafeAreaView className="flex-1 bg-white pt-8">
      <View className="flex-1 px-4">
        <View className="screen-header flex-row items-center mb-4">
          <ButtonBack navigation={navigation} />
          <Text className="text-lg flex-1 text-sh text-center font-semibold capitalize">
            sunmi printer
          </Text>
        </View>
        <View className="content flex-1 justify-between py-5">
          <ButtonLg title="PRINT NOW" onPress={printReceipt} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Print;