import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { HeaderBackButton } from "@react-navigation/elements";
import React, { useState } from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  FadeInDown,
  FadeOutUp,
  LinearTransition,
  SlideInRight,
  SlideOutLeft,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import steps from "./steps";

const { width, height } = Dimensions.get("window");
const _spacing = 12;
const _width = width - _spacing * 2;
const _height = height - _spacing * 2;

const PressableAnimated = Animated.createAnimatedComponent(Pressable);

export default function Carousel() {
  const [activeIndex, setAciveIndex] = useState(0);
  const safeArea = useSafeAreaInsets();
  const _top = safeArea.top + 24;

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          paddingTop: _top,
          paddingHorizontal: 24,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {activeIndex > 0 ? (
          <PressableAnimated
            entering={FadeInDown.springify().damping(80).stiffness(200)}
            exiting={FadeOutUp.springify().damping(80).stiffness(200)}
          >
            <HeaderBackButton
              onPress={() => setAciveIndex((preIndex) => preIndex - 1)}
              tintColor="black"
            />
          </PressableAnimated>
        ) : null}
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          {activeIndex !== steps.length - 1 ? (
            <PressableAnimated
              entering={FadeInDown.springify().damping(80).stiffness(200)}
              exiting={FadeOutUp.springify().damping(80).stiffness(200)}
              onPress={() => setAciveIndex(steps.length - 1)}
            >
              <Text>Skip</Text>
            </PressableAnimated>
          ) : null}
        </View>
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Animated.View
          key={`onboarding-step-${activeIndex}`}
          layout={LinearTransition.springify()}
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            gap: _spacing,
            padding: _spacing * 2,
          }}
        >
          <Animated.Image
            resizeMode={"contain"}
            source={steps[activeIndex].illustration}
            entering={SlideInRight.damping(80).stiffness(200).duration(450)}
            exiting={SlideOutLeft.damping(80).stiffness(200).duration(450)}
            style={{
              width: _width - _spacing * 2,
              height: _height * 0.4,
            }}
          />
          <Animated.Text
            entering={SlideInRight.damping(80).stiffness(200).duration(650)}
            exiting={SlideOutLeft.damping(80).stiffness(200).duration(650)}
            style={{ fontSize: 24, fontWeight: "bold" }}
          >
            {steps[activeIndex].title}
          </Animated.Text>
          <Animated.Text
            entering={SlideInRight.damping(80).stiffness(200).duration(750)}
            exiting={SlideOutLeft.damping(80).stiffness(200).duration(750)}
            style={{ fontSize: 14, textAlign: "center", marginTop: 10 }}
          >
            {steps[activeIndex].description}
          </Animated.Text>
        </Animated.View>
        <PressableAnimated
          style={{
            marginVertical: 36,
            paddingVertical: 12,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "lightblue",
            borderRadius: 24,
            overflow: "hidden",
            height: 48,
            minWidth: 48,
          }}
          layout={LinearTransition.springify()}
          onPress={() =>
            setAciveIndex((prevIndex) =>
              prevIndex < steps.length - 1 ? prevIndex + 1 : 0
            )
          }
        >
          {activeIndex === steps.length - 1 ? (
            <Animated.Text
              key={"finish"}
              entering={FadeInDown.springify().damping(80).stiffness(200)}
              exiting={FadeOutUp.springify().damping(80).stiffness(200)}
              layout={LinearTransition.springify()}
              style={{
                paddingHorizontal: 48,
                fontSize: 16,
                overflow: "hidden",
              }}
            >
              Finish
            </Animated.Text>
          ) : (
            <Animated.View
              key={"continue"}
              layout={LinearTransition.springify()}
            >
              <MaterialIcons
                name="chevron-right"
                size={24}
                style={{ alignSelf: "center" }}
              />
            </Animated.View>
          )}
        </PressableAnimated>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
