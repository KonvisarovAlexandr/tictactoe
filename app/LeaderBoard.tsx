import React, { useEffect, useState } from "react";
import { Animated, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useAppSelector } from "@/hooks/reduxHooks";
import NavBar from "@/components/NavBar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function LeaderBoard() {
  const { winStreak, loseStreak } = useAppSelector(
    (state) => state.appSettings
  );
  const router = useRouter();

  const [data, setData] = useState(null);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.example.com/data");
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Animated.View style={styles.container}>
      <NavBar
        title="Leader Board"
        onBackPress={() => {
          router.back();
        }}
        containerStyle={{ paddingTop: insets.top }}
      />
      <Animated.View style={styles.streakView}>
        <Animated.View style={styles.streakRow}>
          {winStreak !== 0 && (
            <Image
              source={require("@/assets/images/flame.png")}
              style={{ tintColor: "#FD7E34" }}
            />
          )}
          <Animated.Text style={styles.streakText}>
            {winStreak} win streak
          </Animated.Text>
        </Animated.View>
        <Animated.View style={styles.streakRow}>
          <Animated.Text style={styles.streakText}>
            {loseStreak} lose streak
          </Animated.Text>
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  streakView: {
    paddingHorizontal: 16,
    gap: 20,
    marginTop: 40,
  },
  streakRow: {
    backgroundColor: "#3A7DE9",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 10,
    flexDirection: "row",
  },
  streakText: {
    fontSize: 16,
    paddingVertical: 16,
    alignSelf: "center",
  },
});
