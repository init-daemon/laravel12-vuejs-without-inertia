export const  scrollToHash = (routeHash) => {
    if (routeHash) {
        const id = routeHash.slice(1)
        const el = document.getElementById(id)

        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        } else {
            nextTick(() => {
                const el = document.getElementById(id)
                el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            })
        }
    }
}