import AsyncStorage from '@react-native-async-storage/async-storage';

export const setFromStoreData = async (name: string, value: string) => {
  try {
    await AsyncStorage.setItem(`@${name}`, value);
  } catch (err) {
    console.log(err, 'setFromStoreDataErr');
  }
};

export const getFromStoreData = async (name: string) => {
  try {
    const result = await AsyncStorage.getItem(`@${name}`);
    return result;
  } catch (err) {
    console.log(err, 'getFromStoreDataErr');
  }
};

export const removeFromStoreData = async (name: string) => {
  try {
    await AsyncStorage.removeItem(`@${name}`);
  } catch (err) {
    console.log(err, 'removeFromStoreDataErr');
  }
};
