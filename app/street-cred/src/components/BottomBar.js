import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons'

class BottomBar extends Component {
  constructor(props) {
    super(props)

    this.state = { activeTab: 0 }
    this.handleTabChange = this.handleTabChange.bind(this)
  }

  handleTabChange(newTabIndex, oldTabIndex) {
    this.setState({ activeTab: newTabIndex })
  }

  render() {
    return (
      <BottomNavigation
        activeTab={this.state.activeTab}
        labelColor="white"
        rippleColor="white"
        style={{
          height: 56,
          elevation: 8,
          position: 'absolute',
          left: 0,
          bottom: 0,
          right: 0
        }}
        onTabChange={this.handleTabChange}
      >
        <Tab
          barBackgroundColor="#37474F"
          label="Challenges"
          icon={<Icon size={24} color="white" name="directions-bike" />}
        />
        <Tab
          barBackgroundColor="#00796B"
          label="Timeline"
          icon={<Icon size={24} color="white" name="timeline" />}
        />
        <Tab
          barBackgroundColor="#5D4037"
          label="Home"
          icon={<Icon size={24} color="white" name="home" />}
        />
        <Tab
          barBackgroundColor="#3E2723"
          label="Leaderboard"
          icon={<Icon size={24} color="white" name="person" />}
        />
        <Tab
          barBackgroundColor="#37474F"
          label="Settings"
          icon={<Icon size={24} color="white" name="settings" />}
        />
      </BottomNavigation>
    )
  }
}

const styles = StyleSheet.create({
  bottomNavigation: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 56
  }
})

export default BottomBar;
