import React, { Component } from 'react'
import { 
    StyleSheet, View, Image, ScrollView, 
    Dimensions, TouchableOpacity,
    FlatList, Modal, TextInput, ActivityIndicator, RefreshControl, 
    TouchableWithoutFeedback, BackHandler, ToastAndroid, Linking, Alert,Platform,Animated,Easing
} from 'react-native'

import Header from "../../ultils/comps/header/Header";
import BaseText from "../../ultils/comps/text/BaseText";
import { connect } from 'react-redux'
import { getMovieTrending,getMoviePopular } from "./actions/home.actions";
import FastImage from 'react-native-fast-image'
import Images from "../../assets/images/Images";
import _ from "lodash";

const {width, height} = Dimensions.get('window')

const mapStateToProps = (state) => ({

    is_loading_popular: state.homeReducer.is_loading_popular,
    is_loading_trending: state.homeReducer.is_loading_trending,
    results_popular: state.homeReducer.results_popular,
    results_trending: state.homeReducer.results_trending,
    genres: state.homeReducer.genres

})

const mapDispatchToProps = (dispatch) => ({
    getMovieTrending:() => dispatch(getMovieTrending()),
    getMoviePopular:(page) => dispatch(getMoviePopular(page))
})

class HomeScreen extends Component{

    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }

    componentDidMount() {
        this.props.getMovieTrending()
        this.props.getMoviePopular(1)
    }
    

    renderHeader = () => {

        return (
            <Header
                backgroundColor = 'transparent'
                title = 'MOVIE'
                is_back = {false}
            />
        )

    }

    renderContent = () => {

        return (

            <ScrollView style = {[{flex:1,backgroundColor:'transparent'}]} >

                <BaseText font='semiBold' style={[{fontSize: 20,marginTop:10,marginLeft:10,color:'white'}]} >Now Playing</BaseText>

                <View style = {[styles.trending,styles.center]}>
                    { this.props.is_loading_trending ?

                            <ActivityIndicator size='small' color='yellow' />

                        :
                            <FlatList
                                contentContainerStyle={{paddingRight:10}}
                                horizontal
                                data = {this.props.results_trending}
                                renderItem={({item, index}) => this.renderTrendingItems(item, index)}
                                keyExtractor={(item, index) => item + index}
                            />
                    }

                </View>

                <View style = {[{marginTop:10,marginLeft:10,marginRight:10,justifyContent: 'space-between',alignItems: 'center'},styles.row]}>
                    <BaseText font='semiBold' style={[{fontSize: 22,color:'white'}]} >Popular</BaseText>
                    <TouchableOpacity >
                        <BaseText font='medium' style={[{fontSize: 12,color:'yellow'}]} >View more</BaseText>
                    </TouchableOpacity>
                </View>

                { this.props.is_loading_popular ?

                            <ActivityIndicator size='small' color='yellow' />

                        :
                            <FlatList
                                style = {{marginTop:5,width:width,height:this.props.results_popular ? this.props.results_popular.length*230 : 0}}
                                scrollEnabled = {false}
                                data = {this.props.results_popular}
                                renderItem={({item, index}) => this.renderPopularItems(item, index)}
                                keyExtractor={(item, index) => item + index}
                            />
                    }
                

            </ScrollView>

        )

    }

    renderTrendingItems = (item,index) => {

        const {poster_path,original_title} = item

        const sizeText = original_title.length * 12
        

        const original_path = "http://image.tmdb.org/t/p/w342" + poster_path
        return (

            <TouchableOpacity style = {[styles.trendingItem]} onPress = {() => {
                this.navPlayMovieScreen(item)
            }}>
                
                <FastImage
                    style = {{width:140,height:180,marginTop:0,marginLeft:0}}
                    source = {{uri:original_path}}
                />
                <View style = {[{flex:1,backgroundColor:'transparent'},styles.center]}>
                    <BaseText font = "regular"  style={[{fontSize: 12,marginTop:5,marginHorizontal: 5,color:'white',flexShrink: 1}]}>{original_title}</BaseText>
                </View>

            </TouchableOpacity>

        )
    }

    renderPopularItems = (item,index) => {

        const {poster_path,original_title,vote_average,genre_ids} = item

        const original_path = "http://image.tmdb.org/t/p/w342" + poster_path

        let genres_original = ''

        if (this.props.genres && genre_ids){

            if (this.props.genres.length > 0){

                genre_ids.forEach(i => {
                    this.props.genres.find(j => {
                        if (j.id == i){
                            genres_original = genres_original === '' ? j.name : genres_original + '/' + j.name
                        }
                    })
                });
            }

        }

        return (
            <TouchableOpacity style = {[styles.popularItem,styles.row]} onPress = {() => {
                this.navPlayMovieScreen(item)
            }}>
                <FastImage
                    style = {{width:140,height:220,marginTop:0,marginLeft:0}}
                    source = {{uri:original_path}}
                />

                <View style = {{flex:1,backgroundColor:'black'}}>
                    <BaseText font = 'semiBold' style={[{marginHorizontal:5,fontSize: 20,color:'white'}]}>{original_title}</BaseText>
                    <BaseText font = 'regular' style={[{marginHorizontal:10,fontSize: 20,color:'gold',marginTop:15}]}>{genres_original}</BaseText>
                </View>

                <View style = {[{position:'absolute',marginTop:150,marginLeft:110,width:60,height:28,backgroundColor:'gold'},styles.row,styles.center]} >
                    <FastImage style = {{width:14,height:14}} source = {Images.iconStar} />
                    <BaseText font='medium' numberOfLines = {3} style={[{marginLeft:5,fontSize: 14,color:'black'}]}>{vote_average}</BaseText>
                </View>

                
            </TouchableOpacity>
        )
    }

    navPlayMovieScreen = (item) => {
        this.props.navigation.navigate('PlayMovieScreen',{
            item:item
        })
    }
    
    render() {

        return (
            <View style = {styles.container}>
                {this.renderHeader()}
                {this.renderContent()}
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

    trending: {
        marginTop: 5,
        marginLeft: 0,
        height: 220,
        marginRight: 0,
        backgroundColor: 'transparent',
        
    },

    trendingItem: {
        height: 220,
        marginLeft: 10,
        width: 140,
        backgroundColor: 'transparent',
    },

    popularItem:{
        height: 220,
        marginLeft: 10,
        marginBottom: 10,
        width: width,
        backgroundColor: 'red',
    }

})

export default connect(mapStateToProps,mapDispatchToProps)(HomeScreen)