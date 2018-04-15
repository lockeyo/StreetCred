import React from 'react';
import { Text, View, Image, Linking } from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
import Button from './Button';

const TimelineDetail = ({ timeline }) => {
  const { title, thumbnail_image, image, url } = timeline;
  const { thumbnailStyle, headerContentStyle, thumbnailContainerStyle, headerTextStyle, imageStyle } = styles;
  return (
      <Card>
        <CardSection>
        <View style={thumbnailContainerStyle}>
          <Image style={thumbnailStyle} source={{ uri: thumbnail_image }} />
        </View>
        <View style={headerContentStyle}>
          <Text style={headerTextStyle}>{title}</Text>
        </View>
        </CardSection>
        <CardSection>
          <Button onPress={() => Linking.openURL(url)}>Like Timeline</Button>
        </CardSection>
      </Card>
  );
};

const styles = {
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginLeft: 80,
    marginRight: 80
  },

  headerTextStyle: {
    fontSize: 18
  },

  thumbnailStyle: {
    height: 50,
    width: 50
  },

  thumbnailContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  },

  imageStyle: {
    height: 30,
    flex: 1,
    width: null
  }
}

export default TimelineDetail;
