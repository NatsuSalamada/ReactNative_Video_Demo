import { Platform, Dimensions } from 'react-native'

const Device = {
    iPhoneX: 'iPhoneX',
    iPhone: 'iPhone',
    iPhoneSE: 'iPhoneSE',
    Android: 'Android',
    AndroidMedium: 'AndroidMedium',
    AndroidSmall: 'AndroidSmall',
}

const getDevice = () => {
    const platform = Platform.OS
    const {width, height} = Dimensions.get('window')
    
    if (platform == 'ios') {
        if (width >= 812 || height >= 812) {
            return Device.iPhoneX
        } else if (width == 568 || height == 568) {
            return Device.iPhoneSE
        } else {
            return Device.iPhone
        }
    } else {
        if (height <= 700)
            return Device.AndroidSmall
        else 
            return Device.Android
    }
}

const getDeviceType = () => {
    const platform = Platform.OS
    if (platform == 'ios') {
        return 'IOS'
    } else {
        return 'ANDROID'
    }
}

export { getDevice, Device, getDeviceType }