import { Link } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, Text, View } from 'react-native';
import { ButtonProfile } from '../../../components/buttons';
import {
  ChildPackingIcon,
  DeliveryNoteIcon,
  DeliveryPlanIcon,
  PickingIcon,
  ReceivingIcon,
  ReturnIcon,
  ShelvingIcon,
  TaskAssignIcon,
} from '../../../constant/icons';
import { getStorage } from '../../../hooks/useStorage';

const Home = ({navigation}) => {
  const [user, setUser] = useState({});
  let filteredLinks;

  useEffect(() => {
    getStorage('user', setUser, 'object');
  }, []);

  const navLinks = [
    {
      name: 'Receiving',
      icon: ReceivingIcon,
      screen: 'Receiving',
      role: 'receiver',
    },
    {
      name: 'Shelving',
      icon: ShelvingIcon,
      screen: 'Shelving',
      role: 'shelver',
    },
    {
      name: 'Delivery Plan',
      icon: DeliveryPlanIcon,
      screen: 'DeliveryPlan',
      role: 'delivery-planner',
    },
    {
      name: 'Task Assign',
      icon: TaskAssignIcon,
      screen: 'TaskAssign',
      role: 'task-assigner',
    },
    {
      name: 'Picking',
      icon: PickingIcon,
      screen: 'Picking',
      role: 'picker',
    },
    {
      name: 'Child Packing',
      icon: ChildPackingIcon,
      screen: 'ChildPacking',
      role: 'packer',
    },
    // {
    //   name: 'Master Packing',
    //   icon: MasterPackingIcon,
    //   screen: 'MasterPacking',
    //   role: 'packer',
    // },
    {
      name: 'Final Delivery Note',
      icon: DeliveryNoteIcon,
      screen: 'DeliveryNote',
      role: 'DN charge',
    },
    {
      name: 'Return',
      icon: ReturnIcon,
      screen: 'Return',
      role: 'returner',
    },
    // {
    //   name: 'Print',
    //   icon: PrinterIcon,
    //   screen: 'Print',
    //   role: 'printer',
    // }
  ];

  if (user.role === 'super-admin') {
    filteredLinks = navLinks;
  } else {
    filteredLinks = navLinks.filter(link => link.role === user.role);
  }

  return (
    <SafeAreaView className="flex-1 bg-white pt-8">
      <View className="flex-1">
        <View className="screen-header flex-row items-center justify-between mb-5 px-6">
          <Text className="text-lg text-[#060239] text-center font-semibold capitalize">
            home
          </Text>
          <ButtonProfile onPress={() => navigation.push('Profile')} />
        </View>
        <View className="flex-row flex-wrap items-center px-3">
          {filteredLinks.map(item => (
            <View
              className="menu-box items-center w-1/3 mt-8"
              key={item.screen}>
              <Link to={{screen: item.screen}}>
                <View className="flex-col items-center">
                  <View className="icon">
                    <Image className="w-24 h-24" source={item.icon} />
                  </View>
                  <Text className="text text-black mt-3">{item.name}</Text>
                </View>
              </Link>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;