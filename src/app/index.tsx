import { View } from "react-native";
import AddPlayersStep from "../components/steps/add-players";
import { useRef } from "react";
import Animated from "react-native-reanimated";
import useDimensions from "../hooks/useDimensions";

export default function Index() {
    const { width } = useDimensions('screen')
    const ref = useRef<Animated.ScrollView>(null);

    const onNext = () => {
        ref.current?.scrollTo({ x: width, animated: true })
    }

    return (
        <View className="flex-1 bg-background">
            <Animated.ScrollView
                ref={ref}
                horizontal
                pagingEnabled
                keyboardDismissMode={'none'}
            >

                <View className=" h-screen w-screen">
                    <AddPlayersStep onNext={onNext} />
                </View>

                <View className=" h-screen w-screen bg-rose-600">
                </View>

                <View className=" h-screen w-screen bg-slate-500">
                </View>

            </Animated.ScrollView>
        </View>
    )
}