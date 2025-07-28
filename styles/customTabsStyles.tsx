import { Utility } from "@/constants/Utility";
import { useTheme } from "@/context/ThemeContext";
import { StyleSheet } from "react-native";



export const useCustomTabsStyles = () => {
    const { colors } = useTheme();
    return StyleSheet.create({
        tabs: {
            flex: 1,
        },
        tabList: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            padding: Utility.SP_10,
            height: Utility.SP_70,
            width: "90%",
            marginBottom: Utility.SP_20,
            backgroundColor: colors.primary,
            alignSelf: "center",
            borderRadius: Utility.SP_40,
            gap: Utility.SP_20,

        },
        tabTrigger: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
        }
    })
}