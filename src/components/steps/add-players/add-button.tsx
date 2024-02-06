import { StyleSheet, Pressable, PressableProps, View } from "react-native";
import Animated, { Easing, SharedValue, interpolate, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { Ionicons } from '@expo/vector-icons';
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface Props {
    onPress: () => void;
}
export default function AddButon({ onPress }: Props) {
    const scale = useSharedValue(1);
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    scale: scale.value,
                },
            ],
            borderRadius: interpolate(scale.value, [0.95, 1], [14, 8]),
        };
    });


    const onPressIn = () => {
        scale.value = withTiming(0.95, {
            duration: 120,
            easing: Easing.inOut(Easing.ease),
        })
    }

    const onPressOut = () => {
        scale.value = withTiming(1, {
            duration: 120,
            easing: Easing.inOut(Easing.ease),
        })
    }

    return (
        <AnimatedPressable
            onPress={onPress}
            className="bg-primary h-12 w-12 items-center justify-center"
            style={animatedStyle}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
        >
            <Ionicons name="add" size={24} color="white" />
        </AnimatedPressable>
    )
}