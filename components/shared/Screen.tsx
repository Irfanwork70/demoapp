import { useGlobalStyles } from "@/styles/globalStyles";
import { useSharedComponentStyles } from "@/styles/sharedComponentsStyles";
import React, { ReactNode } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ScrollViewProps,
  View,
  ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ScreenProps extends ScrollViewProps {
  children: ReactNode;
  style?: ViewStyle;
  withScrollView?: boolean;
  withSafeArea?: boolean;
  withKeyboardAvoiding?: boolean;
  tabScreen?: boolean;
}

export function Screen({
  children,
  style,
  withScrollView = true,
  withSafeArea = true,
  withKeyboardAvoiding = true,
  tabScreen = false,
  ...scrollViewProps
}: ScreenProps) {
  const sharedComponentsStyes = useSharedComponentStyles();
  const globalStyles = useGlobalStyles();
  const contentContainerStyle = tabScreen
    ? withSafeArea
      ? sharedComponentsStyes.scrollViewSafeAreaContent
      : sharedComponentsStyes.scrollViewContent
    : globalStyles.mb30px;

  const content = withScrollView ? (
    <ScrollView
      style={[sharedComponentsStyes.scrollView, style]}
      bounces={false}
      contentContainerStyle={contentContainerStyle}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      {...scrollViewProps}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[sharedComponentsStyes.screenContainer, style]}>
      {children}
    </View>
  );

  const Container = withSafeArea ? SafeAreaView : View;

  const wrappedContent = withKeyboardAvoiding ? (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={0}
    >
      {content}
    </KeyboardAvoidingView>
  ) : (
    content
  );

  return (
    <Container style={sharedComponentsStyes.screenContainer}>
      {wrappedContent}
    </Container>
  );
}
