import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import React from "react";
import { StyleSheet, Text, TextProps } from "react-native";

interface GradientTextProps extends TextProps {
  colors?: [string, string, ...string[]];
  showTextGradient?: boolean;
  children: React.ReactNode;
}

const GradientText: React.FC<GradientTextProps> = ({
  colors = ["#4c669f", "#3b5998", "#192f6a"],
  showTextGradient = false,
  style,
  children,
  ...props
}) => {
  if (!showTextGradient) {
    return <Text style={style} {...props}>{children}</Text>;
  }

  const textStyle = StyleSheet.flatten(style);

  return (
    <MaskedView
      style={{ height: textStyle?.fontSize || 16 }}
      maskElement={
        <Text
          style={[textStyle, { color: 'white', backgroundColor: 'transparent' }]}
          {...props}
        >
          {children}
        </Text>
      }
    >
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ flex: 1 }}
      />
    </MaskedView>
  );
};

export default GradientText;