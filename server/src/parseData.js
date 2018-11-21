export default message => {
  try {
    return JSON.parse(message.utf8Data)
  } catch (e) {
    return { method: null, body: null }
  }
}
