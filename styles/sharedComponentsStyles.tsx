import { Utility, Utility_Horizontal } from "@/constants/Utility";
import { useTheme } from "@/context/ThemeContext";
import { fontScale } from "@/utils/responsive";
import { StyleSheet } from "react-native";

export const useSharedComponentStyles = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    // screen component styles
    scrollViewContent: {
      paddingBottom: Utility.SP_80,
    },
    scrollViewSafeAreaContent: {
      paddingBottom: Utility.SP_52,
    },
    screenContainer: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollView: {
      flex: 1,
    },
    cardContainer: {
      backgroundColor: '#fff',
      borderRadius: 24,
      padding: 24,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 16,
      elevation: 4,
    },
    // custome input
    baseInput: {
      height: 52,
      borderRadius: 16,
      padding: 16,
      color: colors.text,
      fontSize: fontScale(16),
    },
    inputError: {
      color: colors.alert,
      fontSize: fontScale(12),
      paddingTop: Utility.SP_2
    },
    inputContained: {
      backgroundColor: colors.inputBackgroundColor,
      borderWidth: Utility.SP_1,
      borderColor: colors.inputBackgroundColor,
    },
    inputOutlined: {
      borderWidth: Utility.SP_1,
      borderColor: colors.borderColor,
      borderStyle: "solid"
    },
    inputUnderLined: {
      borderBottomWidth: Utility.SP_1,
      borderBottomColor: colors.borderColor,
    },
    inputLabel: {
      color: colors.text,
      marginBottom: Utility.SP_4,
    },
    isRequired: {
      color: colors.alert,
      alignSelf: "flex-start"
    },
    inputTop: {
      display: "flex",
      alignItems: "center",
      flexDirection: "row"
    },
    outlinedError: {
      borderWidth: Utility.SP_1,
      borderColor: colors.alert,
    },
    underLinedError: {
      borderBottomWidth: Utility.SP_1,
      borderBottomColor: colors.alert,
    },

    // custom button
    buttonBase: {
      minHeight: Utility.SP_10,
      borderRadius: Utility_Horizontal.SP_20,
      paddingVertical: Utility.SP_10,
      paddingHorizontal: Utility_Horizontal.SP_12,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
    },
    buttonContained: {
      backgroundColor: colors.secondary,
    },
    buttonOutlined: {
      backgroundColor: "transparent",
      borderWidth: Utility.SP_2,
      borderColor: colors.borderColor,
    },
    buttonDisabled: {
      backgroundColor: colors.disabled,
      borderColor: colors.disabled,
    },
    buttonTextBase: {
      fontSize: fontScale(16),
      fontWeight: "bold",
    },
    buttonText: {
      color: colors.text,
    },
    buttonTextOutlined: {
      color: colors.text,
    },
    buttonTextDisabled: {
      color: colors.textDisabled,
    },
    gradientButtonBackground: {
      ...StyleSheet.absoluteFillObject,
      minHeight: Utility.SP_10,
      borderRadius: Utility_Horizontal.SP_20,
      paddingVertical: Utility.SP_10,
      paddingHorizontal: Utility_Horizontal.SP_12,
      zIndex: -1,
    },

    // custom auth header styles
    logoContainer: {
      marginTop: Utility.SP_60,
      alignItems: "center",
      gap: Utility.SP_12,

    },
    logoText: {
      fontSize: fontScale(24),
      textTransform: "capitalize",
      textAlign: "center",
      fontStyle: "italic",
      fontWeight: 700,
      color: colors.text
    },
    logoImage: {
      width: Utility.SP_150,
      height: Utility.SP_150,
      borderRadius: Utility.SP_100
    },
    lottieAnimationStyle: {
      width: Utility_Horizontal.SP_200,
      height: Utility_Horizontal.SP_200,
      marginTop: Utility.SP_10
    },
  });
};
