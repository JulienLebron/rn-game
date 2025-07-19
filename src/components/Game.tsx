import { boardHeight } from "@/constants";
import { SafeAreaView, View, StyleSheet, Button } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withDecay,
  withSequence,
  withRepeat,
  withDelay,
  runOnJS,
} from "react-native-reanimated";

export default function Game() {
  const x = useSharedValue(200);

  const onReturned = () => {
    "worklet";
    console.log("returned to initial position");
  };

  const moveBall = () => {
    // x.value = withTiming(x.value + 100, { duration: 5000 });
    // x.value = withSpring(x.value + 100);
    // x.value = withDecay({ velocity: 300 });

    // shake the ball
    x.value = withRepeat(
      withSequence(
        withTiming(230),
        withTiming(170),
        withTiming(200, {}, () => {
          onReturned();
          // runOnJS(onReturned)();
        })
      ),
      -1
    );
  };

  const ballStyles = useAnimatedStyle(() => {
    // running on the UI
    return {
      left: x.value,
    };
  });

  console.log("rerender");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.board}>
        {/* TODO: Add game elements */}

        <Animated.View
          style={[
            {
              width: 50,
              height: 50,
              backgroundColor: "white",
              borderRadius: 50,

              position: "absolute",
              top: boardHeight / 2,
              // left: x,
            },
            ballStyles,
          ]}
        />
      </View>

      <Button title="Move" onPress={moveBall} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#292929",
  },
  board: {
    backgroundColor: "#202020",
    height: boardHeight,
    marginVertical: "auto",
    overflow: "hidden",
  },
});
