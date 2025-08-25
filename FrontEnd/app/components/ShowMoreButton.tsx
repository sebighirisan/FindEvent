import React from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from "react-native";

type ShowMoreButtonProps = {
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  label?: string;
};

const ShowMoreButton: React.FC<ShowMoreButtonProps> = ({
  onPress,
  isLoading = false,
  disabled = false,
  label = "Show More",
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || isLoading}
      style={[
        styles.button,
        (disabled || isLoading) && styles.disabledButton,
      ]}
    >
      {isLoading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.text}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: "#1E90FF",
    alignItems: "center",
    justifyContent: "center",
  },
  disabledButton: {
    backgroundColor: "#aaa",
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ShowMoreButton;