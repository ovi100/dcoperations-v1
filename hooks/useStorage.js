import AsyncStorage from '@react-native-async-storage/async-storage';
import { toast } from '../utils';

const setStorage = async (key, value) => {
  try {
    if (typeof value === 'object') {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } else {
      await AsyncStorage.setItem(key, value);
    }
  } catch (error) {
    toast(error.message);
  }
};

const getStorage = async (key, fn, type = '') => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (type === 'object') {
      return fn(value !== null ? JSON.parse(value) : null);
    } else {
      return fn(value !== null ? value : null);
    }
  } catch (error) {
    toast(error.message);
  }
};

const removeItem = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    toast(error.message);
  }
};

const removeAll = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    toast(error.message);
  }
};

export { getStorage, removeAll, removeItem, setStorage };

