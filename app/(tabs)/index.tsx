import CustomButton from "@/components/shared/CustomButton";
import { Screen } from "@/components/shared/Screen";
import { useTheme } from "@/context/ThemeContext";
import { useExpoCalendar } from "@/hooks/useExpoCalendar";
import { Text } from "react-native";

const ALL = () => {
    const { colors, toggleTheme } = useTheme();
    const { isLoading, createCalendarEventAsync } = useExpoCalendar();

    return (
        <Screen withSafeArea={true}>
            <CustomButton
                title="toggle theme"
                onPress={toggleTheme}
            />
            <CustomButton
                title="Add Event"
                onPress={createCalendarEventAsync}
                disabled={isLoading}
                loading={isLoading}
            />
            <Text style={{ color: colors.text }}>Hello</Text>
        </Screen>
    )
}

export default ALL