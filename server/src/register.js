import connection from './connection'
import isAllowedPushEndpoint from './isAllowedPushEndpoint'

export default data => {
  return new Promise((resolve, reject) => {
    if (!data || !isAllowedPushEndpoint(data.endpoint) || !data.keys ||
      typeof data.keys.auth !== 'string' || !data.keys.auth || data.keys.auth.length > 256 ||
      typeof data.keys.p256dh !== 'string' || !data.keys.p256dh || data.keys.p256dh.length > 256) return reject('Invalid parameter')
    connection.query('SELECT * FROM subscriptions WHERE endpoint = ? AND deleted_at IS NULL', [data.endpoint], (error, rows) => {
      if (error) return reject(error)
      if (rows.length) return resolve()
      connection.query('INSERT INTO subscriptions SET ?', { endpoint: data.endpoint, auth: data.keys.auth, p256dh: data.keys.p256dh }, error => {
        return error ? reject(error) : resolve()
      })
    })
  })
}
