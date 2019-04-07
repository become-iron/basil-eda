import Vue from 'vue'

import { beforeDestroy } from './utils/vue'


export default new Vue({
  data () {
    return {
      on: this.$on,
      once: this.$once,
      off: this.$off,
      emit: this.$emit,
    }
  },

  methods: {
    listen (cmp, event, callback) {
      this.$on(event, callback)
      beforeDestroy(cmp, callback)
    }
  }
})
