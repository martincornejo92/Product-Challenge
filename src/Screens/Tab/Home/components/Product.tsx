import { Ionicons } from "@expo/vector-icons";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import moment from "moment-timezone";
import {
  AppImage,
  globalStyles,
  Loading,
  Rating,
} from "../../../../components";
import { StoredProduct } from "../../../../models/Product";
import { SharedScreenParamList } from "../../../../Navigation/types";

//TODO: Fix the bug with nested navigation
type HomeScreenNavigationProps = StackNavigationProp<SharedScreenParamList>;

interface Props {
  data: StoredProduct;
  variant?: "vertical" | "horizontal";
}
const Product = ({ data, variant = "horizontal" }: Props) => {
  const navigation = useNavigation<HomeScreenNavigationProps>();
  const toggleBookmark = () =>
    isBookmarked ? removeBookmark() : addBookmark(data);
  const isHorizontal = variant === "horizontal";
  const handleNavigation = () => {
    navigation.navigate("ProductDetails", data);
  };
  return (
    <Pressable
      onPress={handleNavigation}
      style={{
        flexDirection: isHorizontal ? "row" : "column",
        width: !isHorizontal ? 100 : undefined,
      }}
    >
      <SharedElement id={`image-${data.id}`}>
      <Image
          style={styles.ProductPic}
          source={{uri: data.image !== null ? data.image : null}}
        />
      </SharedElement>
      <View style={{ flex: 1, padding: isHorizontal ? 5 : 0 }}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[styles.heading]}
        >
          {data.product}
        </Text>
        <Text numberOfLines={2} style={{fontSize: 14,opacity: 0.5, marginTop: 15}}>
          {moment(data.createdAt).format('DD MMMM YYYY')}
        </Text>
      </View>
      <View style={{marginTop: 20}}>
      <Text numberOfLines={2} style={{fontSize: 14,opacity: 0.5,}}>
          {data.is_redemption === true ? '+' : '-'}{data.points}
      </Text>
      </View>
      <View style={{margin: 10}}>
      <Ionicons name="chevron-forward-outline" size={30} onPress={null} />
      </View>
    </Pressable>
  );
};

export default Product;

const styles = StyleSheet.create({
  heading: {
    fontSize: 14,
    fontWeight: "bold",
  },
  ProductPic: {
    width: 80,
    height: 80,
    borderRadius: 30,
  },
});
