import React, { useState } from "react";
import { StyleSheet } from "react-native";
import OnboardingPaginationIndicator from "./OnboardingPaginationIndicator";

export default function Onboarding() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <OnboardingPaginationIndicator
      total={4}
      selectedIndex={selectedIndex}
      onIndexChange={(index) => setSelectedIndex(index)}
    />
  );
}

const styles = StyleSheet.create({});
