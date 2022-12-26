import { Ionicons } from "@expo/vector-icons";
import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { SharedElement } from "react-navigation-shared-element";
import { globalStyles } from "../../components";
import { SharedScreenParamList } from "../../Navigation/types";
import { useBookmark, useToggleTabBarVisibility } from "../../Hooks";
import moment from "moment-timezone";

type ProductDetailsScreenProps = StackScreenProps<
  SharedScreenParamList,
  "ProductDetails"
>;

const ProductDetails = ({ navigation, route }: ProductDetailsScreenProps) => {
  const {
    createdAt,
        product,
        points,
        image,
        is_redemption,
        id,
  } = route.params;
  const [addBookmark, removeBookmark, isBookmarked] = useBookmark(id);
  useToggleTabBarVisibility(navigation);
  const handleBackNavigation = () => navigation.goBack();

  const handleBookmarkPress = () => {
    isBookmarked
      ? removeBookmark()
      : addBookmark({
        createdAt,
        product,
        points,
        image,
        is_redemption,
        id,
        });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", padding: 20 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-stProduct",
          paddingBottom: 20,
        }}
      >
        <Ionicons name="arrow-back" size={30} onPress={handleBackNavigation} />
        <Text
            style={[
              globalStyles.heading,
              {
                textAlign: "center",
                marginHorizontal: 30,
                marginTop: 5,
                fontSize: product.length > 20 ? 20 : 30,
              },
            ]}
          >
            {product}
          </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.flexItem}>
          <SharedElement id={`image-${id}`}>
            <View>
            <Image
          style={styles.ProductPic}
          source={{uri: image !== null ? image : null}}
        />
            </View>
          </SharedElement>
        </View>
        <View style={{ height:'20%', marginTop: 20 }}>
        <Text style={{color:'#9B9898', fontSize: 14, fontWeight: 'bold'}}>
          Detalles del producto
        </Text>
          <Text style={{color: 'black', fontSize: 16, fontWeight:'bold', marginTop: 20}}>Comprado el {moment(createdAt).format('DD MMMM YYYY')}</Text>
        </View>
        <View style={{ height:'20%', marginTop: 20 }}>
        <Text style={{color:'#9B9898', fontSize: 14, fontWeight: 'bold'}}>
          Con esta compra acumulaste
        </Text>
          <Text style={{color: 'black', fontSize: 16, fontWeight:'bold', marginTop: 20}}>{points}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  flexItem: {
    alignItems: "center",
  },
  button: {
    backgroundColor: "black",
    marginTop: 20,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  description: {
    textAlign: "center",
    marginVertical: 10,
  },
  ProductPic: {
    width: 244,
    height: 200,
    borderRadius: 10,
  },
});
