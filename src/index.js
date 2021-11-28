import { find } from 'lodash'
import init from './init'
import { FormProcess } from './const'
import { render } from './view/render'
import { validateRssForm } from './utils/validate'
import { getRss } from './api/rss'
import { updateRss, updateRssFeedRegularly } from './utils/update-rss'

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
            posts: [],
            channels: [],
            urls: [],
        },
    }

    const state = render(initState, {
        rssForm: {
            onSubmit: (evt) => {
                evt.preventDefault()
                const { rssForm, feed } = state
                const { url } = rssForm.fields

                rssForm.processState = FormProcess.SENDING
                rssForm.processError = null
                rssForm.processSuccess = null

                getRss(url)
                    .then((response) => {
                        updateRss(state, response)
                    })
                    .then(() => {
                        feed.urls.push(url)
                        rssForm.fields.url = ''
                        rssForm.processSuccess = 'RSS успешно загружен'
                    })
                    .catch((error) => {
                        rssForm.processError = error.message
                    })
                    .finally(() => {
                        rssForm.processState = FormProcess.FILLING
                    })
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

    updateRssFeedRegularly(state)
}

init().then(() => {
    app()
})
