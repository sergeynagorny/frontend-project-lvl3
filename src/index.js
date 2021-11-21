import init from './init.js'
import { FormProcess } from './const'
import { validateRssForm } from './utils'
import { render } from './view/render'

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
}

const state = render(initState, {
    rssForm: {
        onSubmit: (evt) => {
            evt.preventDefault()
            state.rssForm.processState = FormProcess.SENDING
        },
        onChange: (evt) => {
            const { url } = evt.currentTarget.elements
            state.rssForm.fields.url = url.value.trim()

            validateRssForm(state.rssForm.fields)
                .then(() => {
                    state.rssForm.errors = {}
                    state.rssForm.valid = true
                })
                .catch((errors) => {
                    state.rssForm.errors = errors
                    state.rssForm.valid = false
                })
        },
    },
})

init()
