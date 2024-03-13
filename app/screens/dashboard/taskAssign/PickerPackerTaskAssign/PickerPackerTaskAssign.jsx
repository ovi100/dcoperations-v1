import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { ButtonBack, ButtonLg } from '../../../../../components/buttons';
import { getStorage } from '../../../../../hooks/useStorage';
import { toast } from '../../../../../utils';

const PickerPackerTaskAssign = ({ navigation, route }) => {
  const { sto } = route.params;
  const [token, setToken] = useState('');
  const API_URL = 'https://shwapnooperation.onrender.com/api/sto-tracking/update';

  useEffect(() => {
    getStorage('token', setToken, 'string');
  }, []);

  const pickers = [
    {
      id: 'pi28182',
      name: 'abu sayed',
    },
    {
      id: 'pi28181',
      name: 'eftykhar',
    },
    {
      id: 'pi29601',
      name: 'tanvir',
    },
    {
      id: 'pi28180',
      name: 'sadman',
    },
    {
      id: 'pi28187',
      name: 'munib',
    },
  ];
  const packers = [
    {
      id: 'pa29102',
      name: 'aquib',
    },
    {
      id: 'pa28170',
      name: 'siam',
    },
    {
      id: 'pa21506',
      name: 'majid',
    },
    {
      id: 'pa17520',
      name: 'belal',
    },
    {
      id: 'pa27405',
      name: 'sadat',
    },
  ];
  const [selectedPicker, setSelectedPicker] = useState(null);
  const [selectedPacker, setSelectedPacker] = useState(null);

  const updateTask = async () => {
    const assignedPicker = pickers.find(item => item.name === selectedPicker);
    const assignedPacker = packers.find(item => item.name === selectedPacker);
    let data = {};
    if (selectedPicker) {
      if (assignedPicker && assignedPacker) {
        data = {
          sto: sto,
          picker: assignedPicker.name,
          pickerId: assignedPicker.id,
          packer: assignedPacker.name,
          packerId: assignedPacker.id,
          status: 'picker packer assigned'
        };
      }
      else if (assignedPicker) {
        data = {
          sto: sto,
          picker: assignedPicker.name,
          pickerId: assignedPicker.id,
          status: 'picker assigned'
        };
      } else if (assignedPacker) {
        data = {
          sto: sto,
          packer: assignedPacker.name,
          packerId: assignedPacker.id,
          status: 'picker packer assigned'
        };
      }
      else {
        toast('please select picker or picker')
        return;
      }
    }
    else {
      toast('select picker first')
      return;
    }

    console.log('task data', data);

    try {
      await fetch(API_URL, {
        method: 'PATCH',
        headers: {
          authorization: token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(data => {
          if (data.status) {
            toast(data.message);
            setTimeout(() => {
              navigation.goBack();
            }, 1000);
          } else {
            toast(data.message);
          }
        })
        .catch(error => {
          console.log('Fetch Error', error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white pt-8">
      <View className="flex-1 h-full px-4">
        <View className="screen-header flex-row items-center mb-4">
          <ButtonBack navigation={navigation} />
          <View className="flex-1 flex-row justify-center">
            <Text className="text-lg text-sh font-bold uppercase">sto:</Text>
            <Text className="text-lg text-sh">{' ' + sto}</Text>
          </View>
        </View>
        <View className="content flex-1 justify-between py-5">
          <View className="picker-packer-assign">
            <View className="picker mb-4">
              <Text className="text-base text-sh font-semibold capitalize mb-2">
                assign picker
              </Text>
              {/* picker select box */}
              <View className="bg-white border border-solid border-gray-300 rounded mb-3 px-3">
                <Picker
                  selectedValue={selectedPicker}
                  onValueChange={picker => setSelectedPicker(picker)}
                  style={{ color: 'black' }}>
                  <Picker.Item label="Select Picker" value="" />
                  {pickers.map((picker, i) => (
                    <Picker.Item
                      label={picker.name}
                      value={picker.name}
                      key={i}
                      style={{ color: 'black' }}
                    />
                  ))}
                </Picker>
              </View>
            </View>
            <View className="packer">
              <Text className="text-base text-sh font-semibold capitalize mb-2">
                assign packer
              </Text>

              {/* packer select box */}
              <View className="bg-white border border-solid border-gray-300 rounded mb-3 px-3">
                <Picker
                  selectedValue={selectedPacker}
                  onValueChange={packer => setSelectedPacker(packer)}
                  style={{ color: 'black' }}>
                  <Picker.Item label="Select Packer" value="" />
                  {packers.map((packer, i) => (
                    <Picker.Item
                      label={packer.name}
                      value={packer.name}
                      key={i}
                      style={{ color: 'black' }}
                    />
                  ))}
                </Picker>
              </View>
            </View>
          </View>

          <View className="button mt-3">
            <ButtonLg title="Task Assign" onPress={() => updateTask()} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PickerPackerTaskAssign;
