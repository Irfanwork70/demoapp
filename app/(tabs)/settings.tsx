import { Screen } from "@/components/shared/Screen";
import { useTheme } from "@/context/ThemeContext";
import { Text } from "react-native";

const Settings = () => {
    const { colors } = useTheme();
    return (
        <Screen withSafeArea={true}>
            <Text style={{ color: colors.text }}>Settings</Text>
        </Screen>
    )
}

export default Settings