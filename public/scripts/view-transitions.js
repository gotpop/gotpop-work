const getTransitionType = (fromUrl, toUrl) => {
  try {
    const fromPath = new URL(fromUrl).pathname
    const toPath = new URL(toUrl).pathname

    const fromPost = fromPath.startsWith("/work/")
    const toPost = toPath.startsWith("/work/")

    if (fromPost && toPost) return "post-to-post"

    return null
  } catch {
    return null
  }
}

const addTransitionType = (event, fromUrl, toUrl) => {
  if (!event.viewTransition) return

  const type = getTransitionType(fromUrl, toUrl)

  if (type) {
    event.viewTransition.types.add(type)
  }
}

window.addEventListener("pageswap", (event) => {
  if (!event.activation) return

  addTransitionType(event, window.location.href, event.activation.entry.url)
})

window.addEventListener("pagereveal", (event) => {
  const activation = window.navigation?.activation

  if (!activation?.from) return

  addTransitionType(event, activation.from.url, activation.entry.url)
})
