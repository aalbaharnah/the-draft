import { StyleSheet, Pressable, PressableProps, View } from "react-native";
import Animated, { Easing, SharedValue, interpolate, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { Ionicons } from '@expo/vector-icons';
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface Props extends PressableProps {
    backgroundColor?: string;
    title: string;
    animation: SharedValue<number>
    index: number;
}

export default function MainCard({ backgroundColor, title, index, animation, style, ...rest }: Props) {
    const scale = useSharedValue(1);
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    scale: scale.value,
                },
            ],
            borderRadius: interpolate(scale.value, [0.95, 1], [40, 30]),
        };
    });

    const animatedStyle2 = useAnimatedStyle(() => {
        return ({
            transform: [
                {
                    translateY: interpolate(animation.value, [0, 1], [-36 * index, 0]),
                },
            ],
        })
    })
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
            {...rest}
            style={[styles.card, animatedStyle, animatedStyle2, { backgroundColor: backgroundColor ?? "white" }]}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
        >
            <View className="flex-1 items-center flex-row justify-between px-4">
                <View style={{ backgroundColor: backgroundColor ? '#FFF' : '#000' }} className=" h-14 w-14 rounded-full items-center justify-center">
                    <Ionicons name="arrow-back" size={18} color={backgroundColor ?? "white"} />
                </View>
                <Animated.Text style={[styles.text, { color: backgroundColor ? '#FFF' : '#000' }]}>{title}</Animated.Text>
            </View>
        </AnimatedPressable>
    )
}

const styles = StyleSheet.create({
    card: {
        height: 100,
        width: '100%',
        flexDirection: 'row',
        marginBottom: 8,
    },
    text: {
        fontFamily: 'Lateef-Bold',
        fontSize: 34,
        textAlign: 'right'
    }
})