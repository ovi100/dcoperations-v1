import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Animated from 'react-native-reanimated';

const CustomDrawer = ({ toggleDrawer, setToggleDrawer, children }) => {

  const CloseIcon = () => {
    return (
      <View className="py-3">
        <View className="bg-black w-7 h-[3px] translate-y-1 rotate-45"></View>
        <View className="bg-black w-7 h-[3px] -rotate-45"></View>
      </View>
    )
  }

  return (
    <Animated.View
      style={[{
        elevation: 3,
        shadowColor: '#000',
      }, {
        transform: [{ translateX: toggleDrawer ? 0 : -1000 }],
      }]}
      className={`drawer w-56 bg-white h-screen absolute z-20 ease-in-out duration-300 p-2 ${!toggleDrawer ? "-right-full" : "right-0"}`}>
      <View className="drawer-header items-end mb-5">
        <TouchableOpacity onPress={() => setToggleDrawer(!toggleDrawer)}>
          <CloseIcon />
        </TouchableOpacity>
      </View>
      <View className="drawer-content">
        {children}
      </View>
    </Animated.View>
  )
}

export default CustomDrawer