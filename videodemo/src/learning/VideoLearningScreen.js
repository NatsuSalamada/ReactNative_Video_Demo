import React, { Component } from 'react';
import { 
    StyleSheet, ScrollView, View, 
    Image ,TouchableOpacity, findNodeHandle, 
    Modal, FlatList, Dimensions, TextInput,
    InputAccessoryView, Platform, ActivityIndicator,
    Keyboard, BackHandler, Text, Button
} from 'react-native'

import Video from 'react-native-video'
import VideoPlayer from 'react-native-video-player';

const VIMEO_ID = '179859217';

const {width,height} = Dimensions.get('window')

class VideoLearningScreen extends Component{
    constructor(props) {
      super(props)
    
      this.state = {
        video: { width: undefined, height: undefined, duration: undefined },
        thumbnailUrl: undefined,
        videoUrl: undefined,
        };
    };

    componentDidMount() {
    global.fetch(`https://player.vimeo.com/video/${VIMEO_ID}/config`)
      .then(res => res.json())
      .then(res => this.setState({
        thumbnailUrl: res.video.thumbs['640'],
        videoUrl: res.request.files.hls.cdns[res.request.files.hls.default_cdn].url,
        video: res.video,
      }));
  }

  render() {
    return (
      <View>
        <Text style={{ fontSize: 22, marginTop: 22 }}>React Native Video Player</Text>
        <VideoPlayer
          endWithThumbnail
          thumbnail={{ uri: this.state.thumbnailUrl }}
          video={{ uri: this.state.videoUrl }}
          videoWidth={this.state.video.width}
          videoHeight={this.state.video.height}
          duration={this.state.video.duration/* I'm using a hls stream here, react-native-video
            can't figure out the length, so I pass it here from the vimeo config */}
          ref={r => this.player = r}
        />
        <Button
          onPress={() => this.player.stop()}
          title="Stop"
        />
        <Button
          onPress={() => this.player.pause()}
          title="Pause"
        />
        <Button
          onPress={() => this.player.resume()}
          title="Resume"
        />
      </View>
    );
  }

    video_01 = () => {

        return (
            <Video style = {{height:height/2,width:width}}
                source={{uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'}}
                controls
            />
        )

    }
    
}
export default VideoLearningScreen

