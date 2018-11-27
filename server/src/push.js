import webpush from 'web-push'
import connection from './connection'
import { VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY } from './settings'

webpush.setVapidDetails('mailto:lainen000@gmail.com', VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY)

const params = {
  title: 'GALACTIC RIOT',
  body: '対戦を待っているプレイヤーがいます！',
  data: { url: 'https://galactic.laineus.com' }
}

export default (endpoint = '') => {
  const sentIds = []
  const failedIds = []
  const selectQuery = 'SELECT * FROM subscriptions WHERE deleted_at IS NULL AND (last_sent_at < (NOW() - INTERVAL 6 HOUR) OR last_sent_at IS NULL) AND endpoint != ?'
  connection.query(selectQuery, [endpoint], (error, rows) => {
    if (error) return
    rows.forEach(row => {
      const subscription = {
        endpoint: row.endpoint,
        keys: { auth: row.auth, p256dh: row.p256dh }
      }
      try {
        webpush.sendNotification(subscription, JSON.stringify(params), {})
        sentIds.push(row.id)
      } catch (e) {
        failedIds.push(row.id)
      }
    })
    if (sentIds.length) connection.query('UPDATE subscriptions SET last_sent_at=NOW() WHERE id in(?)', [sentIds])
    if (failedIds.length) connection.query('UPDATE subscriptions SET deleted_at=NOW() WHERE id in(?)', [failedIds])
  })
}
