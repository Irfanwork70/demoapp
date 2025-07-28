import { useTheme } from "@/context/ThemeContext";
import { Stack } from "expo-router";
import { View } from "react-native";

export default function RootStack() {
    const { colors } = useTheme();
    return (
        <View style={{
            flex: 1,
            backgroundColor: colors.background
        }}>
            <Stack screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="(auth-screens)/login" />
                <Stack.Screen name="(auth-screens)/signup" />
                <Stack.Screen name="(tabs)" />
            </Stack>
        </View>
    )
}