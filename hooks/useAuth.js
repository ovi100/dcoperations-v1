import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { getStorage, removeItem, setStorage } from './useStorage';

const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const API_URL = 'https://shwapnooperation.onrender.com/api/';

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await fetch(API_URL + 'user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
      });

      if (!response.ok) {
        setIsLoading(false);
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setUser(data.user);
      setToken(data.token);
      setStorage('token', data.token);
      setStorage('user', data.user);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Error', 'Login failed');
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    removeItem('user');
    removeItem('token');
    setIsLoading(false);
  };

  const isLoggedIn = () => {
    console.log('checking is logged in')
    try {
      setIsLoading(true);
      let storedUser = getStorage('user', setUser, 'object');
      let storedToken = getStorage('token', setToken);

      if (storedUser) {
        setUser(storedUser);
        setToken(storedToken);
        setIsLoading(false);
      }
    } catch (error) {
      Alert.alert('Error', 'Login failed');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  const authInfo = {
    login,
    logout,
    isLoading,
    user,
    setUser,
    token,
  };

  return authInfo;
};

export default useAuth;
