import { ScrollView, Text, View, StyleSheet, TextInput, KeyboardAvoidingView, SafeAreaView } from "react-native";
import Constants from "expo-constants";
import MainCard from "../components/main-card";
import Animated, { FadeIn, FadeInDown, Easing, useSharedValue, withTiming, withDelay, withSpring, LinearTransition, FadeOut, ZoomOutDown, useAnimatedRef, useAnimatedScrollHandler, useAnimatedStyle, interpolate } from "react-native-reanimated";
import { useCallback, useMemo, useState } from "react";
import Touchable from "../components/touchable";
import { Ionicons } from '@expo/vector-icons';
import AddButon from "../components/add-button";
import useDimensions from "../hooks/useDimensions";


export default function Index() {
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
        if (!name || name.trim().length === 0) return;
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
        }
    }, [])

    const animatedText = useAnimatedStyle(() => {
        return ({
            fontSize: interpolate(y.value, [0, 10, 40], [48, 32, 28], 'clamp'),
        })
    }, [])

    const animatedSubText = useAnimatedStyle(() => {
        return {
            opacity: interpolate(y.value, [0, 40], [1, 0], 'clamp'),
            fontSize: interpolate(y.value, [0, 10, 40], [24, 18, 16], 'clamp'),
        }
    }, [])

    return (
        <KeyboardAvoidingView style={{ height }} className="bg-background" behavior="padding">
            <Animated.View className="px-4 overflow-hidden bg-background" style={[animatedContainer, {
                paddingTop: Constants.statusBarHeight,
                borderBottomWidth: 1,
                borderColor: '#b3b3b3'
            }]}>
                <Animated.Text
                    style={animatedText}
                    entering={FadeInDown.duration(200).delay(400)}
                    className="text-right font-Rakkas my-4"
                >
                    القرعة
                </Animated.Text>
                <Animated.Text style={animatedSubText} className="text-right font-Lateef-Regular text-2xl">
                    اضف اللاعبين الذين ستتم القرعة عليهم
                </Animated.Text>
            </Animated.View>
            <View className="flex-1" />

            <Animated.FlatList
                ref={list}
                data={data}
                onScroll={onScroll}
                alwaysBounceVertical={false}
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

                style={{ flexGrow: 0 }}
                renderItem={({ item, index }) => (
                    <Animated.View exiting={ZoomOutDown} className="items-center flex-row mx-4">
                        <Text>{index + 1}:</Text>
                        <Animated.View className="flex-1 mr-3">
                            <TextInput
                                placeholder="اسم اللاعب"
                                value={item.name}
                                onChangeText={
                                    (value) => {
                                        const newPlayers = [...players];
                                        newPlayers[index].name = value;
                                        setPlayers(newPlayers);
                                    }
                                }
                                className="h-12 px-2"
                            />
                        </Animated.View>
                        <Touchable
                            className="h-12 w-12 items-center justify-center"
                            onPress={() => removePlayer(item.id)}
                        >
                            <Text>🗑️</Text>
                        </Touchable>
                    </Animated.View>
                )}
            />

            <SafeAreaView className="items-center flex-row mx-4 mb-4">
                <Animated.View className="flex-1 mr-3">
                    <TextInput
                        placeholder="اسم اللاعب"
                        value={name}
                        onChangeText={setName}
                        className="bg-white rounded-lg  h-12 px-2"
                        onSubmitEditing={addPlayer}
                    />
                </Animated.View>
                <AddButon onPress={addPlayer} />
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}