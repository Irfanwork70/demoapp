import { Utility, Utility_Horizontal } from "@/constants/Utility";
import { useTheme } from "@/context/ThemeContext";
import { StyleSheet } from "react-native";


export const useLoginScreenStyles = () => {
    const { colors } = useTheme();
    return StyleSheet.create({
        cardContainer: {
            borderTopStartRadius: Utility.SP_40,
            borderTopEndRadius: Utility.SP_40,
            paddingTop: Utility.SP_40,
            padding: Utility_Horizontal.SP_12,
            backgroundColor: colors.background,
            minHeight: Utility.SP_345,
            justifyContent: "space-between",
            paddingBottom: Utility.SP_20
        },
        cardContent: {
            flex: 1,
            justifyContent: "space-between",
            paddingBottom: Utility.SP_10
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