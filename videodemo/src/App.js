/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import VideoLearningScreen from "./learning/VideoLearningScreen";

import MainNavigator from "./containers/main.route";
import { createAppContainer } from 'react-navigation'

const App = () => {

  const AppContainer = createAppContainer(MainNavigator)

  return (
      <View style={styles.container}>
        <StatusBar hidden/>
        <AppContainer />
      </View>
    )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default App;
