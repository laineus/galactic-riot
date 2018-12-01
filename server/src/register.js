import connection from './connection'

export default data => {
  return new Promise((resolve, reject) => {
    if (!data.endpoint || !data.keys || !data.keys.auth || !data.keys.p256dh) return reject('Invalid parameter')
    connection.query('SELECT * FROM subscriptions WHERE endpoint = ? AND deleted_at IS NULL', [data.endpoint], (error, rows) => {
      if (error) return reject(error)
      if (rows.length) return resolve()
      connection.query('INSERT INTO subscriptions SET ?', { endpoint: data.endpoint, auth: data.keys.auth, p256dh: data.keys.p256dh }, error => {
        return error ? reject(error) : resolve()
      })
    })
  })
}
