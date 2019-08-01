import { AsyncStorage } from "react-native";

const STORAGE_KEY = '@MorningMeongmeong:list';

setList = (list) => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
};

getList = () => {
    return AsyncStorage.getItem(STORAGE_KEY);
};

export default {
    setList: setList,
    getList: getList,
}