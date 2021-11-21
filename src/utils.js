import * as yup from 'yup'
import { keyBy } from 'lodash'

export const validateRssForm = (fields) => {
    const rssFormSchema = yup.object().shape({
        url: yup.string().url(),
    })

    return rssFormSchema
        .validate(fields, { abortEarly: false })
        .catch((err) => {
            const errors = keyBy(err.inner, 'path')
            return Promise.reject(errors)
        })
}
