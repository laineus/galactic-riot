const webpush = require('web-push')

webpush.setVapidDetails(
  'mailto:lainen000@gmail.com',
  '',
  ''
)

const subscriptions = []

const params = {
  title: 'title',
  msg: 'test',
  icon: 'test.png'
}

Promise.all(subscriptions.map(subscription => {
  return webpush.sendNotification(subscription, JSON.stringify(params), {})
})).then(r => console.log(r)).catch(console.error)
