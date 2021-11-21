import init from './init'
import { FormProcess } from './const'
import { validateRssForm } from './utils'
import { render } from './view/render'

export default function app() {
    const initState = {
        rssForm: {
            valid: true,
            processState: FormProcess.FILLING,
            processError: null,
            processSuccess: null,
            errors: {},
            fields: {
                url: '',
            },
        },
        feed: {
            urls: [],
        },
    }

    const state = render(initState, {
        rssForm: {
            onSubmit: (evt) => {
                evt.preventDefault()

                const { feed, rssForm } = state
                rssForm.processState = FormProcess.SENDING
                feed.urls.push(rssForm.fields.url)
                rssForm.fields.url = ''
                rssForm.processState = FormProcess.FILLING
            },
            onChange: (evt) => {
                const { feed, rssForm } = state
                const { url } = evt.currentTarget.elements
                rssForm.fields.url = url.value.trim()

                validateRssForm(rssForm.fields, feed.urls)
                    .then(() => {
                        rssForm.errors = {}
                        rssForm.valid = true
                    })
                    .catch((errors) => {
                        rssForm.errors = errors
                        rssForm.valid = false
                    })
            },
        },
    })
}

init().then(() => {
    app()
})
