import axios from '../libs/axios'

export const getRss = (url) => {
    return axios.get(`https://hexlet-allorigins.herokuapp.com/get?disableCache=true&url=${url}`)
}
