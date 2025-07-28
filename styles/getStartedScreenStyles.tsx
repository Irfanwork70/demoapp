import { Utility, Utility_Horizontal } from "@/constants/Utility";
import { useTheme } from "@/context/ThemeContext";
import { fontScale } from "@/utils/responsive";
import { StyleSheet } from "react-native";


export const useGetStartedScreenStyles = () => {
    const { colors } = useTheme();
    return StyleSheet.create({
        cardContainer: {
            borderTopStartRadius: Utility.SP_40,
            borderTopEndRadius: Utility.SP_40,
            paddingTop: Utility.SP_40,
            padding: Utility_Horizontal.SP_12,
            backgroundColor: colors.background,
            gap: Utility.SP_40,
            minHeight: Utility.SP_345
        },
        cardBottom: {
            flex: 1,
            paddingBottom: Utility.SP_10,
            justifyContent: "flex-end",
            gap: Utility.SP_8
        },
        title: {
            color: colors.primary,
            textAlign: "center",
            fontSize: fontScale(28),
            fontWeight: 800
        },
        subTitle: {
            fontSize: fontScale(20),
        },
        socialContainer: {
            gap: Utility.SP_10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
        },
        socialIcon: {
            color: colors.primary,
            fontSize: fontScale(24)
        }
    })
}