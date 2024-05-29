export const bookManager = {
    id: localStorage.getItem("bookId") || null,
    setId: (id) => { localStorage.setItem("bookId", id) },
}