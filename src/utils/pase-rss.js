const parseMeta = (item) => ({
    title: item.querySelector('title').textContent,
    link: item.querySelector('link').textContent,
    description: item.querySelector('description').textContent,
})

export const parseRss = (data) => {
    const doc = new DOMParser().parseFromString(data, 'text/xml')
    const channel = doc.querySelector('channel')
    const items = doc.querySelectorAll('item')

    return {
        channel: { ...parseMeta(channel) },
        posts: [...items].map(parseMeta),
    }
}
