import { uniqBy } from 'lodash'
import I18n from '../libs/i18n'
import { normalizeRss } from './normalize-rss'
import { parseRss } from './pase-rss'
import { getRss } from '../api/rss'

export const updateRss = (state, response) => {
    const { t } = new I18n()
    const { feed } = state

    try {
        const { channel, posts } = normalizeRss(parseRss(response.data.contents))
        feed.posts = uniqBy([...posts, ...feed.posts], 'id')
        feed.channels = uniqBy([channel, ...feed.channels], 'id')
    } catch {
        throw new Error(t('error.invalid_rss'))
    }
}

export const updateRssFeedRegularly = (state) => {
    const UPDATE_INTERVAL = 5000 // 5 seconds
    const requests = state.feed.urls.map((url) => getRss(url))
    const setUpdateTimeout = () => setTimeout(() => updateRssFeedRegularly(state), UPDATE_INTERVAL)

    Promise.all(requests)
        .then((responses) => {
            responses.forEach((response) => updateRss(state, response))
        })
        .finally(setUpdateTimeout)
}
