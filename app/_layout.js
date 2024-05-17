import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

import { useFonts } from "expo-font";
import { useCallback } from "react";



export default function Layout() {
    const [fontsLoaded] = useFonts({
        cairo: require("../constants/fonts/Alexandria-VariableFont_wght.ttf")
      });
      const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
          await SplashScreen.hideAsync()
        }
      }, [fontsLoaded]);
    
      if (!fontsLoaded) {
        return null
      }
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(home)" />
    </Stack>
  );
}
