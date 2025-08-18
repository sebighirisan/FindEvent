import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

export interface IconButtonProps {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  size: number;
  color: string;
}

export default function IconButton({
  icon,
  size,
  color,
}: IconButtonProps) {
  return (
    <View
      style={[styles.button]}
    >
      <Ionicons name={icon} size={size} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  }
});
