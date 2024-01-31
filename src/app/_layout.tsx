import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { Text, View } from 'react-native';



export default function Layout() {

    const [fontsLoaded] = useFonts({
        ['Lateef-Bold']: require('../../assets/fonts/Lateef-Bold.ttf'),
        ['Lateef-Light']: require('../../assets/fonts/Lateef-Light.ttf'),
        ['Lateef-ExtraBold']: require('../../assets/fonts/Lateef-ExtraBold.ttf'),
        ['Lateef-ExtraLight']: require('../../assets/fonts/Lateef-ExtraLight.ttf'),
        ['Lateef-Medium']: require('../../assets/fonts/Lateef-Medium.ttf'),
        ['Lateef-Regular']: require('../../assets/fonts/Lateef-Regular.ttf'),
        ['Lateef-SemiBold']: require('../../assets/fonts/Lateef-SemiBold.ttf'),
        ['Rakkas-Regular']: require('../../assets/fonts/Rakkas-Regular.ttf'),
    });

    if (!fontsLoaded) {
        return (
            <View className="flex-1 items-center justify-center bg-background">
                <Text>...</Text>
            </View>
        )
    }

    return (
        <View className="flex-1">
            {/* Main Stack */}
            <Stack screenOptions={{ headerShown: false }} />
        </View>
    )
}