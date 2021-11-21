import './style.css'
import I18nInstance from './libs/i18n'

export default function init() {
    const i18nPromise = I18nInstance.init()

    return Promise.all([i18nPromise])
}
