import { View } from "react-native";
import Touchable from "../../touchable";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from 'expo-haptics';
import Animated, { SharedValue, interpolate, runOnUI, useAnimatedReaction, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withDecay, withTiming } from "react-native-reanimated";
import { useStore } from "../../../context/provider";

interface Props {
    onNext: () => void;
    onPrev: () => void;
}

export default function SetTeams({ onNext, onPrev }: Props) {
    const { dispatch } = useStore();
    const y = useSharedValue(0);
    // numbers from 2 to 100
    const numbers = Array.from({ length: 100 }, (_, i) => i + 2);

    const onScroll = useAnimatedScrollHandler((event) => {
        y.value = event.contentOffset.y;
    });

    const onMomentumScrollEnd = (event: any) => {
        const index = Math.round(event.nativeEvent.contentOffset.y / 48);
        dispatch({ type: "SET_TEAMS", payload: index + 2 })
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

    }

    return (
        <View className="flex-1 p-8">
            <View className="flex-row items-center justify-between">
                <Touchable
                    className="flex-row items-center"
                    onPress={onNext}
                >
                    <Ionicons name="arrow-back" size={18} color="#056CC1" />
                    <Animated.Text className="text-left text-2xl px-2 font-Rakkas text-primary">
                        تمام
                    </Animated.Text>
                </Touchable>


                <Touchable
                    className="flex-row items-center"
                    onPress={onPrev}
                >
                    <Animated.Text className="text-left text-2xl px-2 font-Rakkas text-primary">
                        دقيقة إرجع
                    </Animated.Text>
                    <Ionicons name="arrow-forward" size={18} color="#056CC1" />
                </Touchable>
            </View>
            <View className="py-10">
                <Animated.Text className="text-right font-Rakkas text-2xl">
                    حدد كم فريق تحتاج
                </Animated.Text>
            </View>
            <View className="flex flex-1 justify-center">
                <View style={{ height: 48 * 4 }}>
                    <Animated.ScrollView
                        snapToInterval={48}
                        contentContainerStyle={{ paddingVertical: 48 }}
                        onScroll={onScroll}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        decelerationRate="fast"
                        onMomentumScrollEnd={onMomentumScrollEnd}
                        scrollEventThrottle={8}
                    >
                        {numbers.map((number, index) => (
                            <Number
                                key={index}
                                index={index}
                                number={number}
                                y={y}
                                last={index === numbers.length - 1}
                            />
                        ))}
                    </Animated.ScrollView>
                    <View style={{ top: 48 - 4 }} className=" absolute h-[1px] bg-gray-400 w-4/5 self-center" />
                    <View style={{ top: (48 * 2) - 4 }} className=" absolute h-[1px] bg-gray-400 w-4/5 self-center" />
                </View>
            </View>
        </View>
    )
}


interface NumberProps {
    number: number;
    index: number;
    y: SharedValue<number>;
    last: boolean;
}
const Number = ({ number, y, index, last }: NumberProps) => {
    const input = [(index - 1) * 48, index * 48, (index + 1) * 48];

    const animatedStyle = useAnimatedStyle(() => {
        return ({
            opacity: interpolate(y.value, input, [0.5, 1, 0.5], 'extend'),
            transform: [{ scale: interpolate(y.value, input, [0.5, 1, 0.5], 'extend') }]
        })
    }, [])


    return (
        <Animated.View
            style={animatedStyle}
            className="flex-row items-center h-12 justify-center"
        >
            {last ? null : (
                <Animated.Text className="text-2xl font-Rakkas text-primary">
                    {number}
                </Animated.Text>
            )}
        </Animated.View>
    )
}