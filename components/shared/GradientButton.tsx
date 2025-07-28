import { useTheme } from "@/context/ThemeContext";
import { useSharedComponentStyles } from "@/styles/sharedComponentsStyles";
import { LinearGradient } from 'expo-linear-gradient';
import React from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

export interface GradientButtonProps {
  title: string;
  loading?: boolean;
  styles?: any;
  disabled?: boolean;
  children?: React.ReactNode;
  gradientColors?: [string, string, ...string[]],
  textColor?: string;
  onPress?: () => void;
}

const GradientButton: React.FC<GradientButtonProps> = ({
  title,
  loading = false,
  styles,
  disabled,
  children,
  gradientColors,
  textColor,
  onPress,
  ...props
}) => {
  const sharedStyles = useSharedComponentStyles();
  const { colors } = useTheme();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const themeGradientColors = gradientColors || ["#4c669f", "#3b5998", "#192f6a"];
  const buttonStyle = { color: textColor || colors.text };
  return (
    <Pressable
      {...props}
      disabled={disabled || loading}
      onPressIn={() => { scale.value = withSpring(0.97); }}
      onPressOut={() => { scale.value = withSpring(1); }}
      onPress={onPress}
    >
      <Animated.View style={[sharedStyles.buttonBase, styles, animatedStyle]}>
        <LinearGradient
          colors={themeGradientColors as [string, string, ...string[]]}
          style={[StyleSheet.absoluteFill, sharedStyles.gradientButtonBackground]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : children ? (
          children
        ) : (
          <Text style={[sharedStyles.buttonTextBase, sharedStyles.buttonText, buttonStyle]}>{title}</Text>
        )}
      </Animated.View>
    </Pressable >
  );
};

export default GradientButton;