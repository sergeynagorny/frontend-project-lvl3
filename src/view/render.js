import onChange from 'on-change'
import useRssForm from './use-rss-form'

export const render = (state, listeners) => {
    const rssForm = useRssForm(listeners.rssForm)

    return onChange(state, (path, value) => {
        switch (path) {
            case 'rssForm.processState':
                rssForm.handleProcessState(value)
                break

            case 'rssForm.valid':
                rssForm.handleValidation(value)
                break

            case 'rssForm.errors':
                rssForm.renderErrors(value)
                break

            case 'rssForm.processError':
                rssForm.handleProcessError(value)
                break

            case 'rssForm.processSuccess':
                rssForm.handleProcessSuccess(value)
                break

            default:
                if (path.includes('rssForm.fields')) {
                    const name = path.split('.').slice(-1)[0]
                    rssForm.setValue(name, value)
                }
                break
        }
    })
}
