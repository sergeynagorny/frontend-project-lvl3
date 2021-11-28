import onChange from 'on-change'
import useRssForm from './use-rss-form'
import useFeed from './use-feed'

export const render = (state, listeners) => {
    const feed = useFeed(listeners.feed)
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

            case 'feed.posts':
                feed.renderPosts(value, state.feed.viewedPostIds)
                break

            case 'feed.channels':
                feed.renderChannels(value)
                break

            case 'feed.viewedPostIds':
                feed.markPostsViewed(value)
                break

            case 'feed.modalData':
                feed.renderPostModalData(value)
                break

            default:
                if (path.includes('rssForm.fields')) {
                    const [name] = path.split('.').slice(-1)
                    rssForm.setValue(name, value)
                }
                break
        }
    })
}
