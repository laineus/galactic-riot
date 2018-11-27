self.addEventListener('push', e => {
  if (!e.data) return
  const data = e.data.json()
  e.waitUntil(self.registration.showNotification(data.title, data))
}, false)

self.addEventListener('notificationclick', e => {
  e.notification.close()
  const url = e.notification.data ? e.notification.data.url : '/'
  e.waitUntil(clients.openWindow(url))
}, false)
