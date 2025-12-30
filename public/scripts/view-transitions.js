const workPosts = [
  "blexr",
  "audio-network",
  "aetna",
  "magnum-ice-cream",
  "coats",
  "virgin-radio",
  "many-pets",
  "hackett-menswear",
  "discovery",
  "camelot",
]

const getTransitionType = (fromUrl, toUrl) => {
  try {
    const fromPath = new URL(fromUrl).pathname
    const toPath = new URL(toUrl).pathname

    const fromMatch = fromPath.match(/^\/work\/(.+)$/)
    const toMatch = toPath.match(/^\/work\/(.+)$/)

    if (fromMatch && toMatch) {
      const fromSlug = fromMatch[1]
      const toSlug = toMatch[1]

      const fromIndex = workPosts.indexOf(fromSlug)
      const toIndex = workPosts.indexOf(toSlug)

      if (fromIndex !== -1 && toIndex !== -1) {
        const forwardDistance =
          (toIndex - fromIndex + workPosts.length) % workPosts.length
        const backwardDistance =
          (fromIndex - toIndex + workPosts.length) % workPosts.length

        if (forwardDistance < backwardDistance) {
          return "post-to-post-forward"
        }
        if (backwardDistance < forwardDistance) {
          return "post-to-post-backward"
        }
      }

      return "post-to-post"
    }

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
