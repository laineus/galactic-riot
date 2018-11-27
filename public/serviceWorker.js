self.addEventListener('push', e => {
  if (!e.data) return
  const data = e.data.json()
  e.waitUntil(self.registration.showNotification(data.title, data))
}, false)

self.addEventListener('notificationclick', e => {
  const data = e.notification.data || {}
  e.waitUntil(data, data.url ? clients.openWindow(data.url) : null)
}, false)
