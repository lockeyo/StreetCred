import React, { Component } from 'react'
import { ScrollView } from 'react-native';
import axios from 'axios';
import ChallengeDetail from './ChallengeDetail';

class ChallengeList extends Component {
  state = { challenges: [] };

  componentDidMount() {
    axios.get('https://rallycoding.herokuapp.com/api/music_albums')
      .then(response => this.setState({ challenges: response.data }));
  }

  renderChallenges() {
    return this.state.challenges.map(challenge =>
      <ChallengeDetail key={challenge.title} challenge={challenge} />);
  }


  render() {
    return (
      <ScrollView>
        {this.renderChallenges()}
      </ScrollView>
    );
  }
}

export default ChallengeList;
