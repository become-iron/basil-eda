export function removeFromArrayByPredicate (array, predicate) {
  const i = array.findIndex(predicate)
  if (i === -1) { return }
  array.splice(i, 1)
}

export function removeFromArray (array, value) {
  removeFromArrayByPredicate(array, v => v === value)
}
