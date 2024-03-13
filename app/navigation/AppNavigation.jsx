import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import useAppContext from '../../hooks/useAppContext';
import AppStack from './AppStack';
import AuthStack from './AuthStack';

const AppNavigation = () => {
  const { authInfo } = useAppContext();
  const { isLoading, user, token } = authInfo;

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <NavigationContainer>
      {user && token ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigation;