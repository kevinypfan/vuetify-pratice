import apolloClient from '@/plugins/apolloClient'
import { onLogin, onLogout } from '@/plugins/vue-apollo'
import LOGIN from '@/graphql/Login.gql'
import Signup from '@/graphql/Signup.gql'
import Logout from '@/graphql/Logout.gql'
import CheckToken from '@/graphql/CheckToken.gql'

export default {
    state: {
        user: null
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload
        }
    },
    actions: {
        async userLogin({ commit }, payload) {
            const { data } = await apolloClient.mutate({
                mutation: LOGIN,
                variables: {
                    studentId: payload.studentId,
                    password: payload.password
                }
            })
            commit('setUser', data.login)
            if (!data.login.tokens.last().token) return Promise.reject()
            return onLogin(apolloClient, data.login.tokens.last().token)
        },
        async userSignup({ commit }, { username, studentId, password }) {
            const { data } = await apolloClient.mutate({
                mutation: Signup,
                variables: { username, studentId, password }
            })
            commit('setUser', data.signup)
            if (!data.signup.tokens.last().token) return Promise.reject()
            return onLogin(apolloClient, data.signup.tokens.last().token)
        },
        async userLogout({ commit }) {
            const { data } = await apolloClient.mutate({
                mutation: Logout
            })
            await onLogout(apolloClient)
            commit('setUser', null)
            return data.logout
        },
        async checkToken({ commit }) {
            const { data } = await apolloClient.query({
                query: CheckToken
            })
            console.log(data)
            if (data.checkToken) {
                commit('setUser', data.checkToken)
                return Promise.resolve('user token checked!')
            } else {
                window.localStorage.removeItem('x-access-token')
                return Promise.reject('authenticate failed!')
            }
        }
    },
    getters: {
        username(state) {
            if (!state.user) return 'Guest'
            return state.user.username
        },
        authenticate(state) {
            return state.user !== null && state.user !== undefined
        }
    }
}