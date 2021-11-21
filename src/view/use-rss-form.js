import { isEmpty } from 'lodash'
import { FormProcess } from '../const'

const createFeedback = (message, type) => {
    return `<p class="small text-${type}">${message}</p>`
}

const useRssForm = (listeners) => {
    const form = document.querySelector('.rss-form')
    const input = form.querySelector('input[name="url"]')
    const submitButton = form.querySelector('button[type="submit"]')
    const submitButtonSpinner = submitButton.querySelector('[role="status"]')
    const feedback = document.querySelector('.feedback')

    form.addEventListener('submit', listeners.onSubmit)
    form.addEventListener('change', listeners.onChange)

    const handleProcessError = (message) => {
        feedback.innerHTML = createFeedback(message, 'danger')
    }

    const handleProcessSuccess = (message) => {
        feedback.innerHTML = createFeedback(message, 'success')
    }

    const setValue = (name, value) => {
        form.elements[name].value = value
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

    const renderErrors = (errors) => {
        feedback.innerHTML = !isEmpty(errors)
            ? Object.entries(errors)
                  .map(([_, value]) => createFeedback(value.message, 'danger'))
                  .join('\n')
            : ''
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
