import _ from 'lodash'
import { make } from 'vuex-pathify'
import { Project } from '../eda/Project'


const state = {
  /** @type {Project} */
  project: null,
  /** @type {ComponentsLibrary[]} */
  libraries: [],
  selectedLibrariesIDs: [],
  selectedCells: []
}
const getters = {
  librariesIndex (state) {
    return _.keyBy(state.libraries, 'id')
  },

  selectedLibraries (state, getters) {
    return state.selectedLibrariesIDs
      .map(libraryID => getters.librariesIndex[libraryID])
  }
}
const mutations = {
  ...make.mutations(state)
}
const actions = {
  init ({ commit }) {
    commit('SET_PROJECT', new Project({ title: 'Unnamed project' }))
  }
}


export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
