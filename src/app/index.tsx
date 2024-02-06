import { Platform, View } from "react-native";
import AddPlayersStep from "../components/steps/add-players";
import Constants from "expo-constants";
import Animated, { Easing, scrollTo, useAnimatedRef, useDerivedValue, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import useDimensions from "../hooks/useDimensions";
import Touchable from "../components/touchable";
import SetTeams from "../components/steps/set-teams";

export default function Index() {
    const { width, height } = useDimensions('screen')
    const scrollX = useSharedValue(width * 2);
    const ref = useAnimatedRef<Animated.ScrollView>();

    const onNext = (step: number) => {
        scrollX.value = withTiming(step * width, {
            duration: 800,
            easing: Easing.bezier(0.5, 0.01, 0, 1),
        });
    }

    useDerivedValue(() => {
        scrollTo(ref, scrollX.value, 0, Platform.OS === 'android');
    }, [scrollX]);

    const style = { height: height - Constants.statusBarHeight, width }

    return (
        <View className="flex-1 bg-background" style={{ paddingTop: Constants.statusBarHeight }}>
            <Animated.ScrollView
                ref={ref}
                horizontal
                pagingEnabled
                keyboardDismissMode="on-drag"
                keyboardShouldPersistTaps="always"
                contentOffset={{ x: width * 2, y: 0 }}
                scrollEnabled={false}
            >
                <View style={style}>
                    <Touchable className="h-12 w-12 items-center justify-center" onPress={() => onNext(1)}>
                        <Animated.Text>prev</Animated.Text>
                    </Touchable>
                </View>

                <View style={style}>
                    <SetTeams
                        onNext={() => onNext(0)}
                        onPrev={() => onNext(2)}
                    />
                </View>

                <View style={style}>
                    <AddPlayersStep onNext={() => onNext(1)} />
                </View>

            </Animated.ScrollView>
        </View>
    )
}