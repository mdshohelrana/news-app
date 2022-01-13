// Libraries
import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

// Components
import App from '@/App'

// Utilities
import {
  createLocalVue,
  shallowMount,
} from '@vue/test-utils'

Vue.use(Vuetify)
const localVue = createLocalVue()
localVue.use(Vuex)

describe('App.vue', () => {
  let vuetify
  let actions
  let store

  beforeEach(() => {
    actions = {
      "news/getTopHeadlines": jest.fn(),
      "news/getNewsSources": jest.fn(),
    }

    store = new Vuex.Store({
      state: {},
      actions
    })

    vuetify = new Vuetify()
  })

  it('should have a title and match snapshot', () => {
    const wrapper = shallowMount(App, {
      localVue,
      store,
      vuetify,
      stubs: ['router-link', 'router-view'],
    })

    expect(wrapper.html()).toMatchSnapshot()
    // expect(actions.SOME_ACTION).toHaveBeenCalled()

  })
})