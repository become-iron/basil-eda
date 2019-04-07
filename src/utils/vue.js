export function beforeDestroy (cmp, callback) {
  cmp.$once('hook:beforeDestroy', callback)
}
