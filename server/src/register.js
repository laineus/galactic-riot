import connection from './connection'

export default data => {
  if (!data.endpoint || !data.keys || !data.keys.auth || !data.keys.p256dh) return
  connection.query('SELECT * FROM subscriptions WHERE endpoint = ?', [data.endpoint], (error, rows) => {
    if (error || rows.length) return
    connection.query('INSERT INTO subscriptions SET ?', { endpoint: data.endpoint, auth: data.keys.auth, p256dh: data.keys.p256dh })
  })
}
