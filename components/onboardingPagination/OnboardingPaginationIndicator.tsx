import React from "react";
import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, {
  AnimatedProps,
  FadeInDown,
  FadeInLeft,
  FadeOutLeft,
  FadeOutUp,
  interpolateColor,
  LinearTransition,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from "react-native-reanimated";

const _spacing = 8;
const _buttonHeight = 40;
const _dotContainer = 24;
const _dotSize = _dotContainer / 3;
const _layoutTransition = LinearTransition.springify()
  .damping(80)
  .stiffness(200);

const _activeDot = "#fff";
const _inactiveDot = "#aaa";

interface OnboardingPaginationIndicatorProps {
  total: number;
  selectedIndex: number;
  onIndexChange: (index: number) => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Button = ({
  children,
  style,
  ...restProps
}: AnimatedProps<PressableProps>) => (
  <AnimatedPressable
    style={[
      {
        height: _buttonHeight,
        borderRadius: _buttonHeight / 2,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: _spacing * 2,
      },
      style,
    ]}
    entering={FadeInLeft.springify().damping(80).stiffness(200)}
    exiting={FadeOutLeft.springify().damping(80).stiffness(200)}
    layout={_layoutTransition}
    {...restProps}
  >
    {children}
  </AnimatedPressable>
);

const Dot = ({
  index,
  animation,
}: {
  index: number;
  animation: SharedValue<number>;
}) => {
  const dotStyles = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      animation.value,
      [index - 1, index, index + 1],
      [_inactiveDot, _activeDot, _activeDot]
    ),
  }));

  return (
    <View
      style={{
        width: _dotContainer,
        height: _dotContainer,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Animated.View
        style={[
          {
            width: _dotSize,
            height: _dotSize,
            borderRadius: _dotSize,
          },
          dotStyles,
        ]}
      />
    </View>
  );
};

const PaginationIndicator = ({
  animation,
}: {
  animation: SharedValue<number>;
}) => {
  const indicatorStyles = useAnimatedStyle(() => ({
    width: _dotContainer + _dotContainer * animation.value,
  }));

  return (
    <Animated.View
      style={[
        {
          backgroundColor: "green",
          position: "absolute",
          height: _dotContainer,
          borderRadius: _dotContainer / 2,
          left: 0,
          top: 0,
        },
        indicatorStyles,
      ]}
    />
  );
};

const Pagination = ({
  selectedIndex,
  total,
}: {
  selectedIndex: number;
  total: number;
}) => {
  const animation = useDerivedValue(() => {
    return withSpring(selectedIndex, {
      stiffness: 200,
      damping: 80,
    });
  });

  return (
    <View
      style={{
        justifyContent: "center",
        alignSelf: "center",
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <PaginationIndicator animation={animation} />
        {[...Array(total).keys()].map((i) => (
          <Dot key={`dot-${i}`} index={i} animation={animation} />
        ))}
      </View>
    </View>
  );
};

export default function OnboardingPaginationIndicator({
  total,
  selectedIndex,
  onIndexChange,
}: OnboardingPaginationIndicatorProps) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-start",
        padding: _spacing,
        gap: _spacing,
      }}
    >
      <Pagination total={total} selectedIndex={selectedIndex} />
      <View
        style={{
          flexDirection: "row",
          gap: _spacing,
          alignItems: "flex-start",
        }}
      >
        {selectedIndex > 0 ? (
          <Button
            style={{ backgroundColor: "#ddd" }}
            onPress={() => {
              if (selectedIndex === 0) return;
              onIndexChange(selectedIndex - 1);
            }}
          >
            <Text>Back</Text>
          </Button>
        ) : null}
        <Button
          style={{ backgroundColor: "blue", flex: 1 }}
          onPress={() => {
            if (total - 1 === selectedIndex) {
              return;
            }

            onIndexChange(selectedIndex + 1);
          }}
        >
          {selectedIndex === total - 1 ? (
            <Animated.Text
              key={"finish"}
              entering={FadeInDown.springify().damping(80).stiffness(200)}
              exiting={FadeOutUp.springify().damping(80).stiffness(200)}
              style={{ color: "#fff" }}
            >
              Finish
            </Animated.Text>
          ) : (
            <Animated.Text
              key={"continue"}
              entering={FadeInDown.springify().damping(80).stiffness(200)}
              exiting={FadeOutUp.springify().damping(80).stiffness(200)}
              style={{ color: "#fff" }}
              layout={_layoutTransition}
            >
              Continue
            </Animated.Text>
          )}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
