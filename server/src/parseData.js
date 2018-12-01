export default message => {
  try {
    const data = JSON.parse(message.utf8Data)
    return (data && data.method && data.body) ? data : false
  } catch (e) {
    return false
  }
}
