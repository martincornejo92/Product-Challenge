import { Ionicons } from "@expo/vector-icons";
import { Portal } from "@gorhom/portal";
import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  FlatListProps,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles, TabBar } from "../../../components";
import { Product as ProductModel } from "../../../models/Product";
import { SharedScreenParamList } from "../../../Navigation/types";
import getRandomProduct from "../../../Utils/getRandomValuesFromArray";
import { FAB, Product, PreLoaders } from "./components";
import axios from 'axios';
import {CardPoint} from "../../../components";
import moment from "moment-timezone";

type Props = StackScreenProps<SharedScreenParamList, "Home">;

const AnimatedFlatList =
  Animated.createAnimatedComponent<FlatListProps<ProductModel>>(FlatList);

const t = getRandomProduct(28);
const Home = ({ navigation }: Props) => {
  const [titles, sett] = useState(getRandomProduct(28));
  const [ data, setData ] = useState(null);
  const [newProduct, setNewProduct] = useState<ProductModel[]>([]);
  const [points, setPoint] =useState();
  const scrollY = useSharedValue(0);
  const scrollRef = useRef<FlatList>(null);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: ({ contentOffset }) => {
      scrollY.value = contentOffset.y;
    },
  });

  const onRefresh = () => sett(getRandomProduct(28));

  useEffect(() => {
    if (data) {
      setNewProduct(data.slice(1));
    }
    if(data !== null){
      setPoint(data.map(item => item.points).reduce((prev, curr) => prev + curr, 0));
    }else{
      axios
    .get('https://6222994f666291106a29f999.mockapi.io/api/v1/products')
    .then((response: any) => {
      setData(response.data);
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
    }
  }, [data]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={[styles.header]}>
        <View style={{ flexDirection: "column", alignItems: "flex-stProduct" }}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            Bienvenido de vuelta!
          </Text>
          <Text style={{ fontWeight: "normal", fontSize: 14 }}>
            Ruben Rodriguez
          </Text>
        </View>
      </View>

      <View style={styles.container}>
        <View style={{ flex: 1 }}>
        <Text style={[globalStyles.heading, styles.heading]}>
                  TUS PUNTOS
                </Text>
          <View style={{alignItems: 'center'}}>
          <CardPoint month={'Diciembre'} points={points} />
          </View>
          <View>
                <Text style={[globalStyles.heading, styles.heading]}>
                  TUS MOVIMIENTOS
                </Text>
              </View>
          <AnimatedFlatList
            ref={scrollRef}
            data={newProduct}
            renderItem={({ item, index }) => (
              <Product data={item} variant="horizontal" />
            )}
            ListEmptyComponent={() => (
              <PreLoaders count={3} direction="column" />
            )}
            keyExtractor={(item, index) => item.id + index}
            ItemSeparatorComponent={() => <View style={{ height: 30 }} />}
            onScroll={scrollHandler}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 300 }}
            refreshControl={
              <RefreshControl onRefresh={onRefresh} />
            }
          />
        </View>
      </View>
      <FAB
        {...{ scrollY }}
        onPress={() => {
          scrollRef.current?.scrollToOffset({ offset: 0, animated: true });
        }}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    zIndex: 4,
    backgroundColor: "#fff",
  },
  heading: {
    marginVertical: 20,
    color: '#9B9898'
  },
});
