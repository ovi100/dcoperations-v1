import React from 'react';
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { ButtonProfile } from '../../../components/buttons';
import { Dk02Icon, Dk11Icon } from '../../../constant/icons';
import useAppContext from '../../../hooks/useAppContext';
import { setStorage } from '../../../hooks/useStorage';

const SiteOption = ({ navigation }) => {
  const { authInfo } = useAppContext();
  const { user, setUser } = authInfo;

  let sites;
  const siteIcons = [
    {
      name: 'PnP DC',
      code: 'DK02',
      icon: Dk02Icon
    },
    {
      name: 'Tejgaon DC',
      code: 'DK11',
      icon: Dk11Icon
    }
  ];


  if (!Array.isArray(user.site)) {
    navigation.navigate('Home');
    return;
  }

  if (Array.isArray(user.site)) {
    sites = user.site.map(item => siteIcons.find(elm => elm.code === item));
  }

  const updateUser = (site) => {
    let newUser = { ...user, site: site };
    console.log(newUser)
    setUser(newUser);
    setStorage("user", newUser);
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView className="flex-1 bg-white pt-8">
      <View className="flex-1">
        <View className="screen-header flex-row items-center justify-between mb-5 px-6">
          <Text className="text-lg text-[#060239] text-center font-semibold capitalize">
            choose site
          </Text>
          <ButtonProfile onPress={() => navigation.push('Profile')} />
        </View>
        <View className="flex-row flex-wrap items-center px-3">
          {sites.map(item => (
            <TouchableOpacity
              className="site-box items-center w-1/3 mt-8"
              onPress={() => updateUser(item.code)}
              key={item.code}>
              <View className="flex-col items-center">
                <View className="icon">
                  <Image className="w-16 h-16" source={item.icon} />
                </View>
                <Text className="text text-black mt-3">{item.code}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  )
}


export default SiteOption;