import * as i18next from 'i18next'
import resources from '../locales'

export default class I18n {
    constructor() {
        if (!I18n.instance) {
            throw new Error('I18n is not initial')
        }
        return I18n.instance
    }

    static init() {
        const i18nextInstance = i18next.createInstance()
        return i18nextInstance
            .init({
                lng: 'ru',
                resources,
            })
            .then(() => {
                I18n.instance = i18nextInstance
            })
    }
}
