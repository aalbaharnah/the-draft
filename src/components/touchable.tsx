import { Pressable, PressableProps } from 'react-native';
import Animated, {
    Easing,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function Touchable({
    onPress,
    style,
    ...props
}: PressableProps) {
    const scale = useSharedValue(1);
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    scale: scale.value,
                },
            ],
            // opacity: interpolate(scale.value, [0.95, 1], [0.78, 1]),
        };
    });
    return (
        <AnimatedPressable
            style={[animatedStyle, style]}
            onPress={onPress}
            onPressIn={() => (scale.value = withTiming(0.95, { duration: 70 }))}
            onPressOut={() =>
            (scale.value = withTiming(1, {
                duration: 200,
                easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            }))
            }
            {...props}
        />
    );
}