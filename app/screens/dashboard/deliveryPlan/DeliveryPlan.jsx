import CheckBox from '@react-native-community/checkbox';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Keyboard,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { ButtonBack, ButtonLg, ButtonLoading, ButtonXs } from '../../../../components/buttons';
import { SearchIcon } from '../../../../constant/icons';
import { getStorage } from '../../../../hooks/useStorage';
import { toast } from '../../../../utils';

const DeliveryPlan = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const [token, setToken] = useState('');
  let [dpList, setDpList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [selectedList, setSelectedList] = useState([]);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [search, setSearch] = useState('');
  const tableHeader = ['STO ID', 'SKU', 'Outlet Code', 'Status'];
  const API_URL = 'https://shwapnooperation.onrender.com/';

  useEffect(() => {
    getStorage('token', setToken, 'string');
    const showKeyboard = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });
    const hideKeyboard = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
    });

    return () => {
      showKeyboard.remove();
      hideKeyboard.remove();
    };
  }, []);

  const getDnList = async () => {
    setIsLoading(true);
    try {
      await fetch(API_URL + `api/sto-tracking/pending-for-dn?currentPage=${page}`, {
        method: 'GET',
        headers: {
          authorization: token,
        },
      })
        .then(response => response.json())
        .then(async dnData => {
          if (dnData.status) {
            await fetch(API_URL + 'api/sto-tracking/in-dn', {
              method: 'GET',
              headers: {
                authorization: token,
              },
            })
              .then(res => res.json())
              .then(inDnData => {
                if (inDnData.status) {
                  const pendingDnItems = dnData.items;
                  const inDnItems = inDnData.items;
                  let remainingDnItems = pendingDnItems.filter(
                    pdnItem => !inDnItems.some(inDnItem => inDnItem.sto === pdnItem.sto)
                  );
                  const dpData = remainingDnItems.map(item => {
                    return { ...item, selected: false }
                  });
                  setDpList([...dpList, ...dpData]);
                  setTotalPage(dnData.totalPages);
                } else {
                  const pendingDnItems = dnData.items;
                  const dpData = pendingDnItems.map(item => {
                    return { ...item, selected: false }
                  });
                  setDpList([...dpList, ...dpData]);
                  setTotalPage(dnData.totalPages);
                }
              })
              .catch(error => console.log('Fetch catch', error));
          } else {
            toast(dnData.message);
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
        getDnList();
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
      onPress={() => handelCheckbox(item)} key={index}>
      <View className="flex-1 flex-row items-center">
        <CheckBox
          tintColors={item.selected ? '#56D342' : '#f5f5f5'}
          value={item.selected}
          onValueChange={() => handelCheckbox(item)}
        />
        <Text className="text-black" numberOfLines={1}>
          {item.sto.slice(0, 2) + '...' + item.sto.slice(7, item.sto.length)}
        </Text>
      </View>
      <Text className="flex-1 text-black text-center" numberOfLines={1}>
        {item.sku}
      </Text>
      <Text className="flex-1 text-black text-center" numberOfLines={1}>
        {item.receivingPlant}
      </Text>
      <Text className="flex-1 text-black text-center" numberOfLines={1}>
        {item.status.split(" ")[0]}
      </Text>
    </TouchableOpacity>
  );

  const handelCheckbox = sto => {
    let newItems = dpList.map(item =>
      sto._id === item._id ? { ...item, selected: !item.selected } : item,
    );
    setSelectedList(newItems.filter(item => item.selected));
    setDpList(newItems);
    Keyboard.dismiss();
  };

  const checkAll = () => {
    const checkAllData = dpList.map(item => {
      return { ...item, selected: true };
    });
    setDpList(checkAllData);
    setSelectedList(checkAllData);
    setIsAllChecked(current => !current);
    Keyboard.dismiss();
  };

  const uncheckAll = () => {
    const checkAllData = dpList.map(item => {
      return { ...item, selected: false };
    });
    setDpList(checkAllData);
    setSelectedList(checkAllData);
    setIsAllChecked(current => !current);
    Keyboard.dismiss();
  };

  const createDN = () => {
    console.log(selectedList.length);
    if (selectedList.length > 0) {
      setIsButtonLoading(true);
      try {
        selectedList.map(async item => {
          await fetch(API_URL + 'bapi/dn/create', {
            method: 'POST',
            headers: {
              authorization: token,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sto: item.sto }),
          })
            .then(response => response.json())
            .then(data => {
              if (data.status) {
                toast(data.message)
                setIsButtonLoading(false);
              } else {
                toast(data.message);
                setIsButtonLoading(false);
              }
            })
            .catch(error => console.log('Fetch catch', error));
        })
      } catch (error) {
        console.log(error);
      }
    } else {
      toast('No item selected!');
    }
  };

  if (search !== '') {
    dpList = dpList.filter(
      dp =>
        dp.sto.toLowerCase().includes(search.toLowerCase())
    );
  }

  console.log(selectedList)

  return (
    <SafeAreaView className="flex-1 bg-white pt-14">
      <View className="flex-1 h-full px-4">
        <View className="screen-header flex-row items-center mb-4">
          <ButtonBack navigation={navigation} />
          <Text className="flex-1 text-lg text-sh text-center font-semibold capitalize">
            delivery plan
          </Text>
        </View>

        {/* Search and Button */}
        <View className="search-button flex-row items-center gap-3">
          <View className="input-box relative flex-1">
            <Image className="absolute top-3 left-3 z-10" source={SearchIcon} />
            <TextInput
              className="bg-[#F5F6FA] h-[50px] text-black rounded-lg pl-12 pr-4"
              placeholder="Search for STO"
              inputMode='text'
              placeholderTextColor="#CBC9D9"
              selectionColor="#CBC9D9"
              onChangeText={value => setSearch(value)}
              value={search}
            />
          </View>
          <View className="box-header flex-row items-center justify-between">
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
        </View>
        <View className="content flex-1 justify-around my-6">
          {/* Table data */}
          <View className="table h-[90%] pb-2">
            <View className="flex-row bg-th text-center mb-2 py-2">
              {tableHeader.map((th, i) => (
                <Text
                  className="flex-1 text-white text-center font-bold"
                  key={i}>
                  {th}
                </Text>
              ))}
            </View>
            <FlatList
              data={dpList}
              renderItem={renderItem}
              keyExtractor={item => item._id}
              onEndReached={loadMoreItem}
              ListFooterComponent={isLoading && <ActivityIndicator />}
              onEndReachedThreshold={0}
            />
          </View>

          {!keyboardStatus && (
            <View className="button mt-4">
              {isButtonLoading ? <ButtonLoading styles='bg-theme rounded-md p-5' /> :
                <ButtonLg
                  title="Mark as delivery ready"
                  onPress={() => createDN()}
                />
              }
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DeliveryPlan;
