import { Utility, Utility_Horizontal } from "@/constants/Utility";
import { useTheme } from "@/context/ThemeContext";
import { StyleSheet } from "react-native";


export const useSignupScreenStyles = () => {
    const { colors } = useTheme();
    return StyleSheet.create({
        cardContainer: {
            borderTopStartRadius: Utility.SP_40,
            borderTopEndRadius: Utility.SP_40,
            paddingTop: Utility.SP_40,
            padding: Utility_Horizontal.SP_12,
            backgroundColor: colors.background,
            justifyContent: "space-between",
            paddingBottom: Utility.SP_20,
            flex: 1,
            marginTop: Utility.SP_10
        },
        cardContent: {
            flex: 1,
            justifyContent: "space-between",
            paddingBottom: Utility.SP_10,
            gap: Utility.SP_12
        },
        cardTop: {
            gap: Utility.SP_8
        },
        cardBottom: {
        },
        linkText: {
            color: colors.primary,
            textAlign:"center"
        },
        link: {
            color: colors.secondary,
            fontWeight: 800
        }
    })
}