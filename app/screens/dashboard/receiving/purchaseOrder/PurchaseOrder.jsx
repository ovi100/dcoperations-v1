import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, DeviceEventEmitter, FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import ReadyForShelving from '../../../../../components/animations/ReadyForShelving';
import SearchAnimation from '../../../../../components/animations/Search';
import ServerError from '../../../../../components/animations/ServerError';
import useAppContext from '../../../../../hooks/useAppContext';
import { getStorage } from '../../../../../hooks/useStorage';
import { toast } from '../../../../../utils';
import SunmiScanner from '../../../../../utils/sunmi/scanner';

const PurchaseOrder = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [barcode, setBarcode] = useState('');
  const [token, setToken] = useState('');
  const [articles, setArticles] = useState([]);
  const tableHeader = ['Article ID', 'Article Name', 'Quantity'];
  const API_URL = 'https://shwapnooperation.onrender.com/';
  const { po_id } = route.params;
  const { GRNInfo } = useAppContext();
  const { grnItems, setGrnItems } = GRNInfo;
  const { startScan, stopScan } = SunmiScanner;

  useEffect(() => {
    getStorage('token', setToken, 'string');
    console.log(po_id)
  }, []);

  useEffect(() => {
    startScan();
    DeviceEventEmitter.addListener('ScanDataReceived', data => {
      console.log(data.code);
      setBarcode(data.code);
    });

    return () => {
      stopScan();
      DeviceEventEmitter.removeAllListeners('ScanDataReceived');
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      const fetchPO = async () => {
        await fetch(API_URL + 'bapi/po/display', {
          method: 'POST',
          headers: {
            authorization: token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ po: po_id }),
        })
          .then(response => response.json())
          .then(async result => {
            // console.log('po display', result)
            if (result.status) {
              await fetch(API_URL + 'api/product-shelving/ready',
                {
                  method: 'GET',
                  headers: {
                    authorization: token,
                  },
                },
              )
                .then(res => res.json())
                .then(async shelveData => {
                  if (shelveData.status) {
                    // console.log('shelve data', shelveData)
                    const poItems = result.data.items;
                    const shItems = shelveData.items;
                    let remainingPoItems = await poItems.filter(
                      poItem =>
                        !shItems.some(
                          shItem =>
                            shItem.po === poItem.po &&
                            shItem.code === poItem.material,
                        ),
                    );
                    setArticles(remainingPoItems);
                    setIsLoading(false);
                    setServerError('');
                  }
                  else {
                    const poItems = result.data.items;
                    setArticles(poItems);
                    setIsLoading(false);
                  }
                })
                .catch(error => console.log('Fetch catch', error));
            } else {
              setIsLoading(false);
              setServerError(result.message);
            }
          })
          .catch(error => {
            console.log(error);
          });
      };
      if (token) {
        fetchPO();
        return
      }
    }, [token, po_id]),
  );

  const renderItem = ({ item, index }) => (
    <View className="flex-row border border-tb rounded-lg mt-2.5 p-4" key={index}>
      <Text
        className="flex-1 text-black text-center"
        numberOfLines={1}>
        {item.material}
      </Text>
      <Text
        className="flex-1 text-black text-center"
        numberOfLines={1}>
        {item.description}
      </Text>
      <Text
        className="flex-1 text-black text-center"
        numberOfLines={1}>
        {item.quantity}
      </Text>
    </View>
  );

  if (barcode) {
    const poItem = articles.find(item => item.barcode === barcode);
    if (poItem) {
      navigation.push('PoArticles', poItem);
      setBarcode('');
    } else {
      toast('Item not found!');
    }
  }

  const GRNByPo = grnItems.filter(grnItem => grnItem.po === po_id);

  const createGRN = async () => {
    try {
      await fetch(API_URL + 'bapi/grn/from-po/create', {
        method: 'POST',
        headers: {
          authorization: token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(GRNByPo),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setGrnItems([]);
          setServerError(data.message);
          setTimeout(() => {
            navigation.goBack();
          }, 1000);
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white pt-8">
      <View className="flex-1 h-full px-4">
        <View className="screen-header flex-row items-center mb-4">
          <Text className="flex-1 text-lg text-sh text-center font-semibold uppercase">
            po {po_id}
          </Text>
          {GRNByPo.length ? (<TouchableOpacity className="bg-theme rounded-md p-2.5" onPress={() => createGRN()}>
            <Text className="text-white text-sm text-center font-medium">Create GRN</Text>
          </TouchableOpacity>) : null}

        </View>
        <View className="content flex-1 justify-between py-5">
          {
            isLoading ? (
              <SearchAnimation />
            )
              : (
                <>
                  {
                    serverError ?
                      (<ServerError message={serverError} />)
                      : (
                        <>
                          {
                            articles.length ?
                              (
                                <View className="table h-full pb-2">
                                  <View className="flex-row bg-th text-center mb-2 py-2">
                                    {tableHeader.map(th => (
                                      <Text className="flex-1 text-white text-center font-bold" key={th}>
                                        {th}
                                      </Text>
                                    ))}
                                  </View>
                                  <FlatList
                                    data={articles}
                                    renderItem={renderItem}
                                    keyExtractor={item => item.material}
                                    ListFooterComponent={isLoading && <ActivityIndicator />}
                                  />
                                </View>
                              )
                              : (
                                <View className="h-[90%] justify-center">
                                  <ReadyForShelving />
                                </View>
                              )}
                        </>
                      )}
                </>
              )}
        </View>
      </View>
    </SafeAreaView >
  );
};

export default PurchaseOrder;
