import React from "react";
import { Animated, Image, StyleSheet, TouchableOpacity } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { useRouter } from "expo-router";
import { useAppSelector } from "@/hooks/reduxHooks";

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default function mainScreen() {
  const winStreak = useAppSelector((state) => state.appSettings.winStreak);
  const router = useRouter();
  return (
    <ParallaxScrollView
      headerImage={
        <>
          <Image
            source={require("@/assets/images/mainIcon.png")}
            style={styles.reactLogo}
          />
          <Animated.Text
            style={{
              position: "absolute",
              bottom: 0,
              left: 32,
              fontWeight: "600",
            }}
          >
            <Animated.Text style={{ color: "#FD7E34" }}>Not a </Animated.Text>
            <Animated.Text style={{ color: "#3A7DE9" }}>
              tic tac toe
            </Animated.Text>
          </Animated.Text>
        </>
      }
    >
      <Animated.View style={styles.buttons}>
        <AnimatedTouchable
          style={styles.button}
          onPress={() => {
            router.navigate({
              pathname: "/GameScreen",
              params: { enemy: "player" },
            });
          }}
        >
          <Animated.Text style={styles.text}>Start new game</Animated.Text>
        </AnimatedTouchable>
        <AnimatedTouchable
          style={styles.button}
          onPress={() => {
            router.navigate({
              pathname: "/GameScreen",
              params: { enemy: "bot" },
            });
          }}
        >
          <Animated.Text style={styles.text}>Play with bot</Animated.Text>
        </AnimatedTouchable>
        <AnimatedTouchable
          style={styles.button}
          onPress={() => {
            router.navigate("/LeaderBoard");
          }}
        >
          <Animated.Text style={styles.text}>Leader board</Animated.Text>
        </AnimatedTouchable>
      </Animated.View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  buttons: {
    gap: 16,
    paddingTop: 48,
  },
  button: {
    alignItems: "center",
    alignContent: "center",
    borderRadius: 10,
    backgroundColor: "#3A7DE9",
  },
  text: {
    paddingVertical: 22,
    color: "#FFFFFF",
  },
});
