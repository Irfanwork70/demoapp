import { CustomButtonProps } from "@/interfaces/customButton.interface";
import { useSharedComponentStyles } from "@/styles/sharedComponentsStyles";
import React from "react";
import { ActivityIndicator, Pressable, Text } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

const CustomButton: React.FC<CustomButtonProps> = ({
    title,
    variant = 'contained',
    loading = false,
    styles,
    disabled,
    textColor,
    children,
    ...props
}) => {
    const sharedStyles = useSharedComponentStyles();
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const variantStyles: any = variant === 'contained'
        ? sharedStyles.buttonContained
        : variant === "outlined"
            ? sharedStyles.buttonOutlined
            : sharedStyles.buttonDisabled;

    const textStyles: any = textColor ? { color: textColor } : variant === 'contained'
        ? sharedStyles.buttonText
        : variant === "outlined"
            ? sharedStyles.buttonTextOutlined
            : sharedStyles.buttonTextDisabled;

    return (
        <Pressable
            {...props}
            disabled={disabled || loading}
            onPressIn={() => { scale.value = withSpring(0.97); }}
            onPressOut={() => { scale.value = withSpring(1); }}
        >
            <Animated.View style={[sharedStyles.buttonBase, variantStyles, styles, animatedStyle]}>
                {loading ? (
                    <ActivityIndicator color={variant === "contained" ? "#fff" : sharedStyles.buttonTextOutlined.color} />
                ) : children ? (
                    children
                ) : (
                    <Text style={[sharedStyles.buttonTextBase, textStyles]}>{title}</Text>
                )}
            </Animated.View>
        </Pressable>
    );
};

export default CustomButton;