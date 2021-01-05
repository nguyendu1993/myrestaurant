import AsyncStorage from '@react-native-community/async-storage';
const getDataFromStorage = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return JSON.parse(value);
        } else {
            return null;
        }
    } catch (error) {
        return '';
    }
}
export default getDataFromStorage;