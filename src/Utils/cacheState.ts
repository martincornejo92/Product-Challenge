import AsyncStorage from "@react-native-async-storage/async-storage";
import { CACHE_KEY } from "../Constants";
import { StoredProduct } from "../models/Product";


export const setCacheData = async (Product: StoredProduct[]) => {
    try {
        const value = JSON.stringify(Product);
        await AsyncStorage.setItem(CACHE_KEY, value);
    } catch (error) {
        
    }
}

export const getCacheData = async ()=> {
    try {
        const value = await AsyncStorage.getItem(CACHE_KEY);
        if (value !== null) {
            return JSON.parse(value) as StoredProduct[];
        }
        else{
            return [] as StoredProduct[]
        }
    } catch (error) {
        
    }
}