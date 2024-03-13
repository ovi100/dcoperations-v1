import {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchCamera} from 'react-native-image-picker';
import {ButtonBack, ButtonLg} from '../../../../../components/buttons';
import {ImageIcon} from '../../../../../constant/icons';

const QualityCheck = ({navigation}) => {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const pickImage = async () => {
    try {
      setIsLoading(true);
      const result = await launchCamera({mediaType: 'photo', quality: 1});
      console.log(result);

      if (result.didCancel) {
        setImage(null);
        setIsLoading(false);
        return;
      }

      if (result.assets[0].uri) {
        setImage(result.assets[0].uri);
        setIsLoading(false);
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  const reTake = () => {
    setImage(null);
    pickImage();
  };

  return (
    <SafeAreaView className="flex-1 bg-white pt-8">
      <View className="flex-1 h-full px-4">
        <View className="screen-header flex-row items-center mb-4">
          <ButtonBack navigation={navigation} />
          <Text className="flex-1 text-lg text-sh text-center font-semibold capitalize">
            quantity check
          </Text>
        </View>
        <View className="content flex-1 justify-between py-5">
          <View className="image-upload">
            {isLoading && (
              <View className="image-picker h-60 items-center justify-center border border-dashed border-theme">
                <ActivityIndicator size="large" color="#3758FA" />
              </View>
            )}
            {image === null && !isLoading && (
              <TouchableOpacity onPress={pickImage}>
                <View className="image-picker h-60 items-center justify-center border border-dashed border-theme">
                  <Image className="mx-auto mb-2" source={ImageIcon} />
                  <Text className="text-theme text-base text-center">
                    Click here to upload image
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            {image && (
              <View className="image-preview">
                <Image className="w-full h-60" source={{uri: image}} />
                <View className="buttons flex-row justify-around mt-3">
                  <ButtonLg title="Remove" onPress={() => removeImage()} />
                  <ButtonLg title="Retake" onPress={() => reTake()} />
                </View>
              </View>
            )}
          </View>
          <View className="button mt-3">
            <ButtonLg
              title="Submit"
              onPress={() => alert('submit button clicked')}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default QualityCheck;
