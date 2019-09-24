import React, { Component } from 'react'
import { 
    StyleSheet, View, Image, ScrollView, 
    Dimensions, TouchableOpacity,
    FlatList, Modal, TextInput, ActivityIndicator, RefreshControl, 
    TouchableWithoutFeedback, BackHandler, ToastAndroid, Linking, Alert,Platform,Animated,Easing,PixelRatio
} from 'react-native'

import Header from "../../ultils/comps/header/Header";
import BaseText from "../../ultils/comps/text/BaseText";
import { connect } from 'react-redux'

import FastImage from 'react-native-fast-image'
import Images from "../../assets/images/Images";
import YouTube from 'react-native-youtube';
import { getVideo,getCasts,clear } from "./actions/playMovie.actions";
const playerWidth = Dimensions.get('window').width

const mapStateToProps = (state) => ({
    is_loading_video:state.playMovieReducer.is_loading_video,
    is_loading_casts: state.playMovieReducer.is_loading_casts,
    key_movie: state.playMovieReducer.key_movie,
    cast: state.playMovieReducer.cast
})

const mapDispatchToProps = (dispatch) => ({
    getVideo:(movie_id) => dispatch(getVideo(movie_id)),
    getCasts:(movie_id) => dispatch(getCasts(movie_id)),
    clear:() => dispatch(clear())
})

class PlayMovieScreen extends Component{

    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    

    componentDidMount() {
        const item = this.props.navigation.getParam('item',null)
        if (!item){
            return
        }

        const {id} = item

        this.props.getVideo(id)
        this.props.getCasts(id)
    }
    

    renderHeader = () => {
        
        return (
            <Header
                backgroundColor = 'transparent'
                title = 'Play'
                is_back = {true}
                onLeftButtonPress = {() => {
                    this.props.clear()
                    this.props.navigation.goBack()
                }}
            />
        )

    }
    
    renderPlay = () => {

        const item = this.props.navigation.getParam('item',null)

        if(!item){
            return
        }

        const {original_title,overview} = item

        return(

            <ScrollView style = {{flex: 1,backgroundColor: 'transparent'}}>
                {this.renderVideo()}
                <BaseText font='semiBold' style = {{fontSize: 20,marginHorizontal:5,color:'white',marginVertical:10}} >{original_title}</BaseText>
                <BaseText font='bold' style = {{fontSize: 14,marginHorizontal:5,color:'gold',marginTop:10,marginBottom:5}} >Description:</BaseText>
                <BaseText font='regular' style = {{fontSize: 12,marginHorizontal:5,color:'white',marginBottom:10}} >{overview}</BaseText>
                <BaseText font='bold' style = {{fontSize: 14,marginHorizontal:5,color:'gold',marginBottom:5}} >Casts:</BaseText>
                <View style={[styles.casts,styles.center]}>
                    {
                        this.props.is_loading_casts ? <ActivityIndicator size='small' color='yellow' /> :
                        <FlatList
                                contentContainerStyle={{paddingRight:10}}
                                horizontal
                                data = {this.props.cast}
                                renderItem={({item, index}) => this.renderCastItems(item, index)}
                                keyExtractor={(item, index) => item + index}
                            />

                    }
                </View>
            </ScrollView>

        )

    }

    renderCastItems = (item,index) => {

        const {name,profile_path} = item
        const original_path = "http://image.tmdb.org/t/p/h632" + profile_path

        return (
            <View style = {[styles.castsItem]} >
                
                <FastImage
                    style = {{width:140,height:180,marginTop:0,marginLeft:0}}
                    source = {{uri:original_path}}
                />
                <View style = {[{flex:1,backgroundColor:'transparent'},styles.center]}>
                    <BaseText font = "regular"  style={[{fontSize: 12,marginTop:5,marginHorizontal: 5,color:'white',flexShrink: 1}]}>{name}</BaseText>
                </View>

            </View>
        )

    }

    renderVideo = () => {

        if (this.props.key_movie){

            return (
                <YouTube
                    videoId={this.props.key_movie} // The YouTube video ID
                    play // control playback of video with true/false
                    // fullscreen // control whether the video should play in fullscreen or inline
                    // loop // control whether the video should loop when ended
                    onReady={e => this.setState({ isReady: true })}
                    onChangeState={e => this.setState({ status: e.state })}
                    onChangeQuality={e => this.setState({ quality: e.quality })}
                    onError={e => this.setState({ error: e.error })}
                    style={{ alignSelf: 'stretch',  marginVertical: 0,height: PixelRatio.roundToNearestPixel(playerWidth / (16 / 9)) }}
                />
            )

        }else{

            return (
                <View style = {[styles.center,{alignSelf: 'stretch',  marginVertical: 0,height: PixelRatio.roundToNearestPixel(playerWidth / (16 / 9))}]} >
                    <ActivityIndicator size='small' color='yellow' />
                </View>
            )

        }

    }

    render() {
        return (
            <View style = {styles.container}>
                {this.renderHeader()}
                {this.renderPlay()}
            </View>
        )
    }

}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row'
    },
    column: {
        flexDirection: 'column'
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
        
    },

    container: {
        flex: 1,
        backgroundColor: 'black',
    },

    casts: {
        marginTop: 5,
        marginLeft: 0,
        height: 220,
        marginRight: 0,
        backgroundColor: 'transparent',
        
    },

    castsItem: {
        height: 220,
        marginLeft: 10,
        width: 140,
        backgroundColor: 'transparent',
    },
})

export default connect(mapStateToProps,mapDispatchToProps)(PlayMovieScreen)