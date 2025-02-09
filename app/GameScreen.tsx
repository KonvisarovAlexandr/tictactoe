import NavBar from "@/components/NavBar";
import ScoreView from "@/components/ScoreView";
import { increaseLoseStreak, increaseWinStreak } from "@/redux/appSettings";
import { Player } from "@/types/Player";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  Dimensions,
  Animated,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";

const width = (Dimensions.get("screen").width - 16) / 3;

export default function GameScreen() {
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useLocalSearchParams();
  const { enemy } = params;
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const insets = useSafeAreaInsets();
  const [playerOne, setPlayerOne] = useState<Player>({
    name: "Hose",
    exp: 0,
    score: 0,
    key: "X",
  });
  const [playerTwo, setPlayerTwo] = useState<Player>({
    name: enemy === "bot" ? "AI bot" : "Dave",
    exp: 0,
    score: 0,
    key: "O",
  });

  const calculateWinner = (squares: any) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const addScore = (winner: "X" | "O") => {
    if (winner === "X") {
      setPlayerOne({
        ...playerOne,
        score: playerOne.score + 1,
        exp: playerOne.exp + 100,
      });
      Alert.alert(`${playerOne.name} won`);
    } else {
      setPlayerTwo({
        ...playerTwo,
        score: playerTwo.score + 1,
        exp: playerTwo.exp + 100,
      });
      Alert.alert(`${playerTwo.name} won`);
    }
  };

  const makeBotMove = () => {
    const emptyCells = board
      .map((cell, index) => (cell === null ? index : null))
      .filter((cell) => cell !== null);

    if (emptyCells.length > 0) {
      const randomIndex =
        emptyCells[Math.floor(Math.random() * emptyCells.length)];
      handlePress(randomIndex);
    }
  };

  useEffect(() => {
    console.log(enemy === "bot" && !isXNext);
    if (enemy === "bot" && !isXNext) {
      setTimeout(() => {
        makeBotMove();
      }, 500);
    }
  }, [enemy, isXNext]);

  const handlePress = (index: any) => {
    if (board[index] || calculateWinner(board)) {
      return;
    }

    const newBoard = board.slice();
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const winner = calculateWinner(newBoard);
    if (winner) {
      addScore(winner);
      if (enemy === "bot") {
        dispatch(winner === "X" ? increaseWinStreak() : increaseLoseStreak());
      }
      resetGame();
      return;
    } else if (!newBoard.includes(null)) {
      Alert.alert(`It's a draw`);
      resetGame();
      return;
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const renderSquare = (index: any) => {
    return (
      <TouchableOpacity
        style={styles.square}
        onPress={() => {
          if (enemy === "bot" && !isXNext) {
            return;
          }
          handlePress(index);
        }}
      >
        {board[index] === "X" && (
          <Image source={require("@/assets/images/x.png")} />
        )}
        {board[index] === "O" && (
          <Image source={require("@/assets/images/o.png")} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <Animated.View style={styles.container}>
      <NavBar
        title="Tic tac toe"
        onBackPress={() => {
          router.back();
        }}
        containerStyle={{ paddingTop: insets.top }}
      />
      <ScoreView playerOne={playerOne} playerTwo={playerTwo} />
      <Animated.View style={styles.innerView}>
        <Animated.View style={styles.board}>
          <Animated.View style={styles.row}>
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </Animated.View>
          <Animated.View style={styles.row}>
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </Animated.View>
          <Animated.View style={styles.row}>
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </Animated.View>
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerView: {
    alignItems: "center",
    justifyContent: "center",
  },
  board: {
    marginBottom: 20,
    backgroundColor: "#F5FCFF",
  },
  row: {
    flexDirection: "row",
  },
  square: {
    width: width,
    height: width,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
  },
  resetButton: {
    padding: 10,
    backgroundColor: "#3A7DE9",
    borderRadius: 5,
  },
  resetButtonText: {
    color: "#FFF",
    fontSize: 16,
  },
});
