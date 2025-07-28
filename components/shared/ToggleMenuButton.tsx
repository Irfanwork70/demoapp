import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";

interface ToggleMenuButtonProps {
  onPress: () => void;
  isExpanded: boolean;
}

export const ToggleMenuButton = ({ onPress, isExpanded }: ToggleMenuButtonProps) => {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Ionicons name={isExpanded ? "close" : "menu"} size={24} color="#64748B" />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 65,
    height: 65,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 32.5,
    backgroundColor: "#fff",
  },
});