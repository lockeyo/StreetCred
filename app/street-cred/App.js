import React, { Component } from 'react';
import { StyleSheet, Text, View, WebView } from 'react-native';
import { NavigationComponent } from 'react-native-material-bottom-navigation'
import { TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ChallengeList from './src/components/ChallengeList';
import TimelineList from './src/components/TimelineList';

class ChallengeScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ChallengeList />
      </View>
    );
  }
}

class TimelineScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TimelineList />
      </View>
    );
  }
}

class HomeScreen extends Component {
  render() {
    return (
      <WebView
      source={{uri: 'http://streetcred.menux.org/realapp/'}}
      style={{marginTop: 20}}
      />
    );
  }
}

class LeaderboardScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Leaderboard</Text>
      </View>
    );
  }
}

class SettingsScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings</Text>
      </View>
    );
  }
}



const Navigator = TabNavigator({
    Challenges: { screen: ChallengeScreen },
    Timeline: { screen: TimelineScreen },
    Home: { screen: HomeScreen },
    Leaderboard: { screen: LeaderboardScreen },
    Settings: { screen: SettingsScreen }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Challenges') {
          iconName = "directions-bike";
        } else if (routeName === 'Timeline') {
          iconName = "timeline";
        } else if (routeName === 'Home') {
          iconName = "home";
        } else if (routeName === 'Leaderboard') {
          iconName = "person";
        } else if (routeName === 'Settings') {
          iconName = "settings";
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Icon name={iconName} size={25} color="white" />;
      },
    }),
    tabBarComponent: NavigationComponent,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      bottomNavigationOptions: {
        labelColor: 'blue',
        backgroundColor: '#5D4037',
        rippleColor: '#00796B',
        tabs: {
          Challenges: {
            barBackgroundColor: "#00796B",
            labelColor: "white",
          },
          Timeline: {
            barBackgroundColor: "#3E2723",
            labelColor: "white",
          },
          Home: {
            barBackgroundColor: "#5D4037",
            labelColor: "white",
          },
          Leaderboard: {
            barBackgroundColor: "#3E2723",
            labelColor: "white",
          },
          Settings: {
            barBackgroundColor: "#37474F",
            labelColor: "white",
          }
        }
      }
    }
  }
);

class App extends React.Component {
  render() {
    return (
      <Navigator />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
