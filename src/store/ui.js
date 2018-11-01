export default {
    state: {
        dark: false,
        drawer: false,
        loading: false
    },
    mutations: {
        setDark(state) {
            state.dark = !state.dark
        },
        setDrawer(state) {
            state.drawer = !state.drawer
        },
        setLoading(state, payload) {
            state.loading = payload
        }
    }
}