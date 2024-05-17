import { View } from "react-native";
import { useStore } from "../../../context/provider"
import Touchable from "../../touchable";
import Animated, { interpolate, Easing, useAnimatedStyle, useSharedValue, withDelay, withTiming, withSpring, ReduceMotion } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useLayoutEffect, useState } from "react";
import { generateRandomColor } from "../../../lib/utils";
import useDimensions from "../../../hooks/useDimensions";

interface Props {
    onPrev: () => void;
    end: boolean

}
export default function TeamsResult({ onPrev, end }: Props) {
    const { state } = useStore();
    const rotate = useSharedValue(0);
    const { width } = useDimensions('screen');
    const [teams, setTeams] = useState<string[][]>([]);

    useLayoutEffect(() => {
        onRedo();
    }, [end]);

    const onRedo = () => {
        rotate.value = withSpring(360, {
            mass: 2,
            damping: 20,
            stiffness: 100,
            overshootClamping: false,
            restDisplacementThreshold: 0.01,
            restSpeedThreshold: 2,
            reduceMotion: ReduceMotion.System,
        }, () => {
            rotate.value = 0;
        });
        onRandomlySetTeams();
    }


    function onRandomlySetTeams() {
        // logic to set teams randomly
        // based on the number of teams and players
        // radomly set the players in the teams

        const players = state.players;
        const teams = state.teams;

        const playersCopy = [...players];
        const teamsCopy = Array.from({ length: teams }, () => []);

        for (let i = 0; i < players.length; i++) {
            const randomIndex = Math.floor(Math.random() * playersCopy.length);
            const player = playersCopy[randomIndex];
            teamsCopy[i % teams].push(player);
            playersCopy.splice(randomIndex, 1);
        }

        setTeams(teamsCopy);
    }

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotate: `${rotate.value}deg` }]
        }
    });

    return (
        <View className="flex-1 p-8">
            <View className="flex-row items-center justify-between">
                <Animated.View style={animatedStyle}>
                    <Touchable
                        className="flex-row items-center"
                        onPress={onRedo}
                    >

                        <Animated.Text className="text-left text-xl top-2 px-2 font-Rawasi-regular text-red">
                            اخلط
                        </Animated.Text>
                        <Ionicons name="refresh-outline" size={18} color="#DF1E1E" />
                    </Touchable>
                </Animated.View>

                <Touchable
                    className="flex-row items-center"
                    onPress={onPrev}
                >
                    <Animated.Text className="text-left text-xl top-2 px-2 font-Rawasi-regular text-primary">
                        لا إرجع
                    </Animated.Text>
                    <Ionicons name="arrow-forward" size={18} color="#056CC1" />
                </Touchable>
            </View>
            <View className="py-10">
                <View className="flex flex-row flex-wrap gap-4">
                    {teams.map((team, index) => {
                        return (
                            <View key={index.toString()} style={{ width: width / 2 - 40 }}>
                                <Team
                                    team={team}
                                    index={index}
                                    width={width}
                                    visible={end}
                                />
                            </View>
                        )
                    })}
                </View>
            </View>
        </View>
    )
}

interface TeamProps {
    team: string[];
    index: number;
    width: number;
    visible: boolean;
}
const Team = (props: TeamProps) => {
    const animation = useSharedValue(100);
    const color = generateRandomColor();

    useEffect(() => {
        if (!props.visible) {
            animation.value = 100;
            return;
        }

        animation.value = withDelay(80 * props.index, withSpring(0, {
            mass: 2,
            damping: 20,
            stiffness: 100,
            overshootClamping: false,
            restDisplacementThreshold: 0.01,
            restSpeedThreshold: 2,
            reduceMotion: ReduceMotion.System,
        }))

    }, [props.visible])


    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: animation.value }],
            opacity: interpolate(animation.value, [30, 0], [0, 1]),
        }
    }, [])

    return (
        <Animated.View
            key={props.index}
            style={[animatedStyle, { borderColor: color }]}
            className={`flex-col p-4 rounded-lg border-2 bg-white`}
        >
            {props.team.map((player, i) => {
                return (
                    <Animated.Text key={i.toString()} className="text-right font-Rawasi-regular text-lg">
                        {player}
                    </Animated.Text>
                )
            })}
        </Animated.View>
    )
}