import { View, KeyboardAvoidingView, Platform, Keyboard } from "react-native";
import Constants from "expo-constants";
import Animated, { FadeInDown, useSharedValue, withDelay, withSpring, LinearTransition, useAnimatedRef, useAnimatedScrollHandler, useAnimatedStyle, interpolate, FadeOutDown } from "react-native-reanimated";
import { useCallback, useMemo, useState } from "react";
import AddButon from "./add-button";
import useDimensions from "../../../hooks/useDimensions";
import Player from "./player";
import MainInput from "./main-input";
import Touchable from "../../touchable";
import { Ionicons } from "@expo/vector-icons";


export default function AddPlayersStep({ onNext }: { onNext: () => void }) {
    const y = useSharedValue(0);
    const list = useAnimatedRef<Animated.FlatList<any>>();
    const { height } = useDimensions("window");
    const animation = useSharedValue(0);
    animation.value = withDelay(400, withSpring(1, {
        mass: 1,
        damping: 23,
        stiffness: 100,
        overshootClamping: false,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 2,
    }));

    const [players, setPlayers] = useState<{ name: string, id: string }[]>([])
    const [name, setName] = useState("");

    const addPlayer = useCallback(() => {
        if (!name || name.trim().length === 0) {
            Keyboard.dismiss();
            return;
        }
        setPlayers([...players, { name, id: Math.random().toString() }])
        setName("");
        list.current?.scrollToEnd();
    }, [name])

    const removePlayer = useCallback((id: string) => {
        setPlayers(players.filter(player => player.id !== id))
    }, [players])

    const onScroll = useAnimatedScrollHandler((event) => {
        y.value = event.contentOffset.y;
    });

    const data = useMemo(() => {
        return players
    }, [players])

    const animatedContainer = useAnimatedStyle(() => {
        return {
            height: interpolate(y.value, [0, 40], [200, 120], 'clamp'),
            borderBottomWidth: interpolate(y.value, [0, 1], [0, 1], 'clamp'),
        }
    }, [])

    const animatedText = useAnimatedStyle(() => {
        return ({
            fontSize: interpolate(y.value, [0, 10, 40], [48, 32, 28], 'clamp'),
        })
    }, [])

    const animatedSubText = useAnimatedStyle(() => {
        return {
            opacity: interpolate(y.value, [0, 10], [1, 0], 'clamp'),
            fontSize: interpolate(y.value, [0, 10, 40], [24, 18, 16], 'clamp'),
        }
    }, [])

    return (
        <View className="flex-1 bg-background">
            <KeyboardAvoidingView contentContainerStyle={{ height: Platform.OS === 'ios' ? height : height + Constants.statusBarHeight }} behavior="position">
                <Animated.View className="px-4 overflow-hidden  bg-background absolute top-0 w-full" style={[animatedContainer, {
                    paddingTop: Constants.statusBarHeight,
                    borderColor: '#b3b3b3',
                    zIndex: 1,
                }]}>
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
                        <Animated.Text
                            style={animatedText}
                            entering={FadeInDown.duration(200).delay(400)}
                            className="text-right font-Rakkas my-4"
                        >
                            القرعة
                        </Animated.Text>
                    </View>
                    <Animated.Text style={animatedSubText} className="text-right font-Rakkas text-2xl">
                        اضف اسماء اللاعبين الذين ستتم القرعة عليهم
                    </Animated.Text>
                </Animated.View>
                <View className="flex-1" />

                <Animated.FlatList
                    ref={list}
                    data={data}
                    onScroll={onScroll}
                    alwaysBounceVertical={false}
                    showsVerticalScrollIndicator={false}
                    keyboardDismissMode={'on-drag'}
                    layout={
                        LinearTransition.springify()
                            .damping(23)
                            .stiffness(100)
                            .overshootClamping(0)
                            .restDisplacementThreshold(0.01)
                            .restSpeedThreshold(2)
                    }
                    keyExtractor={item => item.id}
                    contentContainerStyle={{ paddingTop: 208 }}
                    style={{ flexGrow: 0 }}
                    renderItem={({ item, index }) => (
                        <Player
                            name={item.name}
                            onRemove={() => removePlayer(item.id)}
                            onChangeText={(value) => {
                                const newPlayers = [...players];
                                newPlayers[index].name = value;
                                setPlayers(newPlayers);
                            }}
                        />
                    )}
                />

                <Animated.View className="items-center flex-row mx-4 mb-6">
                    <Animated.View className="flex-1 mr-3">
                        <MainInput
                            value={name}
                            onChangeText={setName}
                            onSubmitEditing={addPlayer}
                        />
                    </Animated.View>
                    <AddButon onPress={addPlayer} />
                </Animated.View>
            </KeyboardAvoidingView>
        </View>
    )
}