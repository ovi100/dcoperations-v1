import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const TabNav = ({ navItems, active, setActive }) => {
  console.log(navItems);
  return (
    <View className="tabs-nav bg-white flex-row">
      {navItems.map((item) => (
        <TouchableOpacity
          key={item.id}
          onPress={() => setActive(item)}
          className="w-1/2"
        >
          <View
            className="item-box bg-[#F6FEFF] rounded-md border border-black/10 pb-4"
          >
            <Image className="w-5 h-5" source={item.icon} />
            <Text className="text-sm text-sh font-semibold">{item.count}</Text>
            <Text className="text-sm text-sh capitalize">{item.name}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default TabNav;
