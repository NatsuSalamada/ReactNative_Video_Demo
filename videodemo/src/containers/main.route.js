import { createStackNavigator } from 'react-navigation-stack'

import HomeScreen from "./home/HomeScreen";
import PlayMovieScreen from "./movie/PlayMovieScreen";
import ReactNativeYouTubeExample from "../learning/ReactNativeYouTubeExample";
const routeConfig = {

    HomeScreen: HomeScreen,
    PlayMovieScreen: PlayMovieScreen,
    ReactNativeYouTubeExample: ReactNativeYouTubeExample

}

const stackConfig = {
    initialRouteName: 'HomeScreen',
    headerMode: 'none',
    defaultNavigationOptions: {
        gesturesEnabled: false,
    }
}

export default mainNavigation = createStackNavigator(routeConfig,stackConfig)

