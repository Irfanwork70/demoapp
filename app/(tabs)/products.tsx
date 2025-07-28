import { Screen } from "@/components/shared/Screen";
import { useTheme } from "@/context/ThemeContext";
import { Text } from "react-native";
const Products = () => {
    const { colors } = useTheme();
    return (

        <Screen withSafeArea={true}>
            <Text style={{ color: colors.text }}>Products</Text>
        </Screen>
    )
}

export default Products