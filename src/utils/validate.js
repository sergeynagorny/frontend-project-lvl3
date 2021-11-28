import * as yup from 'yup'

export const validateRssForm = (fields, activeUrls) => {
    const rssFormSchema = yup.object().shape({
        url: yup
            .string()
            .url('rssForm.errors.url')
            .notOneOf(activeUrls, 'rssForm.errors.url_duplicate'),
    })

    return rssFormSchema.validate(fields)
}
