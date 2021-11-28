import hash from 'object-hash'

export const normalizeRss = ({ channel, posts }) => {
    const channelId = hash(channel)
    const normalizePost = (post) => ({ channelId, id: hash(post), ...post })

    return {
        channel: { id: channelId, ...channel },
        posts: posts.map(normalizePost),
    }
}
