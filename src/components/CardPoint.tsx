import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
interface Props {
  month: string;
  points: string;
}
const CardPoint = ({month, points}) => {
  return (
    <View style={{ height: 143, width: 286, borderRadius: 30, flexDirection: 'column', backgroundColor:'#334FFA', alignItems:'center',  shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,   }}>
      <View style={{margin: 10, marginLeft:'-50%'}}>
        <Text style={{color: 'white', fontSize: 16, fontFamily:'Avenir', fontWeight:'bold'}}>{month}</Text>
      </View>
      <View style= {{margin: 5}}>
        <Text style={{color: 'white', fontSize: 32, fontFamily:'Avenir', fontWeight:'bold'}}>{points} pts</Text>
      </View>
    </View>
  );
};

export default CardPoint;