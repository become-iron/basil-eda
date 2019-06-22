import _ from 'lodash'

import { removeFromArrayByPredicate } from '../utils/func'
import { Project } from '../eda/Project'


export default {
  namespaced: true,

  state: {
    project: new Project('meow'),
    cells: [],
    selectedCells: [],
    libraries: [],
    selectedLibraries: []
  },

  getters: {
    librariesIndex (state) {
      return _.keyBy(state.libraries, 'id')
    }
  },

  commit: {
    setCells (state, cells) {
      state.cells = cells
    },

    setSelectedCells (state, cells) {
      state.selectedCells = cells
    },

    libraries (state, libraries) {
      state.libraries = libraries
    },

    addLibrary (state, library) {
      state.libraries.push(library)
    },

    removeLibrary (state, libraryID) {
      removeFromArrayByPredicate(state.libraries, library => library.id === libraryID)
    },

    setSelectedLibraries (state, libraries) {
      state.selectedLibraries = libraries
    },

    selectLibrary (state, library) {
      state.libraries.push(library)
    },

    deselectLibrary (state, libraryID) {
      removeFromArrayByPredicate(state.libraries, library => library.id === libraryID)
    }
  },

  actions: {
    selectLibrary ({ getters, commit }, libraryID) {
      const library = getters.librariesIndex[libraryID]
      if (!library) { return }
      commit('selectLibrary', library)
    },
  }
}
