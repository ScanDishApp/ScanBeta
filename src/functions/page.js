export const pageManager = {
    id: localStorage.getItem("pageId") || null,
    setId: (id) => { localStorage.setItem("pageId", id) },
}