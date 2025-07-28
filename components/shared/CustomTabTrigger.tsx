import { useTheme } from "@/context/ThemeContext";
import { useCustomTabsStyles } from "@/styles/customTabsStyles";
import { useGlobalStyles } from "@/styles/globalStyles";
import { Ionicons } from "@expo/vector-icons";
import { TabTriggerSlotProps } from "expo-router/ui";
import React, { useEffect } from "react";
import { Pressable, PressableProps } from "react-native";
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withSequence,
    withSpring,
    withTiming,
} from "react-native-reanimated";

export type TabButtonProps = PressableProps & TabTriggerSlotProps & {
    icon: any;
    label: string;
};

const CustomTabTrigger = ({
    icon,
    label,
    children,
    isFocused,
    onLongPress,
    onPress,
    ...props
}: TabButtonProps) => {
    const tabsStyles = useCustomTabsStyles();
    const globalStyles = useGlobalStyles();
    const { colors } = useTheme();

    // Base scale and translate values
    const scale = useSharedValue(1);
    const translateY = useSharedValue(0);
    const iconOpacity = useSharedValue(1);

    // Press scale with bounce
    const pressScale = useSharedValue(1);

    useEffect(() => {
        if (isFocused) {
            // Bounce animation: scale to 1.15 quickly, then spring to 1.1 for bounce effect
            scale.value = withSequence(
                withTiming(1.15, { duration: 100 }),
                withSpring(1.1, { damping: 10, stiffness: 150 })
            );

            translateY.value = withSpring(-2, { damping: 15, stiffness: 150 });
            iconOpacity.value = withTiming(1, { duration: 200 });
        } else {
            // Scale back to 1 without bounce
            scale.value = withSpring(1, { damping: 15, stiffness: 150 });
            translateY.value = withSpring(0, { damping: 15, stiffness: 150 });
            iconOpacity.value = withTiming(0.6, { duration: 200 });
        }
    }, [isFocused]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { scale: scale.value * pressScale.value },
            { translateY: translateY.value },
        ],
    }));

    const iconAnimatedStyle = useAnimatedStyle(() => ({
        opacity: iconOpacity.value,
        transform: [
            {
                scale: interpolate(scale.value, [1, 1.1], [1, 1.2]),
            },
        ],
    }));

    const textAnimatedStyle = useAnimatedStyle(() => ({
        opacity: interpolate(scale.value, [1, 1.1], [0.7, 1]),
    }));

    // Press handlers with bounce scale effect
    const handlePressIn = () => {
        pressScale.value = withSequence(
            withTiming(1.25, { duration: 100 }),
            withSpring(1, { damping: 8, stiffness: 200 })
        );
    };

    return (
        <Pressable
            {...props}
            onLongPress={(e) => {
                handlePressIn();
                if (onLongPress) onLongPress(e);
            }}
            onPress={(e) => {
                handlePressIn();
                if (onPress) onPress(e);
            }}
        >
            <Animated.View style={[animatedStyle, globalStyles.verticalAlignment]}>
                <Animated.View style={iconAnimatedStyle}>
                    <Ionicons name={icon} size={24} color={isFocused ? colors.text : colors.textDisabled} />
                </Animated.View>
                <Animated.Text
                    style={[
                        textAnimatedStyle,
                        {
                            color: isFocused ? colors.text : colors.textDisabled,
                            fontWeight: isFocused ? "600" : "400",
                            marginTop: 2,
                            fontSize: 12,
                        },
                    ]}
                >
                    {label}
                </Animated.Text>
            </Animated.View>
        </Pressable>
    );
};

export default CustomTabTrigger;
