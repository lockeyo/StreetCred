import React, { Component } from 'react'
import { ScrollView } from 'react-native';
import axios from 'axios';
import TimelineDetail from './TimelineDetail';

class TimelineList extends Component {
  state = { timelines: [] };

  componentDidMount() {
    axios.get('https://rallycoding.herokuapp.com/api/music_albums')
      .then(response => this.setState({ timelines: response.data }));
  }

  renderTimelines() {
    return this.state.timelines.map(timeline =>
      <TimelineDetail key={timeline.title} timeline={timeline} />);
  }


  render() {
    return (
      <ScrollView>
        {this.renderTimelines()}
      </ScrollView>
    );
  }
}

export default TimelineList;
