import { Player } from "@/types/Player";
import React from "react";
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

type ComponentProps = {
  playerOne: Player;
  playerTwo: Player;
  containerStyle?: StyleProp<ViewStyle>;
};

export default function ScoreView(props: ComponentProps) {
  const { playerOne, playerTwo, containerStyle } = props;

  const PlayerView = (player: Player) => {
    return (
      <View style={styles.playerView}>
        {player.key === "X" ? (
          <Image
            source={require("@/assets/images/x.png")}
            style={styles.signImage}
          />
        ) : (
          <Image
            source={require("@/assets/images/o.png")}
            style={styles.signImage}
          />
        )}
        <Image
          source={require("@/assets/images/mainIcon.png")}
          style={styles.playerImage}
        />
        <View style={styles.textView}>
          <Text
            style={[
              styles.name,
              { color: player.key === "X" ? "#FD7E34" : "#3A7DE9" },
            ]}
          >
            {player.name}
          </Text>
          <Text style={styles.experience}>{`${player.exp} exp`}</Text>
        </View>
      </View>
    );
  };

  const Score = () => {
    return (
      <View>
        <Text>{`${playerOne.score} - ${playerTwo.score}`}</Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {PlayerView(playerOne)}
      {Score()}
      {PlayerView(playerTwo)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 42,
    marginBottom: 33,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
  },
  playerView: {
    gap: 12,
    alignItems: "center",
    alignContent: "center",
  },
  signImage: {
    width: 24,
    height: 24,
  },
  playerImage: {
    width: 48,
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
  },
  scoreView: {},
  textView: {
    gap: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    alignSelf: "center",
  },
  experience: {
    color: "gray",
    fontSize: 10,
    alignSelf: "center",
  },
});
