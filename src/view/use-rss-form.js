import { FormProcess } from '../const'
import I18n from '../libs/i18n'

const createFeedback = (message, type) => {
    return `<p class="small text-${type}">${message}</p>`
}

const useRssForm = (listeners) => {
    const { t } = new I18n()
    const form = document.querySelector('.rss-form')
    const input = form.querySelector('input[name="url"]')
    const submitButton = form.querySelector('button[type="submit"]')
    const submitButtonSpinner = submitButton.querySelector('[role="status"]')
    const feedback = document.querySelector('.feedback')

    form.addEventListener('submit', listeners.onSubmit)
    form.addEventListener('change', listeners.onChange)

    const setValue = (name, value) => {
        const formElement = form.elements[name]
        formElement.value = value
    }

    const handleProcessError = (message) => {
        feedback.innerHTML = ''
        feedback.innerHTML = createFeedback(t(message), 'danger')
    }

    const handleProcessSuccess = (message) => {
        feedback.innerHTML = ''
        feedback.innerHTML = createFeedback(message, 'success')
    }

    const renderErrors = (error) => {
        feedback.innerHTML = ''
        feedback.innerHTML = createFeedback(t(error.message), 'danger')
    }

    const handleValidation = (isValid) => {
        submitButton.disabled = !isValid
        input.classList[!isValid ? 'add' : 'remove']('is-invalid')
    }

    const handleProcessState = (process) => {
        switch (process) {
            case FormProcess.FILLING:
                input.disabled = false
                submitButton.disabled = false
                submitButtonSpinner.classList.remove('spinner-grow')
                input.focus()
                break

            case FormProcess.SENDING:
                input.disabled = true
                submitButton.disabled = true
                submitButtonSpinner.classList.add('spinner-grow')
                break

            default:
                throw new Error(`Unknown process state: ${process}`)
        }
    }

    return {
        setValue,
        handleProcessState,
        handleValidation,
        renderErrors,
        handleProcessError,
        handleProcessSuccess,
    }
}

export default useRssForm
