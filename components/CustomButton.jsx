import { Text, TouchableOpacity } from "react-native";
import React from "react";

export const CustomButton = ({
  title,
  handlePress,
  ContainerStyle,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={isLoading}
      className={`bg-secondary rounded-xl justify-center items-center min-h-[62px] ${ContainerStyle} ${
        isLoading ? "opacity-50" : ""
      }`}
    >
      <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
