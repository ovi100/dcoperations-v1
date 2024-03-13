import { useEffect, useState } from 'react';
import { Image, SafeAreaView, Text, TextInput, View } from 'react-native';
import { ButtonBack, ButtonLg, ButtonLoading } from '../../../../../components/buttons';
import { BoxIcon } from '../../../../../constant/icons';
import { getStorage } from '../../../../../hooks/useStorage';
import { toast } from '../../../../../utils';

const PickingStoArticle = ({ navigation, route }) => {
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [token, setToken] = useState('');
  const { sto, material, description, quantity } = route.params;
  const [pickedQuantity, setPickedQuantity] = useState(quantity);
  const API_URL = 'https://shwapnooperation.onrender.com/api/article-tracking';

  useEffect(() => {
    getStorage('token', setToken, 'string');
  }, []);

  const addToArticleTracking = async () => {
    if (pickedQuantity > quantity) {
      toast('Quantity exceed');
    } else {
      let data = { sto, code: material, quantity, name: description, status: 'inbound picking', pickedQuantity }
      console.log(data);

      try {
        setIsButtonLoading(true);
        await fetch(API_URL, {
          method: 'POST',
          headers: {
            authorization: token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
          .then(response => response.json())
          .then(result => {
            toast(result.message)
            setIsButtonLoading(false);
            navigation.goBack();
          })
          .catch(error => {
            console.log(error);
            setIsButtonLoading(true);
          });
      } catch (error) {
        console.log(error);
        setIsButtonLoading(true);
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white pt-14">
      <View className="flex-1 px-4">
        <View className="screen-header flex-row items-start justify-between mb-4">
          <ButtonBack navigation={navigation} />
          <View className="text">
            <View className="flex-row justify-end">
              <Text className="text-base text-sh font-medium capitalize">
                picking article
              </Text>
              <Text className="text-base text-sh font-bold capitalize">
                {' ' + material}
              </Text>
            </View>
            <Text className="text-sm text-sh text-right font-medium capitalize">
              {description}
            </Text>
          </View>
        </View>

        {/* Quantity Box */}
        <View className="quantity-box bg-[#FEFBFB] border border-[#F2EFEF] p-5">
          <View className="box-header flex-row items-center justify-between">
            <View className="text">
              <Text className="text-base text-[#2E2C3B] font-medium capitalize">
                picked quantity
              </Text>
            </View>
            <View className="quantity flex-row items-center gap-3">
              <Image source={BoxIcon} />
              <Text className="text-black font-bold">{quantity}</Text>
            </View>
          </View>
          <View className="input-box mt-6">
            <TextInput
              className="bg-[#F5F6FA] border border-t-0 border-black/25 h-[50px] text-[#5D80C5] rounded-2xl mb-3 px-4"
              placeholder="Type Picked Quantity"
              placeholderTextColor="#5D80C5"
              selectionColor="#5D80C5"
              keyboardType="numeric"
              autoFocus={true}
              value={pickedQuantity.toString()}
              onChangeText={value => {
                setPickedQuantity(value);
              }}
            />
          </View>
        </View>

        <View className="button mt-3">
          {isButtonLoading ? <ButtonLoading styles='bg-theme rounded-md p-5' /> :
            <ButtonLg title="Mark as Picked" onPress={() => addToArticleTracking()} />
          }

        </View>
      </View>
    </SafeAreaView>
  );
};

export default PickingStoArticle;
