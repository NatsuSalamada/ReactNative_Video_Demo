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
import FastImage from 'react-native-fast-image'
import Images from "../../assets/images/Images";

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = (dispatch) => ({

})
class ViewMoreScreen extends Component{

    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }

    render() {
        return (
            <View>
                
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
})

export default connect(mapStateToProps,mapStateToProps)(ViewMoreScreen)