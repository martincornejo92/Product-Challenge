import { NavigatorScreenParams } from "@react-navigation/native"
import { StoredProduct } from "../models/Product"

export type SharedScreenParamList = {
    ProductDetails: StoredProduct
    Home: undefined;
    Bookmarks: undefined;
}