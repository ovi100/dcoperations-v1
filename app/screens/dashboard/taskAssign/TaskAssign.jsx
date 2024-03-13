import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { ButtonBack } from '../../../../components/buttons';
import { getStorage } from '../../../../hooks/useStorage';
import { toast } from '../../../../utils';

const TaskAssign = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState('');
  let [taskList, setTaskList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const tableHeader = ['STO ID', 'SKU', 'Outlet Code', 'Status'];
  const API_URL = 'https://shwapnooperation.onrender.com/api/sto-tracking';

  useEffect(() => {
    getStorage('token', setToken, 'string');
  }, []);

  const getInDnList = async () => {
    setIsLoading(true);
    try {
      await fetch(API_URL + `?currentPage=${page}`, {
        method: 'GET',
        headers: {
          authorization: token,
        },
      })
        .then(response => response.json())
        .then(data => {
          if (data.status) {
            const serverData = data.items.filter(item => item.status === 'in dn' || item.status === 'picker assigned');

            setTaskList([...taskList, ...serverData]);
            setTotalPage(data.totalPages);
            setIsLoading(false);
          } else {
            toast(data.message);
            setIsLoading(false);
          }
        })
        .catch(error => console.log('Fetch catch', error));
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (token) {
        getInDnList();
      }
    }, [token, page])
  );

  const loadMoreItem = () => {
    if (totalPage >= page) {
      setPage(prev => prev + 1);
    } else {
      setIsLoading(false);
    }
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      className="flex-row items-center border border-tb rounded-lg mt-2.5 p-4"
      key={index}
      onPress={() => navigation.push('PickerPackerTaskAssign', item)}
    >
      <Text className="flex-1 text-black text-center" numberOfLines={1}>
        {item.sto.slice(0, 2) + '...' + item.sto.slice(7, item.sto.length)}
      </Text>
      <Text className="flex-1 text-black text-center" numberOfLines={1}>
        {item.sku}
      </Text>
      <Text className="flex-1 text-black text-center" numberOfLines={1}>
        {item.receivingPlant}
      </Text>
      <Text className="flex-1 text-black text-center uppercase" numberOfLines={2}>
        {item.status}
      </Text>
    </TouchableOpacity>
  );

  taskList = [...new Set(taskList)];

  return (
    <SafeAreaView className="flex-1 bg-white pt-8">
      <View className="flex-1 px-4">
        <View className="screen-header flex-row items-center mb-4">
          <ButtonBack navigation={navigation} />
          <Text className="flex-1 text-lg text-sh text-center font-semibold capitalize">
            task assign
          </Text>
        </View>
        <View className="content flex-1 justify-between py-5">
          <View className="table h-full pb-2">
            <View className="flex-row bg-th text-center mb-2 py-2">
              {tableHeader.map(th => (
                <Text className="flex-1 text-white text-center font-bold" key={th}>
                  {th}
                </Text>
              ))}
            </View>
            <FlatList
              data={taskList}
              renderItem={renderItem}
              keyExtractor={item => item._id}
              onEndReached={loadMoreItem}
              ListFooterComponent={isLoading && <ActivityIndicator />}
              onEndReachedThreshold={0}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TaskAssign;
