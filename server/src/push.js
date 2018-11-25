require('dotenv').config()
import webpush from 'web-push'
import connection from './connection'

webpush.setVapidDetails('mailto:lainen000@gmail.com', process.env.VAPID_PUBLIC_KEY, process.env.VAPID_PRIVATE_KEY)

const params = {
  title: 'GALACTIC RIOT',
  body: '対戦を待っているプレイヤーがいます！'
}

connection.query('SELECT * FROM subscriptions', (error, rows) => {
  if (error) return
  Promise.all(rows.map(row => {
    const subscription = {
      endpoint: row.endpoint,
      keys: {
        auth: row.auth,
        p256dh: row.p256dh
      }
    }
    return webpush.sendNotification(subscription, JSON.stringify(params), {})
  })).then(r => console.log(r)).catch(console.error)
})
