import React from "react";
import {
  Animated,
  Image,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

type ComponentProps = {
  title?: string;
  onBackPress?: () => void;
  isTitleGoesLeft?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  rightComponent?: React.JSX.Element;
  leftComponent?: React.JSX.Element;
};

export default function NavBar(props: ComponentProps) {
  const {
    title = "",
    isTitleGoesLeft = false,
    onBackPress,
    containerStyle,
    rightComponent,
    leftComponent,
    textStyle,
  } = props;

  return (
    <View style={[styles.container, containerStyle]}>
      {!isTitleGoesLeft && (
        <View style={styles.leftComponentContainer}>
          {onBackPress && (
            <TouchableOpacity
              style={styles.row}
              onPress={() => onBackPress()}
              hitSlop={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
              <Image source={require("@/assets/images/back.png")} />
            </TouchableOpacity>
          )}
          {leftComponent}
        </View>
      )}
      <Animated.Text numberOfLines={1} style={[styles.title, textStyle]}>
        {title}
      </Animated.Text>
      <View style={styles.rightComponentContainer}>{rightComponent}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    marginBottom: 24,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
  },
  leftComponentContainer: {
    flex: 1,
    flexDirection: "row",
  },
  rightComponentContainer: {
    flex: 1,
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontFamily: "SFProText-Semibold",
    fontSize: 19,
    fontWeight: "600",
    textAlign: "center",
    color: "#000057",
  },
  leftActionIcon: {
    marginRight: 5,
  },
});
