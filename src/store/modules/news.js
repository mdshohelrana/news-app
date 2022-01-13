import * as R from "ramda"
import Vue from 'vue'
import newsService from "../../services/NewsService"

const state = {
    topHeadlines: [],
    newsSources: [],
    error: null,
    fetchedAt: 0,
    loading: false,
}

const getters = {
}

const actions = {
    getTopHeadlines({ commit }) {
        commit('changeLoadingSate', true)

        newsService
            .getTopHeadlines()
            .then(data => {
                commit("setHeadlines", data)
                commit('changeLoadingSate', false)
            })
            .catch(err => {
                commit("setError", err)
                commit('changeLoadingSate', false)
            })
    },

    getNewsSources({ commit }) {
        newsService
            .getNewsSources()
            .then(data => {
                commit("setNewsSources", data)
            })
            .catch(err => {
                commit("setError", err)
            })
    },

    getSearchedTopHeadlines({ commit }, payload) {
        newsService
            .getSearchedTopHeadlines(payload)
            .then(data => {
                commit("setSearchedTopHeadlines", data)
            })
            .catch(err => {
                commit("setError", err)
            })
    },
}

const mutations = {
    setHeadlines(state, response) {
        response.data.articles.forEach((element, index) => {
            element.id = index + 1
            element.visited = false
        });
        state.topHeadlines = response.data
        state.fetchedAt = R.prop("fetchedAt", response)
    },
    setNewsSources(state, response) {
        state.newsSources = response.data.sources
    },
    setSearchedTopHeadlines(state, response) {
        state.topHeadlines = response.data
        state.fetchedAt = R.prop("fetchedAt", response)
    },
    changeLoadingSate(state, payload) {
        state.loading = payload
    },
    setVisisted(state, payload) {
        state.topHeadlines.articles.forEach(el => {
            if (Number(payload) === Number(el.id)) {
                el.visited = true
            }
        })
    },
    updateNewsTitle(state, payload) {
        state.topHeadlines.articles.map((item) => {
            if (item.title === payload.id) {
                item.title = payload.data
            }
        });
    },
    setError(state, error) {
        state.error = error
        if (error) {
            Vue.swal({
                title: 'Oops...',
                text: 'Something went wrong!',
                icon: "error",
                showConfirmButton: true,
            });
        }
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}