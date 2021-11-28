import I18n from '../libs/i18n'

const createPost = (post) => {
    const { t } = new I18n()

    const template = document.getElementById('postTmp').content.cloneNode(true)
    const link = template.querySelector('.post__link')
    const button = template.querySelector('.post__btn')

    link.textContent = post.title
    link.dataset.id = post.id
    button.textContent = t('button.view')
    button.dataset.id = post.id

    return template
}

const createPostModal = (post) => {
    const { t } = new I18n()

    const template = document.getElementById('postModalTmp').content.cloneNode(true)
    const closeBtn = template.querySelector('.post-modal__close')
    const readMorBtn = template.querySelector('.post-modal__read-more')
    const description = template.querySelector('.post-modal__description')
    const title = template.querySelector('.post-modal__title')

    title.textContent = post.title
    description.textContent = post.description
    readMorBtn.textContent = t('button.read_more')
    closeBtn.textContent = t('button.close')

    return template
}

const createChannel = (channel) => {
    const tmp = document.getElementById('channelTmp').content.cloneNode(true)
    const title = tmp.querySelector('.channel__title')
    const description = tmp.querySelector('.channel__description')

    title.textContent = channel.title
    description.textContent = channel.description

    return tmp
}

const renderElements = (container, elements) => {
    const fragment = new DocumentFragment()
    elements.forEach((element) => fragment.appendChild(element))
    container.appendChild(fragment)
}

const useFeed = (listeners) => {
    const elements = {
        channels: {
            title: document.querySelector('#channels .card-title'),
            list: document.querySelector('#channels .list-group'),
        },
        posts: {
            title: document.querySelector('#posts .card-title'),
            list: document.querySelector('#posts .list-group'),
            modalTemplate: document.querySelector('#postModalTmp'),
        },
        modal: document.querySelector('.modal-dialog'),
    }

    elements.posts.list.addEventListener('click', (evt) => {
        const { target } = evt
        if (target.classList.contains('post__btn')) {
            const postId = target.dataset.id
            listeners.onPostViewClick(postId)
        }
    })

    const markPostsViewed = (postIds) => {
        postIds.forEach((id) => {
            const link = elements.posts.list.querySelector(`.post__link[data-id="${id}"]`)
            link.classList.add('fw-normal', 'text-muted')
            link.classList.remove('fw-bold')
        })
    }

    const renderPosts = (posts, viewedPostIds) => {
        const { title, list } = elements.posts
        title.classList[!posts.length ? 'add' : 'remove']('d-none')
        list.innerHTML = ''
        renderElements(list, posts.map(createPost))

        markPostsViewed(viewedPostIds)
    }

    const renderChannels = (channels) => {
        const { title, list } = elements.channels
        title.classList[!channels.length ? 'add' : 'remove']('d-none')
        list.innerHTML = ''
        renderElements(list, channels.map(createChannel))
    }

    const renderPostModalData = (post) => {
        const { modal } = elements
        const postModal = createPostModal(post)

        modal.innerHTML = ''
        modal.appendChild(postModal)
    }

    return {
        renderPosts,
        renderChannels,
        renderPostModalData,
        markPostsViewed,
    }
}

export default useFeed
