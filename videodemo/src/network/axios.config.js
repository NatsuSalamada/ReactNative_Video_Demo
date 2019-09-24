import axios from 'axios'

export const APIController = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
})
