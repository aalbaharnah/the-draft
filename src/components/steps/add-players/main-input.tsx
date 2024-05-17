import { interpolate } from "@shopify/react-native-skia";
import { TextInput } from "react-native";
import Animated, { Easing, interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

interface Props {
    value: string;
    onChangeText: (value: string) => void;
    onSubmitEditing: () => void;
}

export default function MainInput(props: Props) {
    const active = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => ({
        borderColor: interpolateColor(active.value, [0, 1], ["#FFF", "#000"]),
        borderRadius: interpolate(active.value, [0, 1], [8, 14]),
    }), [])

    const onFocus = () => {
        active.value = withTiming(1, {
            duration: 400,
            easing: Easing.inOut(Easing.ease)
        })
    }

    const onBlur = () => {
        active.value = withTiming(0, {
            duration: 400,
            easing: Easing.inOut(Easing.ease)
        })
    }


    return (
        <AnimatedTextInput
            placeholder="اسم اللاعب"
            value={props.value}
            style={animatedStyle}
            onFocus={onFocus}
            onBlur={onBlur}
            onChangeText={props.onChangeText}
            className="bg-white border-2 h-12 px-2 text-lg leading-10 text-left font-Rawasi-regular"
            onSubmitEditing={props.onSubmitEditing}
        />
    )
}