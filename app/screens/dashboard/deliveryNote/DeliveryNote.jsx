import {SafeAreaView, Text, View} from 'react-native';
import {ButtonBack, ButtonLg} from '../../../../components/buttons';
import Table from '../../../../components/table';
import {dnList} from '../../../../constant/data';

const DeliveryNote = ({navigation}) => {
  const tableHeader = ['DN ID', 'Outlet', 'Packed Qnt', 'Order Qnt'];
  const dataFields = ['id', 'outlet', 'packed_quantity', 'order_quantity'];

  const generateDN = () => {
    alert('DN generate successfully');
  };

  return (
    <SafeAreaView className="flex-1 bg-white pt-8">
      <View className="flex-1 h-full px-4">
        <View className="screen-header flex-row items-center mb-4">
          <ButtonBack navigation={navigation} />
          <Text className="flex-1 text-lg text-sh text-center font-semibold capitalize">
            delivery note
          </Text>
        </View>
        <View className="content flex-1 justify-between">
          <Table
            header={tableHeader}
            data={dnList}
            dataFields={dataFields}
            navigation={navigation}
          />
        </View>
        <View className="button mb-3">
          <ButtonLg
            title="Generate Delivery Note"
            onPress={() => generateDN()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DeliveryNote;
