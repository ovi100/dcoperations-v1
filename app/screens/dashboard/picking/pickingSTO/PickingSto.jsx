import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, DeviceEventEmitter, FlatList, SafeAreaView, Text, View } from 'react-native';
import { getStorage } from '../../../../../hooks/useStorage';
import { toast } from '../../../../../utils';
import SunmiScanner from '../../../../../utils/sunmi/scanner';

const PickingSto = ({ navigation, route }) => {
  const { sto } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [barcode, setBarcode] = useState('');
  const [token, setToken] = useState('');
  let [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const API_URL = 'https://shwapnooperation.onrender.com/';
  const { startScan, stopScan } = SunmiScanner;

  useEffect(() => {
    getStorage('token', setToken, 'string');
  }, []);

  useEffect(() => {
    startScan();
    DeviceEventEmitter.addListener('ScanDataReceived', data => {
      setBarcode(data.code);
    });

    return () => {
      stopScan();
      DeviceEventEmitter.removeAllListeners('ScanDataReceived');
    };
  }, []);

  const fetchStoDetails = async () => {
    await fetch(API_URL + 'bapi/sto/display' + `?currentPage=${page}`, {
      method: 'POST',
      headers: {
        authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sto: sto }),
    })
      .then(response => response.json())
      .then(result => {
        if (result.status) {
          const serverData = result.data.items;
          setArticles([...articles, ...serverData]);
          setIsLoading(false);
          setServerError('');

        } else {
          setIsLoading(false);
          setServerError(result.message);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  useFocusEffect(
    useCallback(() => {
      if (token) {
        fetchStoDetails();
      }
    }, [token, page]),
  );

  if (barcode) {
    const article = articles.find(item => item.barcode === String(barcode));
    if (article) {
      navigation.push('PickingStoArticle', article);
      setBarcode('');
    } else {
      toast('Barcode not found!');
      setBarcode('');
    }
  }

  const loadMoreItem = () => {
    if (totalPage >= page) {
      setPage(prev => prev + 1);
    } else {
      setIsLoading(false);
    }
  };

  const renderItem = ({ item, index }) => (
    <View
      key={index}
      className="flex-row border border-tb rounded-lg mt-2.5 p-4"
    // onPress={() => navigation.push('PickingStoArticle', item)}
    >
      <Text
        className="w-1/5 text-black text-xs text-center"
        numberOfLines={1}>
        {item.material}
      </Text>
      <Text
        className="w-3/5 text-black text-xs text-center"
        numberOfLines={1}>
        {item.description}
      </Text>
      <Text
        className="w-1/5 text-black text-[13px] text-center"
        numberOfLines={1}>
        {item.quantity}
      </Text>
    </View>
  );

  articles = [...new Set(articles)];

  return (
    <SafeAreaView className="flex-1 bg-white pt-8">
      <View className="flex-1 h-full px-2">
        <View className="screen-header flex-row items-center mb-4">
          <Text className="flex-1 text-lg text-sh text-center font-semibold capitalize">
            picking {' ' + sto}
          </Text>
        </View>
        <View className="content flex-1 justify-around mt-5 mb-6">
          <View className="table h-full pb-2">
            <View className="flex-row bg-th text-center mb-2 py-2">
              <Text className="flex-1 w-1/5 text-white text-[13px] text-center font-bold">
                Article ID
              </Text>
              <Text className="flex-1 w-3/5 text-white text-[13px] text-center font-bold">
                Article Name
              </Text>
              <Text className="flex-1 w-1/5 text-white text-[13px] text-center font-bold">
                Quantity
              </Text>
            </View>
            <FlatList
              data={articles}
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

export default PickingSto;
