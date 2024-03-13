import CheckBox from '@react-native-community/checkbox';
import {useState} from 'react';
import {
  Alert,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ButtonBack, ButtonLg, ButtonXs} from '../../../../components/buttons';
import {articles} from '../../../../constant/data';

const ChildPacking = ({navigation}) => {
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [childPackingList, setChildPackingList] = useState(articles);
  const [selectedList, setSelectedList] = useState([]);
  const tableHeader = ['Article ID', 'Article Name', 'Quantity'];

  const renderItem = ({item}) => (
    <TouchableOpacity
      className="flex-row border border-tb rounded-lg mt-2.5 p-4"
      onPress={() => handelCheckbox(item)}>
      <View className="flex-1 flex-row items-center">
        <CheckBox
          tintColors={item.selected ? '#56D342' : '#f5f5f5'}
          value={item.selected}
          onValueChange={() => handelCheckbox(item)}
        />
        <Text className="text-black" numberOfLines={1}>
          {item.id}
        </Text>
      </View>
      <Text className="flex-1 text-black text-center" numberOfLines={1}>
        {item.name}
      </Text>
      <Text className="flex-1 text-black text-center" numberOfLines={1}>
        {item.quantity}
      </Text>
    </TouchableOpacity>
  );

  const handelCheckbox = article => {
    let newItems = childPackingList.map(item =>
      article.id === item.id ? {...item, selected: !item.selected} : item,
    );
    setSelectedList(newItems.filter(item => item.selected));
    setChildPackingList(newItems);
  };

  const checkAll = () => {
    const checkAllData = childPackingList.map(item => {
      return {...item, selected: true};
    });
    setChildPackingList(checkAllData);
    setSelectedList(checkAllData);
    setIsAllChecked(current => !current);
  };

  const uncheckAll = () => {
    const checkAllData = childPackingList.map(item => {
      return {...item, selected: false};
    });
    setChildPackingList(checkAllData);
    setSelectedList([]);
    setIsAllChecked(current => !current);
  };

  const createPackingList = () => {
    if (selectedList.length > 0) {
      navigation.push('QualityCheck');
      return;
    } else {
      Alert.alert('please select an item');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white pt-14">
      <View className="flex-1 h-full px-4">
        <View className="screen-header flex-row items-center mb-4">
          <ButtonBack navigation={navigation} />
          <Text className="flex-1 text-lg text-sh text-center font-semibold capitalize">
            create child packing
          </Text>
          {isAllChecked ? (
            <TouchableOpacity onPress={() => uncheckAll()}>
              <ButtonXs title="uncheck all" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => checkAll()}>
              <ButtonXs title="check all" />
            </TouchableOpacity>
          )}
        </View>

        <View className="content flex-1 justify-around my-5">
          {/* Table data */}
          <View className="table h-full pb-2">
            <View className="flex-row bg-th text-center mb-2 py-2">
              {tableHeader.map(th => (
                <Text
                  className="flex-1 text-white text-center font-bold"
                  key={th}>
                  {th}
                </Text>
              ))}
            </View>
            <FlatList
              data={childPackingList}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          </View>
          <View className="button">
            <ButtonLg
              title="Generate Child Packing List"
              onPress={() => createPackingList()}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChildPacking;
