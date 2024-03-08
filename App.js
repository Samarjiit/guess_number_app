import { useState, useEffect } from "react"
import { View, StyleSheet, ImageBackground, SafeAreaView } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import GameOverScreen from "./screens/GameOverScreen"
import StartGameScreen from "./screens/StartGameScreen"
import GameScreen from "./screens/GameScreen"
import Colors from "./constants/colors"
import { useFonts } from "expo-font"
import * as SplashScreen from "expo-splash-screen" //splash screen

export default function App() {
  const [userNumber, setUserNumber] = useState()
  const [gameIsOver, setGameIsOver] = useState(true)
  const [guessRounds, setGuessRounds] = useState(0)
  //setting the custom fonts
  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    LemonLove: require("./assets/fonts/LemonLove.ttf"),
    MilkyCoffee: require("./assets/fonts/MilkyCoffee.otf"),
  })
  //it will do componentdidmount
  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync()
    }
    prepare()
  }, []) //This code uses the useEffect hook to run an asynchronous function once when the component mounts. The function calls SplashScreen.preventAutoHideAsync() to prevent the splash screen from automatically hiding before the fonts are loaded.

  if (!fontsLoaded) {
    return undefined
  } else {
    SplashScreen.hideAsync()
  } //This code checks if the fonts have been loaded. If they haven't, it returns undefined, effectively rendering nothing until the fonts are loaded. Once the fonts are loaded, it calls SplashScreen.hideAsync() to hide the splash screen.
  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber)
    setGameIsOver(false)
  }
  function GameOverHandler(numberOfRounds) {
    setGameIsOver(true)
    setGuessRounds(numberOfRounds)
  }

  function startNewGameHandler() {
    setUserNumber(null)
    setGameIsOver(true)
    setGuessRounds(0)
  }

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />

  if (userNumber) {
    screen = <GameScreen userNumber={userNumber} onGameOver={GameOverHandler} /> //thisprops exposed to gamescreen
  }

  if (gameIsOver && userNumber) {
    screen = (
      <GameOverScreen
        userNumber={userNumber}
        roundsNumber={guessRounds}
        onStartNewGame={startNewGameHandler}
      />
    )
  }

  return (
    <LinearGradient
      colors={[Colors.primary700, Colors.accent500]}
      style={styles.rootScreen}
    >
      <ImageBackground
        source={require("./assets/images/background.png")}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
})
//here we get whole yellow b/c we put flex 1 so it will  take as much space as it is avaialbe
//also if we not add flex 1 so it will occupy only startgreenscrreen space only
