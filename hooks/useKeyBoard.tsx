// hooks/useKeyboard.ts
import { useEffect, useState } from "react";
import { Keyboard, KeyboardEvent, Platform } from "react-native";

export const useKeyboard = () => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const onKeyboardDidShow = (e: KeyboardEvent) => {
      setKeyboardVisible(true);
      setKeyboardHeight(e.endCoordinates.height);
    };

    const onKeyboardDidHide = () => {
      setKeyboardVisible(false);
      setKeyboardHeight(0);
    };

    const showSub = Platform.OS === 'ios'
    ? Keyboard.addListener("keyboardWillShow", onKeyboardDidShow)
    : Keyboard.addListener("keyboardDidShow", onKeyboardDidShow);

  const hideSub = Platform.OS === 'ios'
    ? Keyboard.addListener("keyboardWillHide", onKeyboardDidHide)
    : Keyboard.addListener("keyboardDidHide", onKeyboardDidHide);

  return () => {
    showSub.remove();
    hideSub.remove();
  };
  }, []);

  return { keyboardVisible, keyboardHeight };
};
