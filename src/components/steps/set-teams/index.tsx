import { View } from "react-native";
import Touchable from "../../touchable";
import { Ionicons } from "@expo/vector-icons";
import Animated, { SharedValue, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useDerivedValue, useSharedValue } from "react-native-reanimated";
import useDimensions from "../../../hooks/useDimensions";

interface Props {
    onNext: () => void;
    onPrev: () => void;
}

export default function SetTeams({ onNext, onPrev }: Props) {
    const y = useSharedValue(0);
    
    // numbers from 0 to 100
    const numbers = Array.from({ length: 102 }, (_, i) => i);

    const onScroll = useAnimatedScrollHandler((event) => {
        y.value = event.contentOffset.y;
    });


    return (
        <View className="flex-1 p-8">
            <View className="flex-row items-center justify-between">
                <Touchable
                    className="flex-row items-center"
                    onPress={onNext}
                >
                    <Ionicons name="arrow-back" size={24} color="#056CC1" />
                    <Animated.Text className="text-left text-2xl px-2 font-Rakkas text-primary">
                        يلا
                    </Animated.Text>
                </Touchable>


                <Touchable
                    className="flex-row items-center"
                    onPress={onPrev}
                >
                    <Animated.Text className="text-left text-2xl px-2 font-Rakkas text-primary">
                        دقيقة إرجع
                    </Animated.Text>
                    <Ionicons name="arrow-forward" size={24} color="#056CC1" />
                </Touchable>
            </View>
            <View className="flex flex-1 justify-center">
                <View style={{ height: 48 * 3 }}>
                    <Animated.ScrollView
                        snapToInterval={48}
                        contentContainerStyle={{ paddingTop: 48 }}
                        onScroll={onScroll}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                    >
                        {numbers.map((number, index) => (
                            <Number
                                key={index}
                                number={number}
                                y={y}
                            />
                        ))}
                    </Animated.ScrollView>
                    <View style={{ top: 48 - 4 }} className=" absolute h-[1px] bg-gray-400 w-full" />
                    <View style={{ top: (48 * 2) - 4 }} className=" absolute h-[1px] bg-gray-400 w-full" />
                </View>
            </View>
        </View>
    )
}


interface NumberProps {
    number: number;
    y: SharedValue<number>;
}
const Number = ({ number, y }: NumberProps) => {

    const animatedStyle = useAnimatedStyle(() => {
        return ({
            opacity: interpolate(y.value, [(number - 1) * 48, number * 48, (number + 1) * 48], [0.5, 1, 0.5], 'extend'),
            transform: [{ scale: interpolate(y.value, [(number - 1) * 48, number * 48, (number + 1) * 48], [0.5, 1, 0.5], 'extend') }]
        })
    }, [])

    return (
        <Animated.View
            style={animatedStyle}
            className="flex-row items-center h-12 justify-center"
        >
            <Animated.Text className="text-2xl font-Rakkas text-primary">
                {number}
            </Animated.Text>
        </Animated.View>
    )
}