import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ButtonBack} from '../../../../components/buttons';
import {articles} from '../../../../constant/data';

const Return = ({navigation}) => {
  const tableHeader = ['Article ID', 'Article Name', 'Outlet', 'Quantity'];

  const renderItem = ({item}) => (
    <TouchableOpacity
      className="flex-row border border-tb rounded-lg mt-2.5 p-4"
      onPress={() => navigation.push('ReturnScanner', {item})}>
      <Text className="flex-1 text-black text-center" numberOfLines={1}>
        {item.id}
      </Text>
      <Text className="flex-1 text-black text-center" numberOfLines={1}>
        {item.name}
      </Text>
      <Text className="flex-1 text-black text-center" numberOfLines={1}>
        {item.outlet}
      </Text>
      <Text className="flex-1 text-black text-center" numberOfLines={1}>
        {item.quantity}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white pt-14">
      <View className="flex-1 px-4">
        <View className="screen-header flex-row items-center mb-4">
          <ButtonBack navigation={navigation} />
          <Text className="text-lg flex-1 text-sh text-center font-semibold capitalize">
            return
          </Text>
        </View>

        <View className="content flex-1">
          <View className="h-full pb-2">
            <View className="flex-row bg-th mb-2 py-2">
              {tableHeader.map(th => (
                <Text
                  className="flex-1 text-white text-center font-bold"
                  key={th}>
                  {th}
                </Text>
              ))}
            </View>

            <FlatList
              data={articles}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Return;
