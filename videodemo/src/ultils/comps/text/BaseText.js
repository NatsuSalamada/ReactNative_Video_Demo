import React, { Component } from 'react'
import { StyleSheet, Text } from 'react-native'
import PropTypes from 'prop-types'

class BaseText extends Component {
    render() {
        const {style, children, font, numberOfLines} = this.props

        var fontFamily = ''
        switch (font) {
            case 'semiBold':
                fontFamily = 'Montserrat-SemiBold'
                break
            case 'bold':
                fontFamily = 'Montserrat-Bold'
                break
            case 'medium':
            case 'regular':
                fontFamily = 'Montserrat-Regular'
                break
            default:
                fontFamily = 'Montserrat-Regular'
                break
        }

        return (
            <Text 
                style={[styles.base, style, {fontFamily: fontFamily}]}
                ellipsizeMode={'tail'}
                numberOfLines={numberOfLines}>{children}</Text>
        )
    }
}

BaseText.defaultProps = {
    font: 'regular',
    numberOfLines: null,
}

BaseText.propTypes = {
    font: PropTypes.string,
    numberOfLines: PropTypes.number,
}

export default BaseText

const styles = StyleSheet.create({
    base: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 16,
    }
})