import { Alert } from 'react-native'

export default errorHandler = (err) => {
    return (dispatch) => {
        const res = err.response
        if (err.message == 'Network Error') {
            Alert.alert('Error', 'Please check your internet connection and try again later.')
        } else if (res.status == 401 || res.status == 404) {
            Alert.alert('Error', res.data.status_message)
        } else if (err.message !== undefined) {
            Alert.alert(lang.error.error, err.message)
        } else if (err.description !== undefined) {
            Alert.alert(lang.error.error, err.description)
        } else if (typeof err === 'string' || err instanceof String) {
            Alert.alert(lang.error.error, err)
        }
    }
}