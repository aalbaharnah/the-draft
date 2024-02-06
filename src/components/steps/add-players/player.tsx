import { Text, TextInput } from "react-native";
import Animated, { Easing, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import Touchable from "../../touchable";

interface Props {
    onChangeText: (value: string) => void;
    onRemove: () => void;
    name: string;
}

export default function Player(props: Props) {

    const height = useSharedValue(48);

    const onPress = () => {
        height.value = withTiming(0, {
            duration: 400,
            easing: Easing.inOut(Easing.ease),
        }, () =>{
            runOnJS(props.onRemove)();
        })
    }

    const animatedStyle = useAnimatedStyle(() => ({
        height: height.value,
        opacity: interpolate(height.value, [48, 24], [1, 0]),
    }), [])


    return (
        <Animated.View
            style={[animatedStyle, {
                flexDirection: 'row',
                alignItems: 'center',

                marginHorizontal: 16,
            }]}
        >
            <Animated.View className="flex-1 mr-3">
                <TextInput
                    placeholder="اسم اللاعب"
                    value={props.name}
                    onChangeText={props.onChangeText}
                    className="h-8 px-2 font-Rakkas self-start text-left text-lg"
                />
            </Animated.View>
            <Touchable
                className="h-12 w-12 items-center justify-center"
                onPress={onPress}
            >
                <Text>🗑️</Text>
            </Touchable>
        </Animated.View>
    )
}