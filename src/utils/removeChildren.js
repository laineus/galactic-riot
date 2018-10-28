const remove = (array, i) => {
  if (!array[i]) return
  array[i].remove()
  remove(array, i - 1)
}
export default obj => {
  remove(obj.children, obj.children.length - 1)
}
