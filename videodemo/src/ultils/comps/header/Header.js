import React, { Component } from 'react'
import { StyleSheet, StatusBar, View, Text, TouchableOpacity, TextInput, Image, ActivityIndicator, Dimensions } from 'react-native'
import PropTypes from 'prop-types'

import {getDevice, Device} from '../../device/Devices'

import BaseText from '../text/BaseText'
import Images from "../../../assets/images/Images";

const {width, height} = Dimensions.get('window')

class Header extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             containerHeight: 0,
        }
    }

    componentDidMount = () => {
      
        const device = getDevice()
        
        if (device == Device.iPhoneX){
            this.setState({
                containerHeight: 116,
            })
        }else{
            this.setState({
                containerHeight: 52,
            })
        }

    };

    renderLeftNavigationBar = () => {
        const {onLeftButtonPress} = this.props

        return (
                <TouchableOpacity
                    onPress={onLeftButtonPress}>
                    <Image 
                        style={[styles.arrow_back,{tintColor:'white'}]} 
                        source={Images.arrowBack} />
                </TouchableOpacity>
        )
    }

    renderTitle = () => {
        const {title} = this.props
        
            return (
                <View style={{flexDirection:'column'}}>
                <BaseText font='bold' style={[styles.titleText,{fontSize: 28, textAlign:'center'}]}>{title}</BaseText>
                </View>
            )
        
    }
    
    render() {

        const {backgroundColor,is_back,title} = this.props

        return (
            <View style = {[styles.center,styles.row,{width:width,height:this.state.containerHeight,backgroundColor:backgroundColor}]}>
                <View style={[styles.row, styles.left, styles.center]}>
                        {is_back ? this.renderLeftNavigationBar() : null}
                    </View>
                <View style={[styles.title, styles.center]}>
                    {this.renderTitle()}
                </View>
                <View style={[styles.row, styles.right, styles.center]}>
                    
                </View>
            </View>
        )
    }
}

Header.propTypes = {
    style: PropTypes.object,
    backgroundColor: PropTypes.string,
    title: PropTypes.string,
    is_back: PropTypes.bool,
    onLeftButtonPress: PropTypes.func,
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
    arrow_back:{
        width:14,
        height:24,
        marginRight: 16,
    },
    left: {
        flex: 2
    },
    title: {
        flex: 6
    },
    right: {
        flex: 2
    },
    titleText: {
        fontSize: 22,
        color:'white',
        letterSpacing: 0,
    },
})

export default Header