import { Utility } from "@/constants/Utility";
import { useTheme } from "@/context/ThemeContext";
import { fontScale, height } from "@/utils/responsive";
import { StyleSheet } from "react-native";

const HEADER_HEIGHT = height / 7;

export const useGlobalStyles = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    flex1: {
      flex: 1,
    },
    fullScreenVerticalAlignment: {
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
    },
    paddingHorizontal10: {
      paddingHorizontal: Utility.SP_10,
    },
    justifyBetween: {
      justifyContent: "space-between"
    },
    headerBackgroundColor: {
      backgroundColor: colors.background,
      height: HEADER_HEIGHT,
    },
    headerTitleText:{
      fontWeight: "600",
      fontSize: fontScale(24.43),
      fontStyle: "normal",
      color: colors.text,
    },
    pb130: {
      paddingBottom: Utility.SP_130,
    },
    verticalAlignment: {
      justifyContent: "center",
      alignItems: "center",
    },
    alignSelfCenter: {
      alignSelf: "center",
    },
    mb10: {
      marginBottom: Utility.SP_10,
    },
    h0: {
      height: 0,
    },
    mt10: {
      marginTop: Utility.SP_10,
    },
    mt20: {
      marginTop: Utility.SP_20,
    },
    mt70: {
      marginTop: Utility.SP_70,
    },
    alignSelfStart: {
      alignSelf: "flex-start",
    },
    mb0: {
      marginBottom: 0,
    },
    pb50:{
      paddingBottom:Utility.SP_50
    },
    mb15:{
      marginBottom:Utility.SP_15
    },
    mb60:{
      marginBottom:Utility.SP_60
    },
    textALignRight:{
      textAlign:"right"
    },
    w12:{
      width: Utility.SP_12 
    },
    w100px:{
      width: Utility.SP_100
    },
    rowWithGap10:{
      flexDirection:'row',
      gap:Utility.SP_10
    },
    ml20:{
      marginLeft:Utility.SP_20
    },
    fullScreenCover:{
      position: "absolute",
      zIndex: 1,
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
    },
    mb30px:{
      paddingBottom:Utility.SP_30
    },
    h100Per:{
      height:'100%'
    },
    w100Per:{
      width:'100%'
    },
    fs20:{
      fontSize: fontScale(12) 
    },
    m0:{
      margin:0
    }
  });
};
