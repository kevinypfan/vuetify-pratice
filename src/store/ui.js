export default {
    state: {
        dark: false,
        drawer: false,
        loading: false,
        dialog: false
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
        },
        setDialog(state, payload) {
            state.dialog = payload
        }
    }
}