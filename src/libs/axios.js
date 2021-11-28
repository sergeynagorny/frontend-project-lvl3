import axios from 'axios'
import I18n from './i18n'

const instance = axios.create()

instance.interceptors.response.use(
    (config) => config,
    (error) => {
        const { t } = new I18n()
        error.message = t(`error.${error.message}`)

        return Promise.reject(error)
    }
)

export default instance
